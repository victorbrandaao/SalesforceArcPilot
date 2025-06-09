class SubscriptionUI {
  constructor() {
    this.currentSubscription = null;
    this.init();
  }

  async init() {
    await this.loadSubscriptionInfo();
    this.renderSubscriptionStatus();
    this.bindEvents();
  }

  async loadSubscriptionInfo() {
    this.currentSubscription = await this.getSubscriptionFromBackground();
  }

  async getSubscriptionFromBackground() {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ type: 'GET_SUBSCRIPTION' }, (response) => {
        resolve(response);
      });
    });
  }

  renderSubscriptionStatus() {
    const container = document.getElementById('subscription-status');
    if (!container) return;

    const plan = this.currentSubscription?.plan || 'free';
    const features = this.currentSubscription?.features || {};

    container.innerHTML = `
      <div class="subscription-card ${plan}">
        <div class="plan-header">
          <h3>${this.getPlanDisplayName(plan)}</h3>
          ${plan === 'premium' ? '<span class="premium-badge">PREMIUM</span>' : ''}
        </div>
        
        <div class="features-list">
          <div class="feature ${features.maxOrgs > 2 ? 'enabled' : 'disabled'}">
            <i class="fas fa-database"></i>
            <span>Orgs: ${features.maxOrgs || 2} ${features.maxOrgs > 100 ? '(ilimitadas)' : ''}</span>
          </div>
          
          <div class="feature ${features.analytics ? 'enabled' : 'disabled'}">
            <i class="fas fa-chart-bar"></i>
            <span>Analytics Dashboard</span>
            ${!features.analytics ? '<i class="fas fa-lock"></i>' : ''}
          </div>
          
          <div class="feature ${features.darkMode ? 'enabled' : 'disabled'}">
            <i class="fas fa-moon"></i>
            <span>Dark Mode + Temas</span>
            ${!features.darkMode ? '<i class="fas fa-lock"></i>' : ''}
          </div>
          
          <div class="feature ${features.cloudSync ? 'enabled' : 'disabled'}">
            <i class="fas fa-cloud"></i>
            <span>Sync na Nuvem</span>
            ${!features.cloudSync ? '<i class="fas fa-lock"></i>' : ''}
          </div>
          
          <div class="feature ${features.backup ? 'enabled' : 'disabled'}">
            <i class="fas fa-shield-alt"></i>
            <span>Backup Automático</span>
            ${!features.backup ? '<i class="fas fa-lock"></i>' : ''}
          </div>
        </div>

        <div class="subscription-actions">
          ${this.renderActionButtons(plan)}
        </div>
      </div>
    `;
  }

  renderActionButtons(plan) {
    if (plan === 'free') {
      return `
        <button class="upgrade-btn premium" onclick="subscriptionUI.showUpgradeModal()">
          <i class="fas fa-rocket"></i>
          Upgrade para Premium
        </button>
        <a href="https://victorbrandaao.github.io/salesforce-arc-pilot-landing/#pricing" target="_blank" class="learn-more">
          Ver todos os planos
        </a>
      `;
    } else if (plan === 'premium') {
      return `
        <div class="premium-status">
          <i class="fas fa-check-circle"></i>
          <span>Assinatura ativa</span>
        </div>
        <button class="manage-btn" onclick="subscriptionUI.showManageModal()">
          <i class="fas fa-cog"></i>
          Gerenciar Assinatura
        </button>
      `;
    }
    return '';
  }

  getPlanDisplayName(plan) {
    const names = {
      'free': 'Plano Grátis',
      'premium': 'Premium',
      'enterprise': 'Enterprise'
    };
    return names[plan] || 'Desconhecido';
  }

  showUpgradeModal() {
    const modal = document.createElement('div');
    modal.className = 'upgrade-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>Upgrade para Premium</h3>
          <button class="close-btn" onclick="this.closest('.upgrade-modal').remove()">×</button>
        </div>
        
        <div class="upgrade-benefits">
          <h4>Desbloqueie recursos premium:</h4>
          <ul>
            <li>✨ Orgs ilimitadas</li>
            <li>📊 Analytics dashboard completo</li>
            <li>🌙 Dark mode + temas personalizados</li>
            <li>☁️ Sincronização na nuvem</li>
            <li>🔒 Backup automático</li>
            <li>🚀 Suporte prioritário</li>
          </ul>
        </div>

        <div class="pricing-info">
          <div class="price">
            <span class="currency">R$</span>
            <span class="amount">19</span>
            <span class="period">/mês</span>
          </div>
          <p class="price-note">Cancele a qualquer momento</p>
        </div>

        <div class="upgrade-actions">
          <button class="upgrade-now-btn" onclick="subscriptionUI.redirectToPayment()">
            <i class="fas fa-credit-card"></i>
            Assinar Agora
          </button>
          <button class="learn-more-btn" onclick="subscriptionUI.openLandingPage()">
            Ver detalhes
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
  }

  showManageModal() {
    const modal = document.createElement('div');
    modal.className = 'manage-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>Gerenciar Assinatura</h3>
          <button class="close-btn" onclick="this.closest('.manage-modal').remove()">×</button>
        </div>
        
        <div class="subscription-details">
          <div class="detail-item">
            <span class="label">Plano:</span>
            <span class="value">Premium</span>
          </div>
          <div class="detail-item">
            <span class="label">Status:</span>
            <span class="value status-active">Ativo</span>
          </div>
          <div class="detail-item">
            <span class="label">Próxima cobrança:</span>
            <span class="value">${this.getNextBillingDate()}</span>
          </div>
        </div>

        <div class="manage-actions">
          <button class="update-payment-btn" onclick="subscriptionUI.updatePaymentMethod()">
            <i class="fas fa-credit-card"></i>
            Atualizar pagamento
          </button>
          <button class="cancel-btn" onclick="subscriptionUI.cancelSubscription()">
            <i class="fas fa-times"></i>
            Cancelar assinatura
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
  }

  redirectToPayment() {
    const paymentUrl = 'https://victorbrandaao.github.io/salesforce-arc-pilot-landing/#pricing';
    chrome.tabs.create({ url: paymentUrl });
  }

  openLandingPage() {
    chrome.tabs.create({ 
      url: 'https://victorbrandaao.github.io/salesforce-arc-pilot-landing' 
    });
  }

  async cancelSubscription() {
    if (confirm('Tem certeza que deseja cancelar sua assinatura? Você manterá acesso aos recursos premium até o final do período pago.')) {
      const result = await this.sendMessageToBackground('CANCEL_SUBSCRIPTION');
      if (result.success) {
        alert('Assinatura cancelada com sucesso.');
        this.loadSubscriptionInfo();
        this.renderSubscriptionStatus();
      } else {
        alert('Erro ao cancelar assinatura. Tente novamente.');
      }
    }
  }

  async sendMessageToBackground(type, data = {}) {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ type, ...data }, resolve);
    });
  }

  getNextBillingDate() {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return date.toLocaleDateString('pt-BR');
  }

  bindEvents() {
    // Listen for subscription updates
    chrome.runtime.onMessage.addListener((message) => {
      if (message.type === 'SUBSCRIPTION_UPDATED') {
        this.currentSubscription = message.subscription;
        this.renderSubscriptionStatus();
      }
    });
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.subscriptionUI = new SubscriptionUI();
  });
} else {
  window.subscriptionUI = new SubscriptionUI();
}
