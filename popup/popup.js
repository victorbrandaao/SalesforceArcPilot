document.addEventListener("DOMContentLoaded", () => {
  // === MODERN UI COMPONENTS ===
  const statusIndicator = document.getElementById("status-indicator");
  const statusText = document.getElementById("status-text");
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
  loadCliOrgs();
  initializeBackgroundCommunication();

  // === BACKGROUND SERVICE WORKER INTEGRATION ===
  function initializeBackgroundCommunication() {
    // Send analytics update to background
    chrome.runtime.sendMessage({
      action: "updateAnalytics",
      type: "popup_open",
    });

    // Get system theme preference
    chrome.runtime.sendMessage(
      {
        action: "getSystemTheme",
      },
      (response) => {
        if (response && response.isDark) {
          document.body.classList.add("dark-theme");
        }
      }
    );
  }

  function sendNotification(title, message) {
    chrome.runtime.sendMessage({
      action: "showNotification",
      title: title,
      message: message,
    });
  }

  // === UTILITY FUNCTIONS ===

  // Toast notification system
  function showToast(message, type = "info", duration = 3000) {
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;

    const icon = type === "success" ? "✓" : type === "error" ? "✗" : "ⓘ";
    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <span class="toast-message">${message}</span>
      <button class="toast-close" onclick="this.parentElement.remove()">×</button>
    `;

    toastContainer.appendChild(toast);

    // Auto remove after duration
    setTimeout(() => {
      if (toast.parentElement) {
        toast.remove();
      }
    }, duration);
  }

  // Status indicator management
  function updateStatus(status = "connected") {
    const statusMap = {
      connected: { text: "Conectado", class: "status-connected" },
      loading: { text: "Carregando...", class: "status-loading" },
      error: { text: "Erro de Conexão", class: "status-error" },
      offline: { text: "Offline", class: "status-offline" },
    };

    const statusInfo = statusMap[status] || statusMap.connected;
    statusIndicator.className = `status-indicator ${statusInfo.class}`;
    statusText.textContent = statusInfo.text;
  }

  // Analytics functions
  function loadAnalytics() {
    chrome.storage.local.get(["sfArcPilotAnalytics"], (result) => {
      if (result.sfArcPilotAnalytics) {
        analyticsData = { ...analyticsData, ...result.sfArcPilotAnalytics };
        updateAnalyticsDisplay();
      }
    });
  }

  function saveAnalytics() {
    chrome.storage.local.set({ sfArcPilotAnalytics: analyticsData });
  }

  function updateAnalyticsDisplay() {
    const totalOpensEl = document.getElementById("total-opens");
    const cliOpensEl = document.getElementById("cli-opens");
    const manualOpensEl = document.getElementById("manual-opens");
    const lastUsedEl = document.getElementById("last-used");

    if (totalOpensEl) totalOpensEl.textContent = analyticsData.totalOpens;
    if (cliOpensEl) cliOpensEl.textContent = analyticsData.cliOpens;
    if (manualOpensEl) manualOpensEl.textContent = analyticsData.manualOpens;
    if (lastUsedEl) {
      lastUsedEl.textContent = analyticsData.lastUsed
        ? new Date(analyticsData.lastUsed).toLocaleDateString("pt-BR")
        : "Nunca";
    }
  }

  function trackOrgOpen(type, orgIdentifier) {
    analyticsData.totalOpens++;
    analyticsData.lastUsed = new Date().toISOString();

    if (type === "cli") {
      analyticsData.cliOpens++;
    } else {
      analyticsData.manualOpens++;
    }

    saveAnalytics();
    updateAnalyticsDisplay();
  }
  // Initialize UI and load translated texts
  function initializeUI() {
    // Load translated texts
    document.getElementById("main-title").textContent =
      chrome.i18n.getMessage("appName");
    document.getElementById("cli-orgs-section-title").textContent =
      chrome.i18n.getMessage("cliOrgsSectionTitle");

    if (noCliOrgsMessage)
      noCliOrgsMessage.textContent =
        chrome.i18n.getMessage("noCliOrgsAvailable");
    if (refreshCliOrgsBtn)
      refreshCliOrgsBtn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="23 4 23 10 17 10"></polyline>
        <polyline points="1 20 1 14 7 14"></polyline>
        <path d="m3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
      </svg>
      ${chrome.i18n.getMessage("refreshCliOrgsButton")}
    `;

    document.getElementById("add-org-section-title").textContent =
      chrome.i18n.getMessage("addOrgSectionTitle");
    if (orgAliasInput)
      orgAliasInput.placeholder = chrome.i18n.getMessage("orgAliasPlaceholder");
    if (orgUrlInput)
      orgUrlInput.placeholder = chrome.i18n.getMessage("orgUrlPlaceholder");
    if (addOrgBtn)
      addOrgBtn.textContent = chrome.i18n.getMessage("addOrgButton");
    if (noOrgsMessage)
      noOrgsMessage.textContent = chrome.i18n.getMessage("noOrgsAdded");

    // Setup search functionality
    if (searchInput) {
      searchInput.addEventListener("input", handleSearch);
      searchInput.placeholder =
        chrome.i18n.getMessage("searchPlaceholder") ||
        "🔍 Buscar organizações...";
    }

    // Setup filter buttons
    filterButtons.forEach((button) => {
      button.addEventListener("click", handleFilter);
    });

    // Setup form toggle
    if (toggleFormBtn && manualOrgForm) {
      toggleFormBtn.addEventListener("click", () => {
        const isHidden = manualOrgForm.style.display === "none";
        manualOrgForm.style.display = isHidden ? "block" : "none";
        toggleFormBtn.textContent = isHidden
          ? chrome.i18n.getMessage("hideForm") || "Ocultar Formulário"
          : chrome.i18n.getMessage("showForm") || "Adicionar Org Manual";
      });
    }

    // Setup modal controls
    if (settingsBtn && settingsModal) {
      settingsBtn.addEventListener("click", () => {
        settingsModal.style.display = "flex";
      });
    }

    if (closeSettingsBtn && settingsModal) {
      closeSettingsBtn.addEventListener("click", () => {
        settingsModal.style.display = "none";
      });
    }

    // Setup refresh all button
    if (refreshAllBtn) {
      refreshAllBtn.addEventListener("click", () => {
        updateStatus("loading");
        loadCliOrgs();
        loadManualOrgs();
        showToast(
          chrome.i18n.getMessage("refreshingAll") ||
            "Atualizando todas as orgs...",
          "info"
        );
      });
    }

    // Setup event listeners
    if (refreshCliOrgsBtn)
      refreshCliOrgsBtn.addEventListener("click", loadCliOrgs);
    if (addOrgBtn) addOrgBtn.addEventListener("click", handleAddOrg);

    // Setup donation section
    if (toggleDonationBtn && donationContent) {
      toggleDonationBtn.addEventListener("click", () => {
        const isCollapsed = donationContent.classList.contains("collapsed");
        donationContent.classList.toggle("collapsed");

        // Rotate arrow icon
        const icon = toggleDonationBtn.querySelector("svg");
        if (icon) {
          icon.style.transform = isCollapsed
            ? "rotate(0deg)"
            : "rotate(180deg)";
        }
      });
    }

    // Setup PIX copy functionality
    if (copyPixBtn && pixKey) {
      copyPixBtn.addEventListener("click", () => {
        copyToClipboard(pixKey.value);
        showToast("Chave PIX copiada! 💚", "success", 3000);

        // Track donation interest
        analyticsData.donationInterest =
          (analyticsData.donationInterest || 0) + 1;
        saveAnalytics();
      });
    }

    // Setup amount buttons
    amountButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const amount = button.dataset.amount;
        showToast(
          `Valor sugerido: R$ ${amount} - Use a chave PIX acima!`,
          "info",
          5000
        );

        // Track preferred amounts
        analyticsData.preferredAmount = amount;
        saveAnalytics();

        // Highlight the PIX key
        if (pixKey) {
          pixKey.select();
          pixKey.focus();
        }
      });
    });

    // ...existing code...
  }

  // Search and filter functionality
  function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const allOrgItems = document.querySelectorAll(".org-item");

    allOrgItems.forEach((item) => {
      const alias =
        item.querySelector(".alias")?.textContent.toLowerCase() || "";
      const url = item.querySelector(".url")?.textContent.toLowerCase() || "";
      const username =
        item.querySelector(".username")?.textContent.toLowerCase() || "";

      const matches =
        alias.includes(searchTerm) ||
        url.includes(searchTerm) ||
        username.includes(searchTerm);

      item.style.display = matches ? "flex" : "none";
    });
  }

  function handleFilter(event) {
    const filterType = event.target.dataset.filter;

    // Update active filter button
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    event.target.classList.add("active");

    const allOrgItems = document.querySelectorAll(".org-item");

    allOrgItems.forEach((item) => {
      let shouldShow = true;

      switch (filterType) {
        case "all":
          shouldShow = true;
          break;
        case "cli":
          shouldShow = item.classList.contains("cli-item");
          break;
        case "manual":
          shouldShow = item.classList.contains("manual-item");
          break;
        case "favorites":
          shouldShow = item
            .querySelector(".favorite-btn")
            ?.classList.contains("active");
          break;
      }

      item.style.display = shouldShow ? "flex" : "none";
    });
  }

  // Enhanced add org function
  function handleAddOrg() {
    const alias = orgAliasInput?.value.trim();
    const url = orgUrlInput?.value.trim();

    if (!alias || !url) {
      showToast(chrome.i18n.getMessage("fillFieldsAlert"), "error");
      return;
    }

    // Validate URL format
    if (
      !url.includes("salesforce.com") &&
      !url.includes("lightning.force.com")
    ) {
      showToast("URL deve ser um domínio Salesforce válido", "error");
      return;
    }

    chrome.storage.sync.get(["salesforceOrgs"], (result) => {
      const orgs = result.salesforceOrgs || [];

      // Check for duplicates
      const existingOrg = orgs.find(
        (org) => org.alias === alias || org.url === url
      );
      if (existingOrg) {
        showToast("Org com este alias ou URL já existe", "error");
        return;
      }

      orgs.push({
        alias,
        url: url.startsWith("https://") ? url : `https://${url}`,
        createdAt: new Date().toISOString(),
        isFavorite: false,
      });

      chrome.storage.sync.set({ salesforceOrgs: orgs }, () => {
        orgAliasInput.value = "";
        orgUrlInput.value = "";
        loadManualOrgs();
        showToast(`Org "${alias}" adicionada com sucesso!`, "success");
      });
    });
  }
  // Enhanced manual orgs loading
  function loadManualOrgs() {
    chrome.storage.sync.get(["salesforceOrgs"], (result) => {
      const orgs = result.salesforceOrgs || [];

      if (!orgListDiv) return;

      orgListDiv.innerHTML = "";

      if (orgs.length === 0) {
        if (noOrgsMessage) noOrgsMessage.style.display = "block";
      } else {
        if (noOrgsMessage) noOrgsMessage.style.display = "none";

        orgs.forEach((org, index) => {
          const orgItem = document.createElement("div");
          orgItem.className = "org-item manual-item";

          const favoriteClass = org.isFavorite ? "active" : "";
          const favoriteIcon = org.isFavorite ? "★" : "☆";

          orgItem.innerHTML = `
            <div class="org-info">
              <div class="org-header">
                <span class="alias">${org.alias}</span>
                <button class="favorite-btn ${favoriteClass}" data-action="toggle-favorite-manual" data-index="${index}">
                  ${favoriteIcon}
                </button>
              </div>
              <span class="url">${org.url}</span>
              ${
                org.createdAt
                  ? `<span class="org-meta">Adicionada em ${new Date(
                      org.createdAt
                    ).toLocaleDateString("pt-BR")}</span>`
                  : ""
              }
            </div>
            <div class="org-actions">
              <button data-action="copy-url" data-url="${
                org.url
              }" class="action-btn" title="Copiar URL">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              </button>
              <button data-action="open-manual" data-url="${
                org.url
              }" data-alias="${org.alias}" class="open-btn primary">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
                ${chrome.i18n.getMessage("openButton")}
              </button>
              <button data-action="delete-manual" data-index="${index}" class="delete-btn" title="Excluir">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          `;

          orgListDiv.appendChild(orgItem);
        });

        // Enhanced event listeners
        orgListDiv.querySelectorAll("button").forEach((button) => {
          button.addEventListener("click", (e) => {
            e.stopPropagation();
            const action = e.currentTarget.dataset.action;
            const url = e.currentTarget.dataset.url;
            const alias = e.currentTarget.dataset.alias;
            const index = parseInt(e.currentTarget.dataset.index);

            switch (action) {
              case "open-manual":
                openOrgManually(url, alias);
                break;
              case "delete-manual":
                deleteManualOrg(index);
                break;
              case "copy-url":
                copyToClipboard(url);
                break;
              case "toggle-favorite-manual":
                toggleFavorite("manual", index);
                break;
            }
          });
        });
      }
    });
  }

  // Enhanced CLI orgs loading
  function loadCliOrgs() {
    updateStatus("loading");

    if (!refreshCliOrgsBtn || !cliOrgListDiv) return;

    // Add loading state to refresh button
    refreshCliOrgsBtn.classList.add("loading");
    refreshCliOrgsBtn.disabled = true;

    // Show loading skeleton
    cliOrgListDiv.innerHTML = `
      <div class="loading-skeleton">
        <div class="skeleton-item">
          <div class="skeleton-line"></div>
          <div class="skeleton-line short"></div>
        </div>
        <div class="skeleton-item">
          <div class="skeleton-line"></div>
          <div class="skeleton-line short"></div>
        </div>
        <div class="skeleton-item">
          <div class="skeleton-line"></div>
          <div class="skeleton-line short"></div>
        </div>
      </div>
    `;

    if (noCliOrgsMessage) noCliOrgsMessage.style.display = "none";

    fetch("http://localhost:3000/list-orgs")
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(
              errorData.message || "Erro desconhecido do servidor local."
            );
          });
        }
        return response.json();
      })
      .then((data) => {
        // Remove loading state
        refreshCliOrgsBtn.classList.remove("loading");
        refreshCliOrgsBtn.disabled = false;
        updateStatus("connected");

        if (data.success) {
          const cliOrgs = data.orgs || [];
          cliOrgListDiv.innerHTML = "";

          if (cliOrgs.length === 0) {
            if (noCliOrgsMessage) noCliOrgsMessage.style.display = "block";
          } else {
            if (noCliOrgsMessage) noCliOrgsMessage.style.display = "none";

            cliOrgs.forEach((org, index) => {
              const orgItem = document.createElement("div");
              orgItem.className = "org-item cli-item";

              const defaultClass = org.isDefault ? " default-org" : "";
              const orgIcon = org.isDefault ? "⚡" : "🏢";
              const statusBadge = org.isDefault
                ? '<span class="org-badge default">Default</span>'
                : "";

              orgItem.innerHTML = `
                <div class="org-info${defaultClass}">
                  <div class="org-header">
                    <span class="alias">${orgIcon} ${org.alias}</span>
                    ${statusBadge}
                  </div>
                  <span class="username">${org.username}</span>
                  <span class="url">${org.instanceUrl}</span>
                  <span class="org-meta">Via Salesforce CLI</span>
                </div>
                <div class="org-actions">
                  <button data-action="copy-url" data-url="${
                    org.instanceUrl
                  }" class="action-btn" title="Copiar URL">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  </button>
                  <button data-action="open-cli" data-alias="${
                    org.alias || org.username
                  }" class="open-btn primary">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="m9 18 6-6-6-6"/>
                    </svg>
                    ${chrome.i18n.getMessage("openButton")}
                  </button>
                </div>
              `;

              cliOrgListDiv.appendChild(orgItem);
            });

            // Enhanced event listeners for CLI orgs
            cliOrgListDiv.querySelectorAll("button").forEach((button) => {
              button.addEventListener("click", (e) => {
                e.stopPropagation();
                const action = e.currentTarget.dataset.action;
                const alias = e.currentTarget.dataset.alias;
                const url = e.currentTarget.dataset.url;

                switch (action) {
                  case "open-cli":
                    openOrgViaCli(alias);
                    break;
                  case "copy-url":
                    copyToClipboard(url);
                    break;
                }
              });
            });
          }

          showToast(`${cliOrgs.length} orgs CLI carregadas`, "success", 2000);
        } else {
          if (noCliOrgsMessage) {
            noCliOrgsMessage.style.display = "block";
            noCliOrgsMessage.textContent = chrome.i18n.getMessage(
              "cliListError",
              [data.message]
            );
          }
          console.error("Erro ao listar Orgs do CLI:", data.message);
          updateStatus("error");
        }
      })
      .catch((error) => {
        // Remove loading state
        refreshCliOrgsBtn.classList.remove("loading");
        refreshCliOrgsBtn.disabled = false;
        updateStatus("error");

        cliOrgListDiv.innerHTML = "";
        if (noCliOrgsMessage) {
          noCliOrgsMessage.style.display = "block";
          if (error.message.includes("Failed to fetch")) {
            noCliOrgsMessage.textContent = chrome.i18n.getMessage(
              "serverNotRunningError"
            );
            showToast("Servidor local não está rodando", "error");
          } else {
            noCliOrgsMessage.textContent = chrome.i18n.getMessage(
              "serverCommunicationError",
              [error.message]
            );
            showToast(`Erro de comunicação: ${error.message}`, "error");
          }
        }
        console.error(
          "Erro ao comunicar com o servidor local para listar Orgs:",
          error
        );
      });
  }

  // Enhanced utility functions
  function copyToClipboard(text) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        showToast("URL copiada para a área de transferência!", "success", 2000);
      })
      .catch(() => {
        showToast("Erro ao copiar URL", "error");
      });
  }

  function toggleFavorite(type, index) {
    if (type === "manual") {
      chrome.storage.sync.get(["salesforceOrgs"], (result) => {
        const orgs = result.salesforceOrgs || [];
        if (orgs[index]) {
          orgs[index].isFavorite = !orgs[index].isFavorite;
          chrome.storage.sync.set({ salesforceOrgs: orgs }, () => {
            loadManualOrgs();
            const action = orgs[index].isFavorite
              ? "adicionada aos"
              : "removida dos";
            showToast(`Org ${action} favoritos`, "success", 2000);
          });
        }
      });
    }
  }

  // Enhanced org opening functions
  function openOrgManually(url, alias) {
    chrome.tabs.create({ url: url });
    trackOrgOpen("manual", alias);

    // Send analytics to background
    chrome.runtime.sendMessage({
      action: "updateAnalytics",
      type: "manual",
    });

    // Send notification
    sendNotification("Org Aberta", `${alias} foi aberta com sucesso`);

    showToast(`Abrindo ${alias}...`, "success", 2000);
    window.close();
  }

  function deleteManualOrg(index) {
    chrome.storage.sync.get(["salesforceOrgs"], (result) => {
      const orgs = result.salesforceOrgs || [];
      const orgAlias = orgs[index]?.alias;

      if (confirm(chrome.i18n.getMessage("confirmDelete"))) {
        orgs.splice(index, 1);
        chrome.storage.sync.set({ salesforceOrgs: orgs }, () => {
          loadManualOrgs();
          showToast(`Org "${orgAlias}" removida`, "success", 2000);
        });
      }
    });
  }

  function openOrgViaCli(alias) {
    const serverUrl = "http://localhost:3000/open-org";

    // Show loading toast
    showToast(`Abrindo ${alias} via CLI...`, "info", 2000);

    fetch(serverUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ alias: alias }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(
              errorData.message || "Erro desconhecido do servidor local."
            );
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Resposta do servidor local:", data);
        if (data.success) {
          trackOrgOpen("cli", alias);

          // Send analytics to background
          chrome.runtime.sendMessage({
            action: "updateAnalytics",
            type: "cli",
          });

          // Send notification
          sendNotification("Org CLI Aberta", `${alias} foi aberta via CLI`);

          showToast(
            chrome.i18n.getMessage("orgOpenSuccess", [alias]),
            "success"
          );
          window.close();
        } else {
          showToast(
            chrome.i18n.getMessage("orgOpenError", [alias, data.message]),
            "error"
          );
        }
      })
      .catch((error) => {
        console.error("Erro ao comunicar com o servidor local:", error);
        if (error.message.includes("Failed to fetch")) {
          showToast(chrome.i18n.getMessage("serverNotRunningError"), "error");
        } else {
          showToast(
            chrome.i18n.getMessage("serverCommunicationError", [error.message]),
            "error"
          );
        }
      });
  }

  // Keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      if (searchInput) {
        searchInput.focus();
      }
    }

    // Escape to close modal
    if (
      e.key === "Escape" &&
      settingsModal &&
      settingsModal.style.display === "flex"
    ) {
      settingsModal.style.display = "none";
    }
  });

  // Initialize the extension
  updateStatus("loading");
});
