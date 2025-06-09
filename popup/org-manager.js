class OrgManager {
  constructor() {
    this.orgs = [];
    this.subscriptionInfo = null;
    this.init();
  }

  async init() {
    await this.loadOrgs();
    await this.loadSubscriptionInfo();
    this.renderOrgs();
    this.bindEvents();
  }

  async loadSubscriptionInfo() {
    this.subscriptionInfo = await this.getSubscriptionFromBackground();
  }

  async getSubscriptionFromBackground() {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ type: "GET_SUBSCRIPTION" }, resolve);
    });
  }

  async loadOrgs() {
    const data = await chrome.storage.sync.get(["orgs"]);
    this.orgs = data.orgs || [];
  }

  async saveOrgs() {
    await chrome.storage.sync.set({ orgs: this.orgs });
  }

  async addOrg(orgData) {
    // Check subscription limits
    const maxOrgs = this.subscriptionInfo?.features?.maxOrgs || 2;

    if (this.orgs.length >= maxOrgs) {
      this.showUpgradePrompt(maxOrgs);
      return false;
    }

    this.orgs.push({
      id: Date.now().toString(),
      name: orgData.name,
      url: orgData.url,
      type: orgData.type,
      addedAt: new Date().toISOString(),
      lastAccessed: null,
    });

    await this.saveOrgs();
    this.renderOrgs();
    return true;
  }

  showUpgradePrompt(currentLimit) {
    const modal = document.createElement("div");
    modal.className = "upgrade-prompt-modal";
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>Limite de Orgs Atingido</h3>
          <button class="close-btn" onclick="this.closest('.upgrade-prompt-modal').remove()">×</button>
        </div>
        
        <div class="limit-info">
          <i class="fas fa-exclamation-triangle"></i>
          <p>Você atingiu o limite de <strong>${currentLimit} orgs</strong> do plano gratuito.</p>
          <p>Faça upgrade para o Premium e tenha <strong>orgs ilimitadas</strong>!</p>
        </div>

        <div class="upgrade-benefits">
          <h4>Com o Premium você também ganha:</h4>
          <ul>
            <li>📊 Analytics dashboard</li>
            <li>🌙 Dark mode + temas</li>
            <li>☁️ Sync na nuvem</li>
            <li>🔒 Backup automático</li>
          </ul>
        </div>

        <div class="upgrade-actions">
          <button class="upgrade-btn" onclick="orgManager.redirectToUpgrade()">
            <i class="fas fa-rocket"></i>
            Fazer Upgrade - R$ 19/mês
          </button>
          <button class="maybe-later-btn" onclick="this.closest('.upgrade-prompt-modal').remove()">
            Talvez mais tarde
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
  }

  redirectToUpgrade() {
    chrome.tabs.create({
      url: "https://victorbrandaao.github.io/salesforce-arc-pilot-landing/#pricing",
    });
  }

  removeOrg(orgId) {
    this.orgs = this.orgs.filter((org) => org.id !== orgId);
    this.saveOrgs();
    this.renderOrgs();
  }

  async accessOrg(orgId) {
    const org = this.orgs.find((o) => o.id === orgId);
    if (org) {
      // Update last accessed time
      org.lastAccessed = new Date().toISOString();
      await this.saveOrgs();

      // Open org in new tab
      chrome.tabs.create({ url: org.url });

      // Track usage for analytics (if premium)
      if (this.subscriptionInfo?.features?.analytics) {
        this.trackOrgAccess(org);
      }
    }
  }

  trackOrgAccess(org) {
    // Send usage data to backend for analytics
    chrome.runtime.sendMessage({
      type: "TRACK_ORG_ACCESS",
      orgId: org.id,
      orgType: org.type,
      timestamp: new Date().toISOString(),
    });
  }

  renderOrgs() {
    const container = document.getElementById("orgs-list");
    if (!container) return;

    const maxOrgs = this.subscriptionInfo?.features?.maxOrgs || 2;
    const canAddMore = this.orgs.length < maxOrgs;

    let html = `
      <div class="orgs-header">
        <h3>Suas Orgs (${this.orgs.length}/${
      maxOrgs === 999 ? "∞" : maxOrgs
    })</h3>
        ${
          canAddMore
            ? `
          <button class="add-org-btn" onclick="orgManager.showAddOrgModal()">
            <i class="fas fa-plus"></i>
            Adicionar Org
          </button>
        `
            : `
          <button class="add-org-btn disabled" onclick="orgManager.showUpgradePrompt(${maxOrgs})">
            <i class="fas fa-lock"></i>
            Upgrade para mais
          </button>
        `
        }
      </div>
      
      <div class="orgs-grid">
    `;

    if (this.orgs.length === 0) {
      html += `
        <div class="empty-state">
          <i class="fas fa-database"></i>
          <p>Nenhuma org adicionada ainda</p>
          <button class="add-first-org-btn" onclick="orgManager.showAddOrgModal()">
            Adicionar primeira org
          </button>
        </div>
      `;
    } else {
      this.orgs.forEach((org) => {
        html += `
          <div class="org-card" data-org-id="${org.id}">
            <div class="org-header">
              <div class="org-icon">
                <i class="fas fa-cloud"></i>
              </div>
              <div class="org-info">
                <h4>${org.name}</h4>
                <span class="org-type">${this.getOrgTypeLabel(org.type)}</span>
              </div>
              <div class="org-actions">
                <button class="access-btn" onclick="orgManager.accessOrg('${
                  org.id
                }')">
                  <i class="fas fa-external-link-alt"></i>
                </button>
                <button class="remove-btn" onclick="orgManager.removeOrg('${
                  org.id
                }')">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>
            ${
              org.lastAccessed
                ? `
              <div class="org-footer">
                <span class="last-accessed">
                  Último acesso: ${this.formatDate(org.lastAccessed)}
                </span>
              </div>
            `
                : ""
            }
          </div>
        `;
      });
    }

    html += "</div>";
    container.innerHTML = html;
  }

  getOrgTypeLabel(type) {
    const labels = {
      production: "Produção",
      sandbox: "Sandbox",
      developer: "Developer",
      trailhead: "Trailhead",
    };
    return labels[type] || "Desconhecido";
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

  showAddOrgModal() {
    // Implementation for add org modal
    // This would show a form to add new org
  }

  bindEvents() {
    // Listen for subscription updates
    chrome.runtime.onMessage.addListener((message) => {
      if (message.type === "SUBSCRIPTION_UPDATED") {
        this.subscriptionInfo = message.subscription;
        this.renderOrgs();
      }
    });
  }
}

// Initialize
window.orgManager = new OrgManager();
