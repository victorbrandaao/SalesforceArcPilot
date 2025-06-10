class SubscriptionManager {
  constructor() {
    this.API_BASE_URL =
      window.CONFIG?.API_BASE_URL ||
      "https://salesforcearcpilot-production.up.railway.app/api";
    this.subscriptionData = null;
    this.userId = null;
  }

  async init() {
    await this.loadSubscriptionData();
    this.startPeriodicCheck();
    console.log("💎 Subscription Manager initialized");
  }

  async loadSubscriptionData() {
    try {
      const data = await chrome.storage.sync.get(["subscription", "userId"]);

      // Generate userId if not exists
      if (!data.userId) {
        this.userId = this.generateUserId();
        await chrome.storage.sync.set({ userId: this.userId });
      } else {
        this.userId = data.userId;
      }

      // Set default subscription
      this.subscriptionData = data.subscription || {
        plan: "free",
        status: "active",
        expiresAt: null,
        features: window.CONFIG.PLANS.free,
      };

      await chrome.storage.sync.set({ subscription: this.subscriptionData });
    } catch (error) {
      console.error("Error loading subscription:", error);
    }
  }

  generateUserId() {
    return "user_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
  }

  async checkSubscriptionStatus() {
    try {
      const response = await fetch(
        `${this.API_BASE_URL}/subscription/${this.userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        this.subscriptionData = data.subscription;
        await chrome.storage.sync.set({ subscription: this.subscriptionData });
        this.notifySubscriptionUpdate();
        return true;
      }
    } catch (error) {
      console.error("Error checking subscription:", error);
    }
    return false;
  }

  getSubscriptionInfo() {
    return {
      plan: this.subscriptionData?.plan || "free",
      status: this.subscriptionData?.status || "active",
      features: this.subscriptionData?.features || window.CONFIG.PLANS.free,
      expiresAt: this.subscriptionData?.expiresAt,
      userId: this.userId,
    };
  }

  hasFeature(feature) {
    return this.subscriptionData?.features?.[feature] || false;
  }

  canAddOrg(currentOrgCount) {
    const maxOrgs = this.subscriptionData?.features?.maxOrgs || 2;
    return currentOrgCount < maxOrgs;
  }

  notifySubscriptionUpdate() {
    // Send message to all extension pages
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        chrome.tabs
          .sendMessage(tab.id, {
            type: "SUBSCRIPTION_UPDATED",
            subscription: this.subscriptionData,
          })
          .catch(() => {}); // Ignore errors for non-extension pages
      });
    });

    // Also notify popup if open
    chrome.runtime
      .sendMessage({
        type: "SUBSCRIPTION_UPDATED",
        subscription: this.subscriptionData,
      })
      .catch(() => {});
  }

  startPeriodicCheck() {
    // Check subscription status every 24 hours
    setInterval(() => {
      this.checkSubscriptionStatus();
    }, 24 * 60 * 60 * 1000);
  }

  isSubscriptionExpired() {
    if (!this.subscriptionData?.expiresAt) return false;
    return new Date() > new Date(this.subscriptionData.expiresAt);
  }

  async handleExpiredSubscription() {
    if (this.isSubscriptionExpired()) {
      // Downgrade to free plan
      this.subscriptionData = {
        plan: "free",
        status: "active",
        expiresAt: null,
        features: window.CONFIG.PLANS.free,
      };
      await chrome.storage.sync.set({ subscription: this.subscriptionData });
      this.notifySubscriptionUpdate();
    }
  }
}

// Global instance
window.subscriptionManager = new SubscriptionManager();
