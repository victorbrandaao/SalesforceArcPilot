document.addEventListener("DOMContentLoaded", () => {
  class PopupApp {
    constructor() {
      this.currentLang = "pt";
      this.subscription = null;
      this.orgs = [];
      this.init();
    }

    async init() {
      console.log("🎯 Popup initialized");

      // Load initial data
      await this.loadLanguage();
      await this.loadSubscription();
      await this.loadOrgs();

      // Setup UI
      this.setupEventListeners();
      this.updateTranslations();
      this.renderSubscriptionStatus();
      this.renderOrgs();

      // Track popup opened
      this.trackEvent("popup_opened");
    }

    async loadLanguage() {
      try {
        const data = await chrome.storage.sync.get(["language"]);
        this.currentLang = data.language || "pt";
      } catch (error) {
        console.error("Error loading language:", error);
      }
    }

    async loadSubscription() {
      try {
        this.subscription = await this.sendMessage({
          type: "GET_SUBSCRIPTION",
        });
      } catch (error) {
        console.error("Error loading subscription:", error);
        this.subscription = { plan: "free", features: { maxOrgs: 2 } };
      }
    }

    async loadOrgs() {
      try {
        const response = await this.sendMessage({ type: "GET_ORGS" });
        this.orgs = response.orgs || [];
      } catch (error) {
        console.error("Error loading orgs:", error);
        this.orgs = [];
      }
    }

    setupEventListeners() {
      // Add org button
      document.getElementById("add-org-btn").addEventListener("click", () => {
        this.showAddOrgModal();
      });

      document.getElementById("add-first-org").addEventListener("click", () => {
        this.showAddOrgModal();
      });

      // Modal close buttons
      document.getElementById("close-add-org").addEventListener("click", () => {
        this.hideModal("add-org-modal");
      });

      document
        .getElementById("cancel-add-org")
        .addEventListener("click", () => {
          this.hideModal("add-org-modal");
        });

      // Add org form
      document
        .getElementById("add-org-form")
        .addEventListener("submit", (e) => {
          this.handleAddOrg(e);
        });

      // Upgrade link
      document.getElementById("upgrade-link").addEventListener("click", (e) => {
        e.preventDefault();
        this.openUpgradePage();
      });

      // Settings button
      document.getElementById("settings-btn").addEventListener("click", () => {
        this.showModal("settings-modal");
      });

      // Theme toggle
      document.getElementById("theme-toggle").addEventListener("click", () => {
        this.toggleTheme();
      });

      // Search input
      document.getElementById("search-input").addEventListener("input", (e) => {
        this.filterOrgs(e.target.value);
      });

      // Clear search
      document.getElementById("clear-search").addEventListener("click", () => {
        document.getElementById("search-input").value = "";
        this.filterOrgs("");
      });
    }

    updateTranslations() {
      if (!window.translations || !window.translations[this.currentLang]) {
        console.warn("Translations not loaded");
        return;
      }

      const translations = window.translations[this.currentLang];

      // Update all elements with data-i18n attribute
      document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.getAttribute("data-i18n");
        const translation = this.getNestedTranslation(translations, key);

        if (translation) {
          element.textContent = translation;
        }
      });

      // Update placeholders
      document
        .querySelectorAll("[data-i18n-placeholder]")
        .forEach((element) => {
          const key = element.getAttribute("data-i18n-placeholder");
          const translation = this.getNestedTranslation(translations, key);

          if (translation) {
            element.placeholder = translation;
          }
        });

      // Update titles and aria-labels
      document.querySelectorAll("[data-i18n-title]").forEach((element) => {
        const key = element.getAttribute("data-i18n-title");
        const translation = this.getNestedTranslation(translations, key);

        if (translation) {
          element.title = translation;
        }
      });
    }

    getNestedTranslation(obj, key) {
      return key.split(".").reduce((o, k) => (o || {})[k], obj);
    }

    renderSubscriptionStatus() {
      const container = document.getElementById("subscription-status");
      const plan = this.subscription?.plan || "free";
      const features = this.subscription?.features || { maxOrgs: 2 };

      if (plan === "premium") {
        container.innerHTML = `
        <div class="subscription-premium">
          <i class="fas fa-crown"></i>
          <span>Premium Ativo</span>
          <button class="btn-manage" onclick="popupApp.openUpgradePage()">
            <i class="fas fa-cog"></i>
          </button>
        </div>
      `;
      } else {
        container.innerHTML = `
        <div class="subscription-free">
          <span>Plano Grátis (${this.orgs.length}/${features.maxOrgs} orgs)</span>
          <button class="btn-upgrade" onclick="popupApp.openUpgradePage()">
            <i class="fas fa-rocket"></i>
            Upgrade
          </button>
        </div>
      `;
      }
    }

    renderOrgs() {
      const container = document.getElementById("orgs-list");
      const emptyState = document.getElementById("empty-state");
      const orgCount = document.getElementById("org-count");
      const maxOrgs = this.subscription?.features?.maxOrgs || 2;

      // Update org count
      orgCount.textContent = `${this.orgs.length}/${
        maxOrgs === 999 ? "∞" : maxOrgs
      }`;

      if (this.orgs.length === 0) {
        container.style.display = "none";
        emptyState.style.display = "block";
        return;
      }

      container.style.display = "block";
      emptyState.style.display = "none";

      container.innerHTML = this.orgs
        .map(
          (org) => `
      <div class="org-card" data-org-id="${org.id}">
        <div class="org-header">
          <div class="org-icon ${org.type}">
            ${this.getOrgIcon(org.type)}
          </div>
          <div class="org-info">
            <h4 class="org-name">${org.name}</h4>
            <span class="org-type">${this.getOrgTypeLabel(org.type)}</span>
            ${
              org.description
                ? `<p class="org-description">${org.description}</p>`
                : ""
            }
          </div>
          <div class="org-actions">
            <button
              class="btn-access"
              onclick="popupApp.accessOrg('${org.id}')"
              title="Acessar org"
            >
              <i class="fas fa-external-link-alt"></i>
            </button>
            <button
              class="btn-delete"
              onclick="popupApp.deleteOrg('${org.id}')"
              title="Deletar org"
            >
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
        ${
          org.lastAccessed
            ? `
          <div class="org-footer">
            <span class="last-accessed">
              <i class="fas fa-clock"></i>
              ${this.formatDate(org.lastAccessed)}
            </span>
            <span class="access-count">
              <i class="fas fa-eye"></i>
              ${org.accessCount || 0} acessos
            </span>
          </div>
        `
            : ""
        }
      </div>
    `
        )
        .join("");
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

    getOrgTypeLabel(type) {
      const translations = window.translations[this.currentLang];
      if (translations && translations.orgTypes) {
        return translations.orgTypes[type] || type;
      }

      // Fallback labels
      const labels = {
        production: "Produção",
        sandbox: "Sandbox",
        developer: "Developer",
        trailhead: "Trailhead",
      };
      return labels[type] || type;
    }

    formatDate(dateString) {
      const date = new Date(dateString);
      return (
        date.toLocaleDateString("pt-BR") +
        " " +
        date.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }

    async showAddOrgModal() {
      // Check if can add more orgs
      const response = await this.sendMessage({ type: "CHECK_ORG_LIMIT" });

      if (!response.canAdd) {
        this.showUpgradeModal();
        return;
      }

      this.showModal("add-org-modal");
    }

    showUpgradeModal() {
      this.showModal("upgrade-modal");
      this.trackEvent("upgrade_modal_shown", { trigger: "org_limit" });
    }

    showModal(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add("active");
        document.body.classList.add("modal-open");
      }
    }

    hideModal(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.remove("active");
        document.body.classList.remove("modal-open");
      }
    }

    async handleAddOrg(event) {
      event.preventDefault();

      const form = event.target;
      const formData = new FormData(form);

      const orgData = {
        name: formData.get("name") || document.getElementById("org-name").value,
        url: formData.get("url") || document.getElementById("org-url").value,
        type: formData.get("type") || document.getElementById("org-type").value,
        description:
          formData.get("description") ||
          document.getElementById("org-description").value,
      };

      // Validate
      if (!orgData.name || !orgData.url || !orgData.type) {
        const translations = window.translations[this.currentLang];
        const message =
          translations?.notifications?.fillFields ||
          "Por favor, preencha todos os campos obrigatórios";
        this.showNotification(message, "error");
        return;
      }

      try {
        const response = await this.sendMessage({
          type: "ADD_ORG",
          orgData,
        });

        if (response.success) {
          const translations = window.translations[this.currentLang];
          const message =
            translations?.notifications?.orgAdded ||
            "Org adicionada com sucesso!";
          this.showNotification(message, "success");
          this.hideModal("add-org-modal");
          form.reset();

          // Reload orgs
          await this.loadOrgs();
          this.renderOrgs();
          this.renderSubscriptionStatus();
        } else {
          this.showNotification(response.error, "error");
        }
      } catch (error) {
        console.error("Error adding org:", error);
        this.showNotification("Erro ao adicionar org", "error");
      }
    }

    async accessOrg(orgId) {
      try {
        await this.sendMessage({
          type: "ACCESS_ORG",
          orgId,
        });

        this.trackEvent("org_accessed", { orgId });

        // Close popup after accessing
        window.close();
      } catch (error) {
        console.error("Error accessing org:", error);
        this.showNotification("Erro ao acessar org", "error");
      }
    }

    async deleteOrg(orgId) {
      if (!confirm("Tem certeza que deseja deletar esta org?")) {
        return;
      }

      try {
        const response = await this.sendMessage({
          type: "DELETE_ORG",
          orgId,
        });

        if (response.success) {
          this.showNotification("Org deletada com sucesso!", "success");

          // Reload orgs
          await this.loadOrgs();
          this.renderOrgs();
          this.renderSubscriptionStatus();
        } else {
          this.showNotification(response.error, "error");
        }
      } catch (error) {
        console.error("Error deleting org:", error);
        this.showNotification("Erro ao deletar org", "error");
      }
    }

    filterOrgs(searchTerm) {
      const orgCards = document.querySelectorAll(".org-card");
      const clearButton = document.getElementById("clear-search");

      // Show/hide clear button
      clearButton.style.display = searchTerm ? "block" : "none";

      orgCards.forEach((card) => {
        const orgName = card
          .querySelector(".org-name")
          .textContent.toLowerCase();
        const orgType = card
          .querySelector(".org-type")
          .textContent.toLowerCase();
        const matches =
          orgName.includes(searchTerm.toLowerCase()) ||
          orgType.includes(searchTerm.toLowerCase());

        card.style.display = matches ? "block" : "none";
      });
    }

    openUpgradePage() {
      chrome.tabs.create({
        url: "https://victorbrandaao.github.io/salesforce-arc-pilot-landing/#pricing",
      });
      this.trackEvent("upgrade_page_opened");
    }

    toggleTheme() {
      // Theme toggle functionality
      const currentTheme = document.body.getAttribute("data-theme") || "light";
      const newTheme = currentTheme === "light" ? "dark" : "light";

      document.body.setAttribute("data-theme", newTheme);
      chrome.storage.sync.set({ theme: newTheme });

      this.trackEvent("theme_toggled", { theme: newTheme });
    }

    showNotification(message, type = "info") {
      const container = document.getElementById("notification-container");
      const notification = document.createElement("div");
      notification.className = `notification ${type}`;
      notification.innerHTML = `
      <span>${message}</span>
      <button onclick="this.parentElement.remove()">&times;</button>
    `;

      container.appendChild(notification);

      // Auto remove after 3 seconds
      setTimeout(() => {
        if (notification.parentElement) {
          notification.remove();
        }
      }, 3000);
    }

    async sendMessage(message) {
      return new Promise((resolve) => {
        chrome.runtime.sendMessage(message, resolve);
      });
    }

    async trackEvent(eventName, data = {}) {
      try {
        await this.sendMessage({
          type: "TRACK_EVENT",
          event: eventName,
          data,
        });
      } catch (error) {
        console.error("Error tracking event:", error);
      }
    }
  }

  // Initialize popup when DOM is ready
  document.addEventListener("DOMContentLoaded", () => {
    window.popupApp = new PopupApp();
  });
});
