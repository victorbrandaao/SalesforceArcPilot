// SalesforceArcPilot v2.0 - Background Service Worker
// Enhanced background script for improved functionality

// Installation and startup
chrome.runtime.onInstalled.addListener((details) => {
  console.log("SalesforceArcPilot v2.0 installed/updated");

  if (details.reason === "install") {
    // First installation
    chrome.storage.local.set({
      arcpilot_analytics: {
        totalOpens: 0,
        cliOpens: 0,
        manualOpens: 0,
        installDate: new Date().toISOString(),
        version: "2.0.0",
      },
      arcpilot_settings: {
        theme: "auto",
        notifications: true,
        analytics: true,
        autoConnect: true,
      },
      arcpilot_favorites: [],
    });

    // Show welcome notification
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icons/icon48.png",
      title: "SalesforceArcPilot v2.0",
      message: "Extensão instalada com sucesso! Clique no ícone para começar.",
    });
  }

  if (details.reason === "update") {
    console.log(`Updated from version ${details.previousVersion} to 2.0.0`);
  }
});

// Handle extension startup
chrome.runtime.onStartup.addListener(() => {
  console.log("SalesforceArcPilot v2.0 started");
});

// Context menu for quick actions (if needed in future)
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "arcpilot-quick-open",
    title: "Open with ArcPilot",
    contexts: ["page"],
    documentUrlPatterns: [
      "https://*.salesforce.com/*",
      "https://*.force.com/*",
      "https://*.lightning.force.com/*",
    ],
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "arcpilot-quick-open") {
    // Open the extension popup programmatically
    chrome.action.openPopup();
  }
});

// Handle messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getSystemTheme") {
    // Detect system dark mode preference
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    sendResponse({ isDark: prefersDark });
  }

  if (request.action === "updateAnalytics") {
    // Update analytics data
    chrome.storage.local.get(["arcpilot_analytics"], (result) => {
      const analytics = result.arcpilot_analytics || {
        totalOpens: 0,
        cliOpens: 0,
        manualOpens: 0,
      };

      analytics.totalOpens++;
      if (request.type === "cli") {
        analytics.cliOpens++;
      } else if (request.type === "manual") {
        analytics.manualOpens++;
      }
      analytics.lastUsed = new Date().toISOString();

      chrome.storage.local.set({ arcpilot_analytics: analytics });
    });
  }

  if (request.action === "showNotification") {
    // Show system notification
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icons/icon48.png",
      title: request.title || "SalesforceArcPilot",
      message: request.message,
    });
  }

  return true; // Keep message channel open for async response
});

// Handle subscription-related messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case "GET_SUBSCRIPTION":
      if (window.subscriptionManager) {
        sendResponse(window.subscriptionManager.getSubscriptionInfo());
      } else {
        sendResponse({ plan: "free", features: { maxOrgs: 2 } });
      }
      break;

    case "UPGRADE_SUBSCRIPTION":
      if (window.subscriptionManager) {
        window.subscriptionManager
          .upgradeSubscription(message.plan, message.paymentData)
          .then((result) => sendResponse(result));
        return true; // Keep message channel open for async response
      }
      break;

    case "CANCEL_SUBSCRIPTION":
      if (window.subscriptionManager) {
        window.subscriptionManager
          .cancelSubscription()
          .then((result) => sendResponse(result));
        return true;
      }
      break;

    case "CHECK_ORG_LIMIT":
      if (window.subscriptionManager) {
        chrome.storage.sync.get(["orgs"], (data) => {
          const orgs = data.orgs || [];
          const canAdd = window.subscriptionManager.canAddOrg(orgs.length);
          sendResponse({ canAdd, currentCount: orgs.length });
        });
        return true;
      }
      break;

    case "TRACK_ORG_ACCESS":
      // Send usage analytics to backend
      if (
        window.subscriptionManager &&
        window.subscriptionManager.hasFeature("analytics")
      ) {
        fetch(
          `${window.subscriptionManager.API_BASE_URL}/analytics/org-access`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(message),
          }
        ).catch(console.error);
      }
      break;
  }
});

// Check for expired subscriptions on startup
chrome.runtime.onStartup.addListener(() => {
  if (window.subscriptionManager) {
    window.subscriptionManager.handleExpiredSubscription();
  }
});

// Handle tab updates to detect Salesforce pages
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    const isSalesforceUrl = /https:\/\/.*\.(salesforce|force)\.com/.test(
      tab.url
    );

    if (isSalesforceUrl) {
      // Could show page action or update badge
      chrome.action.setBadgeText({
        text: "SF",
        tabId: tabId,
      });
      chrome.action.setBadgeBackgroundColor({
        color: "#00D2FF",
      });
    }
  }
});

// Handle extension icon click analytics
chrome.action.onClicked.addListener((tab) => {
  // This is called when popup is opened
  chrome.runtime.sendMessage({
    action: "updateAnalytics",
    type: "extension_click",
  });
});

// Cleanup and maintenance
setInterval(() => {
  // Periodic cleanup of old data if needed
  console.log("SalesforceArcPilot v2.0 maintenance check");
}, 24 * 60 * 60 * 1000); // Once per day

// Error handling
chrome.runtime.onSuspend.addListener(() => {
  console.log("SalesforceArcPilot v2.0 suspended");
});

console.log("SalesforceArcPilot v2.0 Background Service Worker loaded");
