// Import subscription manager
importScripts("subscription-manager.js");

// Define CONFIG directly since we can't import it in service worker
const CONFIG = {
  API_BASE_URL: "https://salesforcearcpilot-production.up.railway.app/api",
  LANDING_PAGE_URL:
    "https://victorbrandaao.github.io/salesforce-arc-pilot-landing",
  VERSION: "1.0.0",

  PLANS: {
    free: {
      name: "Grátis",
      maxOrgs: 2,
      analytics: false,
      darkMode: false,
      cloudSync: false,
      backup: false,
    },
    premium: {
      name: "Premium",
      maxOrgs: 999,
      analytics: true,
      darkMode: true,
      cloudSync: true,
      backup: true,
    },
  },

  DEFAULT_SETTINGS: {
    language: "pt",
    theme: "light",
    notifications: true,
    autoBackup: false,
    cloudSync: false,
  },

  SALESFORCE_DOMAINS: [
    "salesforce.com",
    "force.com",
    "lightning.force.com",
    "my.salesforce.com",
  ],
};

class BackgroundService {
  constructor() {
    this.CONFIG = CONFIG;
    this.setupEventListeners();
    this.init();
  }

  async init() {
    console.log("🚀 Salesforce Arc Pilot Background Service Started");

    // Initialize subscription manager
    if (window.subscriptionManager) {
      await window.subscriptionManager.init();
    }
  }

  setupEventListeners() {
    // Handle extension installation
    chrome.runtime.onInstalled.addListener((details) => {
      this.handleInstallation(details);
    });

    // Handle messages from popup and content scripts
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      this.handleMessage(message, sender, sendResponse);
      return true; // Keep message channel open for async responses
    });

    // Handle tab updates (for detecting Salesforce pages)
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      this.handleTabUpdate(tabId, changeInfo, tab);
    });

    // Handle startup
    chrome.runtime.onStartup.addListener(() => {
      this.handleStartup();
    });
  }

  async handleMessage(message, sender, sendResponse) {
    try {
      switch (message.type) {
        case "GET_SUBSCRIPTION":
          if (self.subscriptionManager) {
            sendResponse(self.subscriptionManager.getSubscriptionInfo());
          } else {
            sendResponse({ plan: "free", features: this.CONFIG.PLANS.free });
          }
          break;

        case "TRACK_EVENT":
          await this.trackEvent(message.event, message.data);
          sendResponse({ success: true });
          break;

        case "TRACK_ORG_ACCESS":
          await this.trackOrgAccess(message);
          sendResponse({ success: true });
          break;

        case "CHECK_ORG_LIMIT":
          const canAdd = await this.checkOrgLimit();
          sendResponse({ canAdd });
          break;

        case "ADD_ORG":
          const result = await this.addOrg(message.orgData);
          sendResponse(result);
          break;

        case "DELETE_ORG":
          const deleteResult = await this.deleteOrg(message.orgId);
          sendResponse(deleteResult);
          break;

        case "GET_ORGS":
          const orgs = await this.getOrgs();
          sendResponse({ orgs });
          break;

        case "ACCESS_ORG":
          await this.accessOrg(message.orgId);
          sendResponse({ success: true });
          break;

        default:
          sendResponse({ error: "Unknown message type" });
      }
    } catch (error) {
      console.error("Error handling message:", error);
      sendResponse({ error: error.message });
    }
  }

  async handleInstallation(details) {
    if (details.reason === "install") {
      console.log("🎉 Extension installed for the first time");

      // Set default settings
      await chrome.storage.sync.set({
        language: "pt",
        theme: "light",
        orgs: [],
        settings: this.CONFIG.DEFAULT_SETTINGS,
      });

      // Open welcome page
      chrome.tabs.create({
        url: `${this.CONFIG.LANDING_PAGE_URL}?welcome=true`,
      });

      // Track installation
      this.trackEvent("extension_installed", {
        version: chrome.runtime.getManifest().version,
      });
    } else if (details.reason === "update") {
      console.log("📦 Extension updated");
      this.trackEvent("extension_updated", {
        version: chrome.runtime.getManifest().version,
      });
    }
  }

  async handleTabUpdate(tabId, changeInfo, tab) {
    if (changeInfo.status === "complete" && tab.url) {
      // Check if it's a Salesforce page
      if (this.isSalesforcePage(tab.url)) {
        // Inject content script if needed
        try {
          await chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ["content/content.js"],
          });
        } catch (error) {
          // Script might already be injected
        }
      }
    }
  }

  async handleStartup() {
    console.log("🔄 Extension startup");

    // Check for expired subscriptions
    if (window.subscriptionManager) {
      await window.subscriptionManager.handleExpiredSubscription();
    }
  }

  isSalesforcePage(url) {
    return this.CONFIG.SALESFORCE_DOMAINS.some((domain) => {
      return url.includes(domain);
    });
  }

  async checkOrgLimit() {
    try {
      const data = await chrome.storage.sync.get(["orgs"]);
      const orgs = data.orgs || [];

      if (self.subscriptionManager) {
        return self.subscriptionManager.canAddOrg(orgs.length);
      }

      return orgs.length < 2; // Default free limit
    } catch (error) {
      console.error("Error checking org limit:", error);
      return false;
    }
  }

  async addOrg(orgData) {
    try {
      // Check org limit first
      const canAdd = await this.checkOrgLimit();
      if (!canAdd) {
        return {
          success: false,
          error: "Limite de orgs atingido. Faça upgrade para adicionar mais.",
        };
      }

      // Get current orgs
      const data = await chrome.storage.sync.get(["orgs"]);
      const orgs = data.orgs || [];

      // Create new org
      const newOrg = {
        id: Date.now().toString(),
        name: orgData.name,
        url: orgData.url,
        type: orgData.type,
        description: orgData.description || "",
        addedAt: new Date().toISOString(),
        lastAccessed: null,
        accessCount: 0,
      };

      // Add to list
      orgs.push(newOrg);

      // Save to storage
      await chrome.storage.sync.set({ orgs });

      // Track event
      this.trackEvent("org_added", {
        orgType: newOrg.type,
        totalOrgs: orgs.length,
      });

      return { success: true, org: newOrg };
    } catch (error) {
      console.error("Error adding org:", error);
      return { success: false, error: error.message };
    }
  }

  async deleteOrg(orgId) {
    try {
      // Get current orgs
      const data = await chrome.storage.sync.get(["orgs"]);
      const orgs = data.orgs || [];

      // Filter out the org
      const updatedOrgs = orgs.filter((org) => org.id !== orgId);

      // Save to storage
      await chrome.storage.sync.set({ orgs: updatedOrgs });

      // Track event
      this.trackEvent("org_deleted", {
        totalOrgs: updatedOrgs.length,
      });

      return { success: true };
    } catch (error) {
      console.error("Error deleting org:", error);
      return { success: false, error: error.message };
    }
  }

  async getOrgs() {
    try {
      const data = await chrome.storage.sync.get(["orgs"]);
      return data.orgs || [];
    } catch (error) {
      console.error("Error getting orgs:", error);
      return [];
    }
  }

  async accessOrg(orgId) {
    try {
      // Get current orgs
      const data = await chrome.storage.sync.get(["orgs"]);
      const orgs = data.orgs || [];

      // Find and update the org
      const orgIndex = orgs.findIndex((org) => org.id === orgId);
      if (orgIndex !== -1) {
        orgs[orgIndex].lastAccessed = new Date().toISOString();
        orgs[orgIndex].accessCount = (orgs[orgIndex].accessCount || 0) + 1;

        // Save to storage
        await chrome.storage.sync.set({ orgs });

        // Track access
        this.trackOrgAccess({
          orgId,
          orgType: orgs[orgIndex].type,
          accessCount: orgs[orgIndex].accessCount,
        });

        // Open the org URL
        chrome.tabs.create({ url: orgs[orgIndex].url });
      }
    } catch (error) {
      console.error("Error accessing org:", error);
    }
  }

  async trackEvent(eventName, data = {}) {
    try {
      // Add common data
      const eventData = {
        event: eventName,
        data: {
          ...data,
          timestamp: new Date().toISOString(),
          version: chrome.runtime.getManifest().version,
          userId: self.subscriptionManager?.userId,
        },
      };

      // Send to backend if subscription manager has analytics
      if (self.subscriptionManager?.hasFeature("analytics")) {
        fetch(`${this.CONFIG.API_BASE_URL}/analytics/event`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventData),
        }).catch((error) => console.log("Analytics error:", error));
      }

      console.log("📊 Event tracked:", eventName, data);
    } catch (error) {
      console.error("Error tracking event:", error);
    }
  }

  async trackOrgAccess(data) {
    try {
      const accessData = {
        ...data,
        userId: self.subscriptionManager?.userId,
        timestamp: data.timestamp || new Date().toISOString(),
      };

      // Send to backend for analytics
      if (self.subscriptionManager?.hasFeature("analytics")) {
        fetch(`${this.CONFIG.API_BASE_URL}/analytics/org-access`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(accessData),
        }).catch((error) => console.log("Analytics error:", error));
      }

      console.log("🔗 Org access tracked:", data.orgId);
    } catch (error) {
      console.error("Error tracking org access:", error);
    }
  }
}

// Initialize background service
new BackgroundService();
