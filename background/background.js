// Import subscription manager
importScripts("subscription-manager.js");

class BackgroundService {
  constructor() {
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
          if (window.subscriptionManager) {
            sendResponse(window.subscriptionManager.getSubscriptionInfo());
          } else {
            sendResponse({ plan: "free", features: window.CONFIG.PLANS.free });
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
        settings: window.CONFIG.DEFAULT_SETTINGS,
      });

      // Open welcome page
      chrome.tabs.create({
        url: `${window.CONFIG.LANDING_PAGE_URL}?welcome=true`,
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
    return window.CONFIG.SALESFORCE_DOMAINS.some((domain) => {
      const pattern = domain.replace("*", ".*");
      return new RegExp(pattern).test(url);
    });
  }

  async checkOrgLimit() {
    try {
      const data = await chrome.storage.sync.get(["orgs"]);
      const orgs = data.orgs || [];

      if (window.subscriptionManager) {
        return window.subscriptionManager.canAddOrg(orgs.length);
      }

      return orgs.length < 2; // Default free limit
    } catch (error) {
      console.error("Error checking org limit:", error);
      return false;
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
          userId: window.subscriptionManager?.userId,
        },
      };

      // Send to backend if subscription manager has analytics
      if (window.subscriptionManager?.hasFeature("analytics")) {
        fetch(`${window.CONFIG.API_BASE_URL}/analytics/event`, {
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
        userId: window.subscriptionManager?.userId,
        timestamp: data.timestamp || new Date().toISOString(),
      };

      // Send to backend for analytics
      if (window.subscriptionManager?.hasFeature("analytics")) {
        fetch(`${window.CONFIG.API_BASE_URL}/analytics/org-access`, {
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
