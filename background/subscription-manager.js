class SubscriptionManager {
  constructor() {
    this.API_BASE_URL = 'https://salesforcearcpilot-production.up.railway.app/api';
    this.subscriptionData = null;
    this.init();
  }

  async init() {
    await this.loadSubscriptionData();
    this.startPeriodicCheck();
  }

  async loadSubscriptionData() {
    try {
      const data = await chrome.storage.sync.get(['subscription', 'userId']);
      this.subscriptionData = data.subscription || {
        plan: 'free',
        status: 'active',
        expiresAt: null,
        features: {
          maxOrgs: 2,
          analytics: false,
          darkMode: false,
          cloudSync: false,
          backup: false
        }
      };
      
      // Generate userId if not exists
      if (!data.userId) {
        const userId = this.generateUserId();
        await chrome.storage.sync.set({ userId });
      }
    } catch (error) {
      console.error('Error loading subscription:', error);
    }
  }

  generateUserId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  async checkSubscriptionStatus() {
    try {
      const { userId } = await chrome.storage.sync.get(['userId']);
      const response = await fetch(`${this.API_BASE_URL}/subscription/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const data = await response.json();
        this.subscriptionData = data.subscription;
        await chrome.storage.sync.set({ subscription: this.subscriptionData });
        return true;
      }
    } catch (error) {
      console.error('Error checking subscription:', error);
    }
    return false;
  }

  async upgradeSubscription(plan, paymentData) {
    try {
      const { userId } = await chrome.storage.sync.get(['userId']);
      const response = await fetch(`${this.API_BASE_URL}/subscription/upgrade`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          plan,
          paymentData,
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        const data = await response.json();
        this.subscriptionData = data.subscription;
        await chrome.storage.sync.set({ subscription: this.subscriptionData });
        
        // Notify all tabs about subscription update
        this.notifySubscriptionUpdate();
        return { success: true, subscription: this.subscriptionData };
      } else {
        const error = await response.json();
        return { success: false, error: error.message };
      }
    } catch (error) {
      console.error('Error upgrading subscription:', error);
      return { success: false, error: 'Network error' };
    }
  }

  async cancelSubscription() {
    try {
      const { userId } = await chrome.storage.sync.get(['userId']);
      const response = await fetch(`${this.API_BASE_URL}/subscription/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        // Keep premium features until expiry date
        this.subscriptionData.status = 'cancelled';
        await chrome.storage.sync.set({ subscription: this.subscriptionData });
        return { success: true };
      }
    } catch (error) {
      console.error('Error cancelling subscription:', error);
    }
    return { success: false };
  }

  canAddOrg(currentOrgCount) {
    const maxOrgs = this.subscriptionData?.features?.maxOrgs || 2;
    return currentOrgCount < maxOrgs;
  }

  hasFeature(feature) {
    return this.subscriptionData?.features?.[feature] || false;
  }

  getSubscriptionInfo() {
    return {
      plan: this.subscriptionData?.plan || 'free',
      status: this.subscriptionData?.status || 'active',
      features: this.subscriptionData?.features || {},
      expiresAt: this.subscriptionData?.expiresAt
    };
  }

  async getOrgsLimit() {
    await this.loadSubscriptionData();
    return this.subscriptionData?.features?.maxOrgs || 2;
  }

  notifySubscriptionUpdate() {
    // Send message to all extension pages
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach(tab => {
        chrome.tabs.sendMessage(tab.id, {
          type: 'SUBSCRIPTION_UPDATED',
          subscription: this.subscriptionData
        }).catch(() => {}); // Ignore errors for non-extension pages
      });
    });
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
        plan: 'free',
        status: 'active',
        expiresAt: null,
        features: {
          maxOrgs: 2,
          analytics: false,
          darkMode: false,
          cloudSync: false,
          backup: false
        }
      };
      await chrome.storage.sync.set({ subscription: this.subscriptionData });
      this.notifySubscriptionUpdate();
    }
  }
}

// Global instance
window.subscriptionManager = new SubscriptionManager();
