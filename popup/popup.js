document.addEventListener("DOMContentLoaded", () => {
  // Referências aos elementos HTML
  const orgListDiv = document.querySelector("#org-list.manual-list"); // Seleciona a lista manual
  const noOrgsMessage = document.getElementById("no-orgs-message");
  const addOrgBtn = document.getElementById("add-org-btn");
  const orgAliasInput = document.getElementById("org-alias");
  const orgUrlInput = document.getElementById("org-url");

  const cliOrgListDiv = document.getElementById("cli-org-list");
  const noCliOrgsMessage = document.getElementById("no-cli-orgs-message");
  const refreshCliOrgsBtn = document.getElementById("refresh-cli-orgs-btn");

  // --- Carregar textos traduzidos para o HTML ---
  document.getElementById("main-title").textContent =
    chrome.i18n.getMessage("appName"); // Usar appName para o título principal
  document.getElementById("cli-orgs-section-title").textContent =
    chrome.i18n.getMessage("cliOrgsSectionTitle");
  noCliOrgsMessage.textContent = chrome.i18n.getMessage("noCliOrgsAvailable");
  refreshCliOrgsBtn.textContent = chrome.i18n.getMessage(
    "refreshCliOrgsButton"
  );

  // Adicionar ícone de refresh
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
  orgAliasInput.placeholder = chrome.i18n.getMessage("orgAliasPlaceholder");
  orgUrlInput.placeholder = chrome.i18n.getMessage("orgUrlPlaceholder");
  addOrgBtn.textContent = chrome.i18n.getMessage("addOrgButton");
  noOrgsMessage.textContent = chrome.i18n.getMessage("noOrgsAdded"); // Mensagem para lista manual
  // --- Fim da parte de carregamento de textos ---

  // Função para carregar e exibir as orgs salvas MANUALMENTE
  function loadManualOrgs() {
    chrome.storage.sync.get(["salesforceOrgs"], (result) => {
      const orgs = result.salesforceOrgs || [];
      orgListDiv.innerHTML = ""; // Limpa a lista existente

      if (orgs.length === 0) {
        noOrgsMessage.style.display = "block";
      } else {
        noOrgsMessage.style.display = "none";
        orgs.forEach((org, index) => {
          const orgItem = document.createElement("div");
          orgItem.className = "org-item manual-item"; // Nova classe para itens manuais
          // AQUI ESTÁ A CORREÇÃO: Certifique-se de que o template literal ` ` esteja fechado corretamente.
          orgItem.innerHTML = `
                        <div class="org-info">
                            <span class="alias">${org.alias}</span>
                            <span class="url">${org.url}</span>
                        </div>
                        <div class="org-actions">
                            <button data-action="open-manual" data-url="${
                              org.url
                            }" class="open-btn">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="m9 18 6-6-6-6"/>
                              </svg>
                              ${chrome.i18n.getMessage("openButton")}
                            </button>
                            <button data-action="delete-manual" data-index="${index}" class="delete-btn">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </button>
                        </div>
                    `; // Fechamento do template literal
          orgListDiv.appendChild(orgItem);
        });

        orgListDiv.querySelectorAll("button").forEach((button) => {
          button.addEventListener("click", (e) => {
            const action = e.target.dataset.action;
            const url = e.target.dataset.url;
            const index = parseInt(e.target.dataset.index);

            if (action === "open-manual") {
              openOrgManually(url);
            } else if (action === "delete-manual") {
              deleteManualOrg(index);
            }
          });
        });
      }
    });
  }

  // Função para carregar e exibir Orgs do CLI
  function loadCliOrgs() {
    // Adicionar classe loading ao botão refresh
    refreshCliOrgsBtn.classList.add("loading");
    refreshCliOrgsBtn.disabled = true;

    cliOrgListDiv.innerHTML =
      '<div class="message loading-message">' +
      '<div style="display: flex; align-items: center; gap: 8px; justify-content: center;">' +
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">' +
      '<circle cx="12" cy="12" r="10"></circle>' +
      '<path d="m16 12-4-4-4 4"></path>' +
      '<path d="m16 12-4 4-4-4"></path>' +
      "</svg>" +
      chrome.i18n.getMessage("loadingCliOrgs") +
      "</div>" +
      "</div>";
    noCliOrgsMessage.style.display = "none";

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
        // Remover estado de loading
        refreshCliOrgsBtn.classList.remove("loading");
        refreshCliOrgsBtn.disabled = false;

        if (data.success) {
          const cliOrgs = data.orgs || [];
          cliOrgListDiv.innerHTML = "";

          if (cliOrgs.length === 0) {
            noCliOrgsMessage.style.display = "block";
          } else {
            noCliOrgsMessage.style.display = "none";
            cliOrgs.forEach((org, index) => {
              const orgItem = document.createElement("div");
              orgItem.className = "org-item cli-item"; // Nova classe para itens CLI
              // Destaca a org padrão (default username ou dev hub)
              const defaultClass = org.isDefault
                ? " default-org-highlight"
                : "";
              const orgIcon = org.isDefault ? "⚡" : "🏢"; // Ícones mais elegantes

              // Mais informações visíveis: username, instanceUrl
              orgItem.innerHTML = `
                                <div class="org-info${defaultClass}">
                                    <span class="alias">${orgIcon} ${
                org.alias
              }</span>
                                    <span class="username">${
                                      org.username
                                    }</span>
                                    <span class="url">${org.instanceUrl}</span>
                                </div>
                                <div class="org-actions">
                                    <button data-action="open-cli" data-alias="${
                                      org.alias || org.username
                                    }" class="open-btn">
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="m9 18 6-6-6-6"/>
                                      </svg>
                                      ${chrome.i18n.getMessage("openButton")}
                                    </button>
                                </div>
                            `;
              cliOrgListDiv.appendChild(orgItem);
            });
            // Adicionar listener para o botão open-cli
            cliOrgListDiv.querySelectorAll("button").forEach((button) => {
              button.addEventListener("click", (e) => {
                const alias = e.target.dataset.alias;
                openOrgViaCli(alias);
              });
            });
          }
        } else {
          noCliOrgsMessage.style.display = "block";
          noCliOrgsMessage.textContent = chrome.i18n.getMessage(
            "cliListError",
            [data.message]
          );
          console.error("Erro ao listar Orgs do CLI:", data.message);
        }
      })
      .catch((error) => {
        // Remover estado de loading
        refreshCliOrgsBtn.classList.remove("loading");
        refreshCliOrgsBtn.disabled = false;

        cliOrgListDiv.innerHTML = "";
        noCliOrgsMessage.style.display = "block";
        if (error.message.includes("Failed to fetch")) {
          noCliOrgsMessage.textContent = chrome.i18n.getMessage(
            "serverNotRunningError"
          );
        } else {
          noCliOrgsMessage.textContent = chrome.i18n.getMessage(
            "serverCommunicationError",
            [error.message]
          );
        }
        console.error(
          "Erro ao comunicar com o servidor local para listar Orgs:",
          error
        );
      });
  }

  addOrgBtn.addEventListener("click", () => {
    const alias = orgAliasInput.value.trim();
    const url = orgUrlInput.value.trim();

    if (alias && url) {
      chrome.storage.sync.get(["salesforceOrgs"], (result) => {
        const orgs = result.salesforceOrgs || [];
        orgs.push({ alias, url });
        chrome.storage.sync.set({ salesforceOrgs: orgs }, () => {
          orgAliasInput.value = "";
          orgUrlInput.value = "";
          loadManualOrgs();
        });
      });
    } else {
      alert(chrome.i18n.getMessage("fillFieldsAlert"));
    }
  });

  refreshCliOrgsBtn.addEventListener("click", loadCliOrgs);

  function openOrgManually(url) {
    chrome.tabs.create({ url: url });
    window.close();
  }

  function deleteManualOrg(index) {
    if (confirm(chrome.i18n.getMessage("confirmDelete"))) {
      chrome.storage.sync.get(["salesforceOrgs"], (result) => {
        const orgs = result.salesforceOrgs || [];
        orgs.splice(index, 1);
        chrome.storage.sync.set({ salesforceOrgs: orgs }, () => {
          loadManualOrgs();
        });
      });
    }
  }

  function openOrgViaCli(alias) {
    const serverUrl = "http://localhost:3000/open-org";

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
          alert(chrome.i18n.getMessage("orgOpenSuccess", [alias]));
          window.close();
        } else {
          alert(chrome.i18n.getMessage("orgOpenError", [alias, data.message]));
        }
      })
      .catch((error) => {
        console.error("Erro ao comunicar com o servidor local:", error);
        if (error.message.includes("Failed to fetch")) {
          alert(chrome.i18n.getMessage("serverNotRunningError"));
        } else {
          alert(
            chrome.i18n.getMessage("serverCommunicationError", [error.message])
          );
        }
      });
  }

  loadManualOrgs();
  loadCliOrgs();
});
