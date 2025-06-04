# 🎉 Salesforce ArcPilot

<div align="center">

![Salesforce](https://img.shields.io/badge/Salesforce-00D2FF?style=for-the-badge&logo=salesforce&logoColor=white)
![Google Chrome](https://img.shields.io/badge/Google%20Chrome-4285F4?style=for-the-badge&logo=Google-Chrome&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)

_Gerenciador de Orgs Salesforce otimizado para o navegador Arc_

</div>

## 📋 Sobre o Projeto

O **Salesforce ArcPilot** é uma extensão de navegador para Arc (compatível com Chrome) projetada para otimizar o fluxo de trabalho de desenvolvedores e administradores Salesforce que gerenciam múltiplas organizações. Ele oferece uma interface limpa e intuitiva para listar, acessar e organizar suas orgs, integrando-se de forma eficiente com o seu ambiente de desenvolvimento.

---

## 📸 Capturas de Tela

Veja o Salesforce ArcPilot em ação:

![Salesforce ArcPilot in action](./assets/arc-salesforce-orbiter.png)
_Uma visão geral da interface do pop-up da extensão._

---

### ✨ Principais Funcionalidades

- **Login Rápido via CLI**: Acesse suas orgs Salesforce autorizadas no CLI com um clique, sem redigitar credenciais.
- **Gerenciamento de Orgs Manuais**: Adicione e gerencie URLs de login personalizadas para orgs que não estão no seu CLI.
- **Interface Intuitiva (Arc-like)**: Design minimalista, focado na clareza e facilidade de uso, alinhado à estética do navegador Arc.
- **Suporte Multi-idioma (i18n)**: Disponível em Português e Inglês para uma experiência global.
- **Base Robusta**: Construído com Manifest V3, Node.js para o servidor local e APIs de extensão do Chrome.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias:

- **JavaScript (ES6+)**: Para a lógica frontend da extensão e o servidor local Node.js.
- **HTML5 & CSS3**: Para a estrutura e estilização da interface do pop-up.
- **Node.js**: Para o servidor local que interage com o Salesforce CLI.
- **Express & CORS**: Framework web e middleware para o servidor local.
- **Salesforce CLI**: Ferramenta de linha de comando para interagir com orgs Salesforce.
- **Chrome Extension APIs**: Para gerenciar o navegador, armazenamento local e comunicação.

---

## 🚀 Como Colocar para Rodar

Para configurar e executar o Salesforce ArcPilot em seu navegador:

### Pré-requisitos

- **Node.js**: Instale a versão LTS.
- **Salesforce CLI**: Certifique-se de que está instalado e suas orgs estão autorizadas.
- **Navegador Arc ou Google Chrome**: A extensão é compatível com ambos.

### Passo a Passo

1.  **Clone o Repositório:**

    ```bash
    git clone [https://github.com/seu-usuario/SalesforceArcPilot.git](https://github.com/seu-usuario/SalesforceArcPilot.git) # Substitua pelo link do SEU repositório
    cd SalesforceArcPilot
    ```

2.  **Configure e Inicie o Servidor Local:**

    - Navegue até a pasta `local-server`:
      ```bash
      cd local-server
      ```
    - Instale as dependências:
      ```bash
      npm install
      ```
    - **Obtenha o ID da sua Extensão:**
      - No Arc/Chrome, digite `chrome://extensions` na barra de endereço.
      - Ative o "Modo Desenvolvedor".
      - Carregue a extensão (clique em "Carregar sem compactação" e selecione a pasta `SalesforceArcPilot`).
      - Copie o **ID** que aparece abaixo do nome da sua extensão.
    - **Edite `local-server/server.js`:**
      - Substitua `[SEU_ID_DA_EXTENSAO]` na linha `const allowedOrigins = [...]` pelo ID que você copiou.
    - Inicie o servidor (mantenha este terminal aberto):
      ```bash
      node server.js
      ```

3.  **Carregue a Extensão no Navegador:**

    - Abra `chrome://extensions` no Arc/Chrome.
    - Ative o "Modo Desenvolvedor" (se ainda não estiver).
    - Clique em "Carregar sem compactação".
    - Selecione a **pasta raiz do projeto `SalesforceArcPilot`** (a pasta que contém `manifest.json`, `icons`, `popup`, `_locales`).
    - Se você já a tinha carregado, clique no botão de **"Recarregar"** (Reload - ícone de seta circular) da sua extensão.

4.  **Configure e Teste:**
    - Clique no ícone do Salesforce ArcPilot na barra de ferramentas do navegador.
    - A lista de "Orgs Autorizadas no CLI" deve carregar automaticamente.
    - Clique em "Abrir" para testar o login rápido via CLI.
    - Experimente adicionar e gerenciar orgs manuais.

---

## 🤝 Conecte-se Comigo

Este projeto é um exemplo do meu trabalho e aprendizado contínuo em desenvolvimento de software e no ecossistema Salesforce. Se você tiver perguntas, sugestões ou quiser discutir oportunidades, sinta-se à vontade para entrar em contato!

- **LinkedIn**: [Link para o seu perfil do LinkedIn]
- **GitHub**: [Link para o seu perfil do GitHub]

---

**Lembre-se de:**

- **Substituir** `seu-usuario` e `SalesforceArcPilot.git` pelo link do seu repositório real no GitHub.
- **Colocar a captura de tela (`.png`)** dentro da pasta `assets` (ou `images`) e ajustar o caminho da imagem no `README.md` (`./assets/arc-salesforce-orbiter.png`).

Essa imagem fará uma diferença enorme na apresentação do seu projeto!
