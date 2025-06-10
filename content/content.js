class SalesforceContentScript {
  constructor() {
    this.init();
  }

  init() {
    console.log("🔗 Salesforce Arc Pilot Content Script loaded");

    // Add detection for current org
    this.detectCurrentOrg();

    // Add quick access button (premium feature)
    this.addQuickAccessButton();

    // Listen for messages from background/popup
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      this.handleMessage(message, sender, sendResponse);
    });
  }

  async detectCurrentOrg() {
    try {
      // Extract org information from current page
      const orgInfo = this.extractOrgInfo();

      if (orgInfo) {
        // Send org info to background for potential auto-add
        chrome.runtime.sendMessage({
          type: "ORG_DETECTED",
          orgInfo,
        });
      }
    } catch (error) {
      console.error("Error detecting org:", error);
    }
  }

  extractOrgInfo() {
    try {
      const url = window.location.href;
      const hostname = window.location.hostname;

      // Extract org name from title or page elements
      let orgName = document.title;

      // Try to get org name from Salesforce UI
      const orgDisplay = document.querySelector(
        ".slds-global-header__item .slds-dropdown-trigger span"
      );
      if (orgDisplay) {
        orgName = orgDisplay.textContent.trim();
      }

      // Determine org type
      let orgType = "production";
      if (
        hostname.includes("sandbox") ||
        hostname.includes(".cs") ||
        hostname.includes(".dev")
      ) {
        orgType = "sandbox";
      } else if (hostname.includes("developer")) {
        orgType = "developer";
      } else if (hostname.includes("trailhead")) {
        orgType = "trailhead";
      }

      return {
        name: orgName || hostname,
        url: `${window.location.protocol}//${hostname}`,
        type: orgType,
        detectedAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error("Error extracting org info:", error);
      return null;
    }
  }

  async addQuickAccessButton() {
    try {
      // Check if user has premium subscription
      const subscription = await chrome.runtime.sendMessage({
        type: "GET_SUBSCRIPTION",
      });

      if (subscription?.features?.cloudSync) {
        this.createQuickAccessButton();
      }
    } catch (error) {
      console.error("Error adding quick access button:", error);
    }
  }

  createQuickAccessButton() {
    // Create floating button for quick org switching
    const button = document.createElement("div");
    button.id = "arc-pilot-quick-access";
    button.innerHTML = `
            <div style="
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 50px;
                height: 50px;
                background: #0066cc;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                cursor: pointer;
                box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3);
                z-index: 10000;
                transition: all 0.3s ease;
                font-size: 18px;
            ">
                🚀
            </div>
        `;

    button.addEventListener("click", () => {
      this.openQuickSwitcher();
    });

    button.addEventListener("mouseenter", () => {
      button.style.transform = "scale(1.1)";
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "scale(1)";
    });

    document.body.appendChild(button);
  }

  async openQuickSwitcher() {
    try {
      // Get user's orgs
      const data = await chrome.storage.sync.get(["orgs"]);
      const orgs = data.orgs || [];

      if (orgs.length > 1) {
        this.showOrgSwitcher(orgs);
      } else {
        // Open extension popup
        chrome.runtime.sendMessage({ type: "OPEN_POPUP" });
      }
    } catch (error) {
      console.error("Error opening quick switcher:", error);
    }
  }

  showOrgSwitcher(orgs) {
    // Remove existing switcher
    const existing = document.getElementById("arc-pilot-org-switcher");
    if (existing) {
      existing.remove();
    }

    // Create org switcher modal
    const modal = document.createElement("div");
    modal.id = "arc-pilot-org-switcher";
    modal.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                z-index: 20000;
                display: flex;
                align-items: center;
                justify-content: center;
            ">
                <div style="
                    background: white;
                    border-radius: 12px;
                    padding: 20px;
                    max-width: 400px;
                    width: 90%;
                    max-height: 80vh;
                    overflow-y: auto;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
                ">
                    <div style="
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        margin-bottom: 20px;
                        padding-bottom: 10px;
                        border-bottom: 1px solid #eee;
                    ">
                        <h3 style="margin: 0; color: #333;">🚀 Quick Switch</h3>
                        <button onclick="this.closest('#arc-pilot-org-switcher').remove()" style="
                            background: none;
                            border: none;
                            font-size: 20px;
                            cursor: pointer;
                            color: #666;
                        ">×</button>
                    </div>
                    <div id="org-list">
                        ${orgs
                          .map(
                            (org) => `
                            <div onclick="window.open('${
                              org.url
                            }', '_blank')" style="
                                padding: 12px;
                                border: 1px solid #eee;
                                border-radius: 8px;
                                margin-bottom: 8px;
                                cursor: pointer;
                                transition: all 0.2s ease;
                                display: flex;
                                align-items: center;
                                gap: 12px;
                            " onmouseover="this.style.background='#f8fafc'; this.style.borderColor='#0066cc';" onmouseout="this.style.background='white'; this.style.borderColor='#eee';">
                                <div style="
                                    width: 32px;
                                    height: 32px;
                                    border-radius: 8px;
                                    background: ${this.getOrgColor(org.type)};
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    color: white;
                                    font-size: 14px;
                                ">
                                    ${this.getOrgIcon(org.type)}
                                </div>
                                <div style="flex: 1;">
                                    <div style="font-weight: 600; color: #333; margin-bottom: 2px;">${
                                      org.name
                                    }</div>
                                    <div style="font-size: 12px; color: #666;">${
                                      org.type
                                    }</div>
                                </div>
                            </div>
                        `
                          )
                          .join("")}
                    </div>
                </div>
            </div>
        `;

    document.body.appendChild(modal);

    // Close on outside click
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
  }

  handleMessage(message, sender, sendResponse) {
    switch (message.type) {
      case "GET_CURRENT_ORG":
        const orgInfo = this.extractOrgInfo();
        sendResponse(orgInfo);
        break;

      case "SUBSCRIPTION_UPDATED":
        // Handle subscription updates
        if (message.subscription?.features?.cloudSync) {
          this.addQuickAccessButton();
        } else {
          const button = document.getElementById("arc-pilot-quick-access");
          if (button) button.remove();
        }
        break;
    }
  }

  getOrgColor(type) {
    const colors = {
      production: "#28a745",
      sandbox: "#ffc107",
      developer: "#0066cc",
      trailhead: "#ff6b35",
    };
    return colors[type] || "#6c757d";
  }

  getOrgIcon(type) {
    const icons = {
      production: "🏢",
      sandbox: "🧪",
      developer: "💻",
      trailhead: "🎓",
    };
    return icons[type] || "☁️";
  }
}

// Initialize content script
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    new SalesforceContentScript();
  });
} else {
  new SalesforceContentScript();
}
