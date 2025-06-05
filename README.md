# 🎉 Salesforce ArcPilot

<div align="center">

<img src="./icons/logo.png" alt="Logo Salesforce ArcPilot" width="160" />

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

- **🎨 Interface Moderna e Elegante**: Design completamente renovado com gradientes, sombras suaves e animações fluidas
- **🚀 Login Rápido via CLI**: Acesse suas orgs Salesforce autorizadas no CLI com um clique, sem redigitar credenciais
- **📱 Logo Integrada**: Logo do projeto exibida elegantemente no header da extensão
- **⚡ Identificação Visual de Orgs**: Orgs padrão destacadas com ícones especiais e badges "Padrão"
- **🔄 Feedback Visual em Tempo Real**: Animações de loading e estados visuais durante as operações
- **🎯 Botões com Ícones SVG**: Interface mais intuitiva com ícones vetoriais personalizados
- **📝 Gerenciamento de Orgs Manuais**: Adicione e gerencie URLs de login personalizadas para orgs que não estão no seu CLI
- **🌐 Interface Responsiva**: Design adaptativo com suporte a tema escuro automático
- **🌍 Suporte Multi-idioma (i18n)**: Disponível em Português e Inglês para uma experiência global
- **⚙️ Base Robusta**: Construído com Manifest V3, Node.js para o servidor local e APIs de extensão do Chrome

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

## 🎨 Melhorias de UI/UX Implementadas

### Design Visual Moderno

- **Header Gradiente**: Fundo gradiente azul com padrão de grid sutil e logo integrada
- **Tipografia Inter**: Fonte moderna do Google Fonts para melhor legibilidade
- **Paleta de Cores Consistente**: Cores inspiradas no Arc Browser e Salesforce Lightning
- **Sombras e Elevação**: Cards com sombras suaves para criar hierarquia visual
- **Border Radius Consistente**: Cantos arredondados em diferentes tamanhos para harmonia

### Experiência Interativa

- **Ícones SVG Personalizados**: Botões com ícones vetoriais para melhor usabilidade
- **Estados de Hover/Active**: Feedback visual imediato em todas as interações
- **Animações Fluidas**: Transições suaves de 0.2s para mudanças de estado
- **Loading States**: Indicadores visuais com animação de rotação durante carregamento
- **Scroll Customizado**: Barra de rolagem estilizada para listas longas

### Organização e Layout

- **Cards Organizados**: Separação clara entre Orgs CLI e Orgs Manuais
- **Destaque para Org Padrão**: Badge "Padrão" e ícone ⚡ para orgs principais
- **Espaçamento Consistente**: Padding e margin harmoniosos em toda a interface
- **Responsividade**: Adaptação automática para diferentes tamanhos de janela
- **Acessibilidade**: Suporte a `prefers-reduced-motion` e tema escuro

### Feedback e Status

- **Mensagens Contextuais**: Feedback claro para estados vazios e erros
- **Estados de Botões**: Loading, disabled e hover claramente diferenciados
- **Cores Semânticas**: Verde para sucesso, azul para ações, vermelho para exclusão
- **Indicadores Visuais**: Ícones específicos para diferentes tipos de org (⚡🏢)

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
    git clone https://github.com/victorbrandaao/SalesforceArcPilot.git
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

Este projeto é um exemplo do meu trabalho e aprendizado contínuo em desenvolvimento de software e no ecossistema Salesforce. Se você tiver perguntas, sugestões ou quiser discutir oportunidades de colaboração:

- **LinkedIn**: [victorbrandaao](https://linkedin.com/in/victorbrandaao)
- **GitHub**: [victorbrandaao](https://github.com/victorbrandaao)

---
