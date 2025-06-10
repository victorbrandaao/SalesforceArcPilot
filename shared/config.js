window.CONFIG = {
  API_BASE_URL: "https://salesforcearcpilot-production.up.railway.app/api",
  LANDING_PAGE_URL:
    "https://victorbrandaao.github.io/salesforce-arc-pilot-landing",
  VERSION: "1.0.0",

  // Subscription plans
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

  // Default settings
  DEFAULT_SETTINGS: {
    language: "pt",
    theme: "light",
    notifications: true,
    autoBackup: false,
    cloudSync: false,
  },

  // Salesforce domains
  SALESFORCE_DOMAINS: [
    "*.salesforce.com",
    "*.force.com",
    "*.lightning.force.com",
    "*.my.salesforce.com",
  ],
};
