document.addEventListener("DOMContentLoaded", () => {
  class SalesforceArcPilot {
    constructor() {
      this.currentLang = "pt";
      this.currentTheme = "light";
      this.subscription = { plan: "free", features: { maxOrgs: 2 } };
      this.orgs = [];
      this.init();
    }

    async init() {
      try {
        await this.loadSettings();
        await this.loadSubscription();
        await this.loadOrgs();
        this.setupEventListeners();
        this.updateUI();
        this.setupTheme();
        console.log("✅ Salesforce Arc Pilot initialized");
      } catch (error) {
        console.error("❌ Error initializing app:", error);
        this.showNotification("Erro ao inicializar aplicação", "error");
      }
    }

    async loadSettings() {
      const settings = await chrome.storage.sync.get(["language", "theme"]);
      this.currentLang = settings.language || "pt";
      this.currentTheme = settings.theme || "light";

      // Update language select
      const langSelect = document.getElementById("language-select");
      if (langSelect) langSelect.value = this.currentLang;

      // Update theme select
      const themeSelect = document.getElementById("theme-select");
      if (themeSelect) themeSelect.value = this.currentTheme;
    }

    async loadSubscription() {
      try {
        const response = await chrome.runtime.sendMessage({
          type: "GET_SUBSCRIPTION",
        });
        this.subscription = response || {
          plan: "free",
          features: { maxOrgs: 2 },
        };
        this.updateSubscriptionStatus();
      } catch (error) {
        console.error("Error loading subscription:", error);
      }
    }

    async loadOrgs() {
      try {
        const data = await chrome.storage.sync.get(["orgs"]);
        this.orgs = data.orgs || [];
        this.updateOrgsList();
        this.updateOrgCount();
      } catch (error) {
        console.error("Error loading orgs:", error);
      }
    }

    setupEventListeners() {
      // Search functionality
      const searchInput = document.getElementById("search-input");
      searchInput.addEventListener("input", (e) =>
        this.handleSearch(e.target.value)
      );

      // Clear search
      document.getElementById("clear-search").addEventListener("click", () => {
        searchInput.value = "";
        this.handleSearch("");
      });

      // Add org buttons
      document
        .getElementById("add-org-btn")
        .addEventListener("click", () => this.openAddOrgModal());
      document
        .getElementById("add-first-org")
        .addEventListener("click", () => this.openAddOrgModal());

      // Modal controls
      document
        .getElementById("close-add-org")
        .addEventListener("click", () => this.closeModal("add-org-modal"));
      document
        .getElementById("cancel-add-org")
        .addEventListener("click", () => this.closeModal("add-org-modal"));
      document
        .getElementById("close-upgrade")
        .addEventListener("click", () => this.closeModal("upgrade-modal"));
      document
        .getElementById("maybe-later")
        .addEventListener("click", () => this.closeModal("upgrade-modal"));
      document
        .getElementById("close-settings")
        .addEventListener("click", () => this.closeModal("settings-modal"));

      // Form submission
      document
        .getElementById("add-org-form")
        .addEventListener("submit", (e) => this.handleAddOrg(e));

      // Settings
      document
        .getElementById("settings-btn")
        .addEventListener("click", () => this.openModal("settings-modal"));
      document
        .getElementById("theme-toggle")
        .addEventListener("click", () => this.toggleTheme());
      document
        .getElementById("language-select")
        .addEventListener("change", (e) => this.changeLanguage(e.target.value));
      document
        .getElementById("theme-select")
        .addEventListener("change", (e) => this.changeTheme(e.target.value));

      // Upgrade
      document
        .getElementById("upgrade-link")
        .addEventListener("click", () => this.openModal("upgrade-modal"));
      document
        .getElementById("upgrade-now")
        .addEventListener("click", () => this.redirectToUpgrade());

      // Help and support
      document
        .getElementById("help-link")
        .addEventListener("click", () => this.openHelpPage());
      document
        .getElementById("contact-support")
        .addEventListener("click", () => this.contactSupport());

      // Sync button (premium only)
      const syncBtn = document.getElementById("sync-btn");
      if (syncBtn) {
        syncBtn.addEventListener("click", () => this.syncOrgs());
      }
    }

    updateUI() {
      // Update empty state visibility
      const emptyState = document.getElementById("empty-state");
      const orgsList = document.getElementById("orgs-list");

      if (this.orgs.length === 0) {
        emptyState.style.display = "block";
        orgsList.style.display = "none";
      } else {
        emptyState.style.display = "none";
        orgsList.style.display = "block";
      }

      // Update sync button visibility (premium feature)
      const syncBtn = document.getElementById("sync-btn");
      if (syncBtn) {
        syncBtn.style.display = this.subscription.features.cloudSync
          ? "flex"
          : "none";
      }

      // Update premium-only sections
      const premiumSections = document.querySelectorAll(".premium-only");
      premiumSections.forEach((section) => {
        section.style.display =
          this.subscription.plan === "premium" ? "block" : "none";
      });

      // Update current plan display
      const currentPlanElement = document.getElementById("current-plan");
      if (currentPlanElement) {
        currentPlanElement.textContent =
          this.subscription.plan === "premium" ? "Premium" : "Grátis";
      }
    }

    updateSubscriptionStatus() {
      const container = document.getElementById("subscription-status");
      const plan = this.subscription.plan;
      const features = this.subscription.features;

      container.className = `subscription-status subscription-${plan}`;
      container.innerHTML = `
            <div class="subscription-info">
                <div class="plan-info">
                    <h4>${
                      plan === "premium" ? "💎 Premium" : "🆓 Plano Grátis"
                    }</h4>
                    <div class="plan-features">
                        ${
                          features.maxOrgs === 999
                            ? "Orgs ilimitadas"
                            : `Até ${features.maxOrgs} orgs`
                        } • 
                        ${features.analytics ? "Analytics" : "Sem analytics"} • 
                        ${features.darkMode ? "Dark mode" : "Tema claro"}
                    </div>
                </div>
                ${
                  plan === "free"
                    ? '<div class="upgrade-badge" id="upgrade-badge">Upgrade</div>'
                    : ""
                }
            </div>
        `;

      // Add upgrade click handler
      const upgradeBadge = document.getElementById("upgrade-badge");
      if (upgradeBadge) {
        upgradeBadge.addEventListener("click", () =>
          this.openModal("upgrade-modal")
        );
      }
    }

    updateOrgsList() {
      const container = document.getElementById("orgs-list");
      const searchTerm = document
        .getElementById("search-input")
        .value.toLowerCase();

      let filteredOrgs = this.orgs;
      if (searchTerm) {
        filteredOrgs = this.orgs.filter(
          (org) =>
            org.name.toLowerCase().includes(searchTerm) ||
            org.url.toLowerCase().includes(searchTerm) ||
            org.type.toLowerCase().includes(searchTerm)
        );
      }

      container.innerHTML = filteredOrgs
        .map(
          (org) => `
            <div class="org-card" onclick="app.accessOrg('${org.id}')">
                <div class="org-header">
                    <div class="org-icon ${org.type}">
                        <i class="fas fa-${this.getOrgIcon(org.type)}"></i>
                    </div>
                    <div class="org-info">
                        <div class="org-name">${org.name}</div>
                        <div class="org-url">${this.truncateUrl(org.url)}</div>
                    </div>
                    <div class="org-actions">
                        <button class="org-action-btn" onclick="event.stopPropagation(); app.editOrg('${
                          org.id
                        }')" title="Editar">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="org-action-btn delete" onclick="event.stopPropagation(); app.deleteOrg('${
                          org.id
                        }')" title="Deletar">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="org-footer">
                    <span class="org-type-badge ${
                      org.type
                    }">${this.getOrgTypeLabel(org.type)}</span>
                    ${
                      org.lastAccessed
                        ? `<span>Último acesso: ${this.formatDate(
                            org.lastAccessed
                          )}</span>`
                        : ""
                    }
                </div>
            </div>
        `
        )
        .join("");
    }

    updateOrgCount() {
      const countElement = document.getElementById("org-count");
      const maxOrgs = this.subscription.features.maxOrgs;
      const current = this.orgs.length;

      countElement.textContent = `${current}/${
        maxOrgs === 999 ? "∞" : maxOrgs
      }`;

      // Update add button state
      const addBtn = document.getElementById("add-org-btn");
      if (current >= maxOrgs) {
        addBtn.innerHTML =
          '<i class="fas fa-lock"></i><span>Upgrade para mais</span>';
        addBtn.onclick = () => this.openModal("upgrade-modal");
      } else {
        addBtn.innerHTML =
          '<i class="fas fa-plus"></i><span>Adicionar Org</span>';
        addBtn.onclick = () => this.openAddOrgModal();
      }
    }

    async handleAddOrg(event) {
      event.preventDefault();

      // Check org limit
      if (this.orgs.length >= this.subscription.features.maxOrgs) {
        this.openModal("upgrade-modal");
        return;
      }

      const formData = new FormData(event.target);
      const org = {
        id: Date.now().toString(),
        name: formData.get("name") || document.getElementById("org-name").value,
        url: formData.get("url") || document.getElementById("org-url").value,
        type: formData.get("type") || document.getElementById("org-type").value,
        description:
          formData.get("description") ||
          document.getElementById("org-description").value,
        addedAt: new Date().toISOString(),
        lastAccessed: null,
      };

      try {
        this.showLoading(true);

        // Validate URL
        new URL(org.url);

        this.orgs.push(org);
        await chrome.storage.sync.set({ orgs: this.orgs });

        this.updateOrgsList();
        this.updateOrgCount();
        this.updateUI();
        this.closeModal("add-org-modal");

        this.showNotification(
          `Org "${org.name}" adicionada com sucesso!`,
          "success"
        );

        // Clear form
        document.getElementById("add-org-form").reset();

        // Track event
        this.trackEvent("org_added", { type: org.type });
      } catch (error) {
        console.error("Error adding org:", error);
        this.showNotification(
          "Erro ao adicionar org. Verifique a URL.",
          "error"
        );
      } finally {
        this.showLoading(false);
      }
    }

    async accessOrg(orgId) {
      const org = this.orgs.find((o) => o.id === orgId);
      if (!org) return;

      try {
        // Update last accessed time
        org.lastAccessed = new Date().toISOString();
        await chrome.storage.sync.set({ orgs: this.orgs });

        // Open org in new tab
        await chrome.tabs.create({ url: org.url });

        // Track analytics (if premium)
        if (this.subscription.features.analytics) {
          this.trackOrgAccess(org);
        }

        // Update UI
        this.updateOrgsList();

        this.showNotification(`Abrindo ${org.name}...`, "success");

        // Close popup
        window.close();
      } catch (error) {
        console.error("Error accessing org:", error);
        this.showNotification("Erro ao acessar org", "error");
      }
    }

    async deleteOrg(orgId) {
      const org = this.orgs.find((o) => o.id === orgId);
      if (!org) return;

      if (confirm(`Tem certeza que deseja deletar "${org.name}"?`)) {
        try {
          this.orgs = this.orgs.filter((o) => o.id !== orgId);
          await chrome.storage.sync.set({ orgs: this.orgs });

          this.updateOrgsList();
          this.updateOrgCount();
          this.updateUI();

          this.showNotification(`Org "${org.name}" deletada`, "success");
          this.trackEvent("org_deleted", { type: org.type });
        } catch (error) {
          console.error("Error deleting org:", error);
          this.showNotification("Erro ao deletar org", "error");
        }
      }
    }

    handleSearch(term) {
      const clearBtn = document.getElementById("clear-search");
      clearBtn.style.display = term ? "flex" : "none";
      this.updateOrgsList();
      this.trackEvent("search_performed", { term: term.length });
    }

    setupTheme() {
      document.body.setAttribute("data-theme", this.currentTheme);

      const themeIcon = document.querySelector("#theme-toggle i");
      themeIcon.className =
        this.currentTheme === "dark" ? "fas fa-sun" : "fas fa-moon";
    }

    async toggleTheme() {
      const newTheme = this.currentTheme === "light" ? "dark" : "light";
      await this.changeTheme(newTheme);
    }

    async changeTheme(theme) {
      this.currentTheme = theme;
      await chrome.storage.sync.set({ theme });
      this.setupTheme();
      this.trackEvent("theme_changed", { theme });
    }

    async changeLanguage(lang) {
      this.currentLang = lang;
      await chrome.storage.sync.set({ language: lang });
      // Note: Full translation would require page reload in a real implementation
      this.trackEvent("language_changed", { language: lang });
    }

    openModal(modalId) {
      document.getElementById(modalId).classList.add("active");
      this.trackEvent("modal_opened", { modal: modalId });
    }

    closeModal(modalId) {
      document.getElementById(modalId).classList.remove("active");
    }

    openAddOrgModal() {
      if (this.orgs.length >= this.subscription.features.maxOrgs) {
        this.openModal("upgrade-modal");
      } else {
        this.openModal("add-org-modal");
      }
    }

    redirectToUpgrade() {
      chrome.tabs.create({
        url: "https://victorbrandaao.github.io/salesforce-arc-pilot-landing/#pricing",
      });
      this.trackEvent("upgrade_clicked", { source: "popup" });
    }

    openHelpPage() {
      chrome.tabs.create({
        url: "https://victorbrandaao.github.io/salesforce-arc-pilot-landing",
      });
      this.trackEvent("help_clicked");
    }

    contactSupport() {
      chrome.tabs.create({
        url: "mailto:support@salesforcearcpilot.com?subject=Suporte%20-%20Salesforce%20Arc%20Pilot",
      });
      this.trackEvent("support_contacted");
    }

    async syncOrgs() {
      if (!this.subscription.features.cloudSync) {
        this.openModal("upgrade-modal");
        return;
      }

      try {
        this.showLoading(true);

        // Simulate sync with backend
        await new Promise((resolve) => setTimeout(resolve, 2000));

        this.showNotification("Orgs sincronizadas com sucesso!", "success");
        this.trackEvent("orgs_synced");
      } catch (error) {
        console.error("Error syncing orgs:", error);
        this.showNotification("Erro ao sincronizar orgs", "error");
      } finally {
        this.showLoading(false);
      }
    }

    showLoading(show) {
      const overlay = document.getElementById("loading-overlay");
      overlay.style.display = show ? "flex" : "none";
    }

    showNotification(message, type = "success") {
      const container = document.getElementById("notification-container");
      const notification = document.createElement("div");
      notification.className = `notification ${type}`;
      notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px;">
                <i class="fas fa-${
                  type === "success" ? "check" : "exclamation-triangle"
                }"></i>
                <span style="font-size: 12px;">${message}</span>
            </div>
        `;

      container.appendChild(notification);
      setTimeout(() => notification.classList.add("show"), 100);

      setTimeout(() => {
        notification.classList.remove("show");
        setTimeout(() => notification.remove(), 300);
      }, 3000);
    }

    trackEvent(event, data = {}) {
      try {
        chrome.runtime.sendMessage({
          type: "TRACK_EVENT",
          event,
          data: { ...data, timestamp: Date.now() },
        });
      } catch (error) {
        console.error("Error tracking event:", error);
      }
    }

    trackOrgAccess(org) {
      chrome.runtime.sendMessage({
        type: "TRACK_ORG_ACCESS",
        orgId: org.id,
        orgType: org.type,
        timestamp: new Date().toISOString(),
      });
    }

    // Utility functions
    getOrgIcon(type) {
      const icons = {
        production: "building",
        sandbox: "flask",
        developer: "code",
        trailhead: "graduation-cap",
      };
      return icons[type] || "cloud";
    }

    getOrgTypeLabel(type) {
      const labels = {
        production: "Produção",
        sandbox: "Sandbox",
        developer: "Developer",
        trailhead: "Trailhead",
      };
      return labels[type] || type;
    }

    truncateUrl(url) {
      try {
        const urlObj = new URL(url);
        return urlObj.hostname;
      } catch {
        return url.length > 30 ? url.substring(0, 30) + "..." : url;
      }
    }

    formatDate(dateString) {
      const date = new Date(dateString);
      const now = new Date();
      const diff = now - date;

      if (diff < 60000) return "Agora";
      if (diff < 3600000) return `${Math.floor(diff / 60000)}m atrás`;
      if (diff < 86400000) return `${Math.floor(diff / 3600000)}h atrás`;

      return date.toLocaleDateString("pt-BR");
    }
  }

  // Initialize app when DOM is ready
  document.addEventListener("DOMContentLoaded", () => {
    window.app = new SalesforceArcPilot();
  });

  // Handle external messages
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "SUBSCRIPTION_UPDATED") {
      window.app.subscription = message.subscription;
      window.app.updateSubscriptionStatus();
      window.app.updateOrgCount();
      window.app.updateUI();
    }
  });
});
