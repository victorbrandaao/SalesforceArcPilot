document.addEventListener("DOMContentLoaded", () => {
  // === MODERN UI COMPONENTS ===
  const statusIndicator = document.getElementById("status-indicator");
  const statusText = document.getElementById("status-text");
  const cliStatusIndicator = document.getElementById("cli-status");
  const cliStatusText = document.getElementById("cli-status-text");
  const searchInput = document.getElementById("search-orgs");
  const filterButtons = document.querySelectorAll(".filter-button");
  const refreshAllBtn = document.getElementById("refresh-all");
  const settingsBtn = document.getElementById("settings-btn");
  const settingsModal = document.getElementById("settings-modal");
  const closeSettingsBtn = document.getElementById("close-settings");
  const toastContainer = document.getElementById("toast-container");
  const toggleFormBtn = document.getElementById("toggle-form");
  const manualOrgForm = document.getElementById("manual-org-form");

  // === EXISTING COMPONENTS ===
  const orgListDiv = document.querySelector("#org-list.manual-list");
  const noOrgsMessage = document.getElementById("no-orgs-message");
  const addOrgBtn = document.getElementById("add-org-btn");
  const orgAliasInput = document.getElementById("org-alias");
  const orgUrlInput = document.getElementById("org-url");
  const cliOrgListDiv = document.getElementById("cli-org-list");
  const noCliOrgsMessage = document.getElementById("no-cli-orgs-message");
  const refreshCliOrgsBtn = document.getElementById("refresh-cli-orgs-btn");

  // === PIX DONATION COMPONENTS ===
  const toggleDonationBtn = document.getElementById("toggle-donation");
  const donationContent = document.getElementById("donation-content");
  const pixKey = document.getElementById("pix-key");
  const copyPixBtn = document.querySelector("[data-action='copy-pix']");
  const amountButtons = document.querySelectorAll(".amount-btn");

  // === ANALYTICS DATA ===
  let analyticsData = {
    totalOpens: 0,
    cliOpens: 0,
    manualOpens: 0,
    lastUsed: null,
    favoriteOrg: null,
  };

  // === INITIALIZATION ===
  initializeUI();
  loadAnalytics();
  loadManualOrgs();
  checkServerHealth();
  initializeBackgroundCommunication();

  // === PIX DONATION SYSTEM ===
  
  // Initialize PIX donation components
  function initializePIXDonation() {
    // Toggle donation section
    if (toggleDonationBtn && donationContent) {
      toggleDonationBtn.addEventListener("click", () => {
        const isExpanded = donationContent.style.display !== "none";
        donationContent.style.display = isExpanded ? "none" : "block";
        
        // Update button icon rotation
        const icon = toggleDonationBtn.querySelector("svg");
        if (icon) {
          icon.style.transform = isExpanded ? "rotate(0deg)" : "rotate(180deg)";
        }
        
        // Update aria-expanded for accessibility
        toggleDonationBtn.setAttribute("aria-expanded", !isExpanded);
      });
    }

    // Copy PIX key functionality
    if (copyPixBtn && pixKey) {
      copyPixBtn.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(pixKey.value);
          showToast(chrome.i18n.getMessage("pixKeyCopied"), "success");
          
          // Visual feedback
          copyPixBtn.classList.add("copied");
          setTimeout(() => {
            copyPixBtn.classList.remove("copied");
          }, 1000);
        } catch (error) {
          console.error("Error copying PIX key:", error);
          showToast("Erro ao copiar chave PIX", "error");
        }
      });
    }

    // Amount button interactions
    amountButtons.forEach(button => {
      button.addEventListener("click", () => {
        // Remove active class from all buttons
        amountButtons.forEach(btn => btn.classList.remove("active"));
        
        // Add active class to clicked button
        button.classList.add("active");
        
        const amount = button.dataset.amount;
        showToast(`Valor sugerido: R$ ${amount}`, "info", 2000);
        
        // Analytics tracking
        chrome.runtime.sendMessage({
          action: "trackDonationIntent",
          amount: amount
        });
      });
    });
  }

  // Initialize PIX donation modal (footer modal)
  function initializePIXModal() {
    const donateBtn = document.getElementById("donate-btn");
    const donationModal = document.getElementById("donation-modal");
    const closeModalBtn = document.getElementById("close-modal");
    const modalOverlay = donationModal?.querySelector(".modal-overlay");
    const copyPixModalBtn = document.getElementById("copy-pix");
    const pixKeyModal = document.querySelector("#donation-modal #pix-key");
    const modalAmountButtons = document.querySelectorAll("#donation-modal .amount-btn");

    // Open modal
    if (donateBtn && donationModal) {
      donateBtn.addEventListener("click", () => {
        donationModal.style.display = "flex";
        donationModal.setAttribute("aria-hidden", "false");
        
        // Track modal open
        chrome.runtime.sendMessage({
          action: "trackDonationModalOpen"
        });
      });
    }

    // Close modal functions
    function closeDonationModal() {
      if (donationModal) {
        donationModal.style.display = "none";
        donationModal.setAttribute("aria-hidden", "true");
      }
    }

    // Close modal events
    if (closeModalBtn) {
      closeModalBtn.addEventListener("click", closeDonationModal);
    }
    
    if (modalOverlay) {
      modalOverlay.addEventListener("click", closeDonationModal);
    }

    // Copy PIX key in modal
    if (copyPixModalBtn && pixKeyModal) {
      copyPixModalBtn.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(pixKeyModal.value);
          showToast(chrome.i18n.getMessage("pixKeyCopied"), "success");
          
          // Visual feedback
          copyPixModalBtn.classList.add("copied");
          setTimeout(() => {
            copyPixModalBtn.classList.remove("copied");
          }, 1000);
        } catch (error) {
          console.error("Error copying PIX key:", error);
          showToast("Erro ao copiar chave PIX", "error");
        }
      });
    }

    // Modal amount buttons
    modalAmountButtons.forEach(button => {
      button.addEventListener("click", () => {
        // Remove active class from all modal buttons
        modalAmountButtons.forEach(btn => btn.classList.remove("active"));
        
        // Add active class to clicked button
        button.classList.add("active");
        
        const amount = button.dataset.amount;
        showToast(`Valor selecionado: R$ ${amount}`, "success", 2000);
        
        // Analytics tracking
        chrome.runtime.sendMessage({
          action: "trackDonationIntent",
          amount: amount,
          source: "modal"
        });
      });
    });
  }

  // Initialize PIX system
  initializePIXDonation();
  initializePIXModal();

  // Initialize the extension
  updateStatus("loading");
});
