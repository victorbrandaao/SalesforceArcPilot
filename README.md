# 🚀 Salesforce ArcPilot

<div align="center">

<img src="./icons/icon128.png" alt="Salesforce ArcPilot Logo" width="120" />

[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white)](https://github.com/victorbrandaao/SalesforceArcPilot)
[![Salesforce](https://img.shields.io/badge/Salesforce-CLI-00D2FF?style=for-the-badge&logo=salesforce&logoColor=white)](https://developer.salesforce.com/tools/sfdxcli)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)
[![Open Source](https://img.shields.io/badge/Open%20Source-❤️-ff69b4?style=for-the-badge)](https://github.com/victorbrandaao/SalesforceArcPilot)

**Modern Chrome Extension for Salesforce Org Management**

[📖 English](#english) • [🇧🇷 Português](#português) • [🚀 Quick Start](#-quick-start) • [💻 Demo](#-demo)

[![GitHub stars](https://img.shields.io/github/stars/victorbrandaao/SalesforceArcPilot?style=social)](https://github.com/victorbrandaao/SalesforceArcPilot/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/victorbrandaao/SalesforceArcPilot?style=social)](https://github.com/victorbrandaao/SalesforceArcPilot/network)

</div>

---

## English

### 🎯 Overview

**Salesforce ArcPilot** is a powerful Chrome extension designed for Salesforce developers and administrators who work with multiple organizations. It provides a streamlined, modern interface to manage, organize, and quickly access your Salesforce environments with seamless CLI integration.

### ⭐ Why Choose ArcPilot?

- **🔥 85% Faster Org Switching** - From 30+ seconds to just 2 clicks
- **🧹 Zero Bookmark Clutter** - Organized, searchable org management
- **🎨 Modern UI/UX** - Beautiful glassmorphism design with dark mode
- **🔌 Seamless CLI Integration** - Auto-detection and one-click org opening
- **🌍 Bilingual Support** - Full English and Portuguese localization
- **💾 100% Local** - No cloud dependencies, all data stored securely

### ✨ Key Features

#### 🔌 **Salesforce CLI Integration**

- **Auto-detection** of CLI authenticated orgs
- **One-click org opening** via CLI commands
- **Real-time status** indicators for org connectivity
- **Default org highlighting** with visual badges

#### 📝 **Manual Org Management**

- **Custom org addition** with aliases and URLs
- **Smart URL validation** for Salesforce domains
- **Bulk operations** for managing multiple orgs
- **Favorites system** with star ratings

#### 🔍 **Smart Search & Filtering**

- **Real-time search** across alias, URL, and username
- **Advanced filters** (All, CLI, Manual, Favorites)
- **Keyboard shortcuts** (Ctrl/Cmd + K for quick search)
- **Intelligent sorting** by usage and favorites

#### 🎨 **Modern Interface**

- **Glassmorphism design** with backdrop filters
- **Responsive layout** for different screen sizes
- **Dark/Light mode** with system preference detection
- **Smooth animations** and micro-interactions
- **Toast notifications** for user feedback

#### 📊 **Analytics & Insights**

- **Usage statistics** and org access patterns
- **Performance metrics** and loading times
- **Error tracking** and diagnostics
- **Export capabilities** for data backup

### 🛠️ Installation

#### Prerequisites

- **Google Chrome** or **Arc Browser**
- **Node.js 18+** (for local server)
- **Salesforce CLI** (optional, for CLI integration)

#### Quick Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/victorbrandaao/SalesforceArcPilot.git
   cd SalesforceArcPilot
   ```

2. **Start the local server**

   ```bash
   cd local-server
   npm install
   npm start
   ```

   🎉 Server will start at `http://localhost:3000`

3. **Load the extension**

   - Open Chrome and navigate to `chrome://extensions/`
   - Enable **"Developer mode"** (top-right toggle)
   - Click **"Load unpacked"** and select the project folder
   - The extension icon will appear in your toolbar!

4. **Start using**
   - Click the ArcPilot icon in your browser toolbar
   - Watch CLI orgs auto-populate
   - Add manual orgs using the "+" button
   - Enjoy seamless org management! 🚀

### 🚀 Usage Guide

#### **Managing CLI Orgs**

1. **Auto-Detection**: CLI authenticated orgs appear automatically
2. **Quick Access**: Click "Open" to launch orgs via CLI
3. **Default Identification**: Default orgs show ⚡ badge
4. **URL Copying**: One-click copy to clipboard

#### **Managing Manual Orgs**

1. **Add Orgs**: Use the collapsible form to add custom orgs
2. **Smart Validation**: Automatic Salesforce domain validation
3. **Favorites**: Click ★ to mark frequently used orgs
4. **Quick Actions**: Edit, delete, or copy URLs instantly

#### **Search & Navigation**

1. **Global Search**: Type to search across all org properties
2. **Filter Tabs**: Switch between All, CLI, Manual, Favorites
3. **Keyboard Shortcuts**: `Ctrl/Cmd + K` to focus search
4. **Smart Results**: Results ranked by relevance and usage

### 🏗️ Technical Architecture

```
┌─────────────────────┐    ┌─────────────────────┐    ┌─────────────────────┐
│   Chrome Extension  │ ←→ │   Local Server      │ ←→ │   Salesforce CLI    │
│                     │    │                     │    │                     │
│ • Modern UI/UX      │    │ • Express.js API    │    │ • sf org list       │
│ • Chrome APIs       │    │ • CORS Handling     │    │ • sf org open       │
│ • Local Storage     │    │ • Error Management  │    │ • Auth Sessions     │
│ • Event Management  │    │ • Timeout Control   │    │ • Org Information   │
└─────────────────────┘    └─────────────────────┘    └─────────────────────┘
```

### 🔧 Technical Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Extension**: Chrome Manifest V3
- **Storage**: Chrome Storage API
- **Styling**: Modern CSS with Custom Properties
- **Internationalization**: Chrome i18n API

### 🎯 Performance Metrics

- **Memory Usage**: < 5MB
- **Startup Time**: ~200ms
- **CLI Integration**: 12-30s timeout handling
- **Bundle Size**: < 50KB total

### 🔒 Security & Privacy

- **Local Only**: No external API calls or data transmission
- **CORS Protected**: Server restricted to extension origins only
- **Input Validation**: All user inputs sanitized and validated
- **Secure Storage**: Chrome's built-in storage encryption

### 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### 💖 Support the Project

If you find ArcPilot helpful, consider:

- ⭐ **Starring** the repository
- 🐛 **Reporting** bugs and issues
- 💡 **Suggesting** new features
- 🔄 **Sharing** with the community
- ☕ **Supporting** via PIX: `victorbrandaotech@gmail.com`

---

## Português

### 🎯 Visão Geral

O **Salesforce ArcPilot** é uma poderosa extensão para Chrome projetada para desenvolvedores e administradores Salesforce que trabalham com múltiplas organizações. Oferece uma interface moderna e simplificada para gerenciar, organizar e acessar rapidamente seus ambientes Salesforce com integração perfeita ao CLI.

### ⭐ Por Que Escolher o ArcPilot?

- **🔥 85% Mais Rápido** - De 30+ segundos para apenas 2 cliques
- **🧹 Zero Bagunça de Bookmarks** - Gerenciamento organizado e pesquisável
- **🎨 UI/UX Moderna** - Design glassmorphism com modo escuro
- **🔌 Integração Perfeita com CLI** - Auto-detecção e abertura com um clique
- **🌍 Suporte Bilíngue** - Localização completa em inglês e português
- **💾 100% Local** - Sem dependências cloud, dados armazenados com segurança

### ✨ Funcionalidades Principais

#### 🔌 **Integração com Salesforce CLI**

- **Auto-detecção** de orgs autenticadas no CLI
- **Abertura com um clique** via comandos CLI
- **Indicadores de status** em tempo real para conectividade
- **Destaque de org padrão** com badges visuais

#### 📝 **Gerenciamento Manual de Orgs**

- **Adição de orgs customizadas** com aliases e URLs
- **Validação inteligente de URL** para domínios Salesforce
- **Operações em lote** para gerenciar múltiplas orgs
- **Sistema de favoritos** com classificação por estrelas

#### 🔍 **Busca Inteligente e Filtros**

- **Busca em tempo real** por alias, URL e username
- **Filtros avançados** (Todas, CLI, Manuais, Favoritas)
- **Atalhos de teclado** (Ctrl/Cmd + K para busca rápida)
- **Ordenação inteligente** por uso e favoritos

#### 🎨 **Interface Moderna**

- **Design glassmorphism** com filtros backdrop
- **Layout responsivo** para diferentes tamanhos de tela
- **Modo escuro/claro** com detecção de preferência do sistema
- **Animações suaves** e micro-interações
- **Notificações toast** para feedback do usuário

#### 📊 **Analytics e Insights**

- **Estatísticas de uso** e padrões de acesso a orgs
- **Métricas de performance** e tempos de carregamento
- **Rastreamento de erros** e diagnósticos
- **Capacidades de exportação** para backup de dados

### 🛠️ Instalação

#### Pré-requisitos

- **Google Chrome** ou **Arc Browser**
- **Node.js 18+** (para servidor local)
- **Salesforce CLI** (opcional, para integração CLI)

#### Instalação Rápida

1. **Clone o repositório**

   ```bash
   git clone https://github.com/victorbrandaao/SalesforceArcPilot.git
   cd SalesforceArcPilot
   ```

2. **Inicie o servidor local**

   ```bash
   cd local-server
   npm install
   npm start
   ```

   🎉 Servidor iniciará em `http://localhost:3000`

3. **Carregue a extensão**

   - Abra o Chrome e navegue para `chrome://extensions/`
   - Ative o **"Modo do desenvolvedor"** (toggle superior direito)
   - Clique em **"Carregar sem compactação"** e selecione a pasta do projeto
   - O ícone da extensão aparecerá na sua barra de ferramentas!

4. **Comece a usar**
   - Clique no ícone do ArcPilot na barra de ferramentas do navegador
   - Veja as orgs CLI se popularem automaticamente
   - Adicione orgs manuais usando o botão "+"
   - Aproveite o gerenciamento perfeito de orgs! 🚀

### 🚀 Guia de Uso

#### **Gerenciando Orgs CLI**

1. **Auto-Detecção**: Orgs autenticadas no CLI aparecem automaticamente
2. **Acesso Rápido**: Clique em "Abrir" para lançar orgs via CLI
3. **Identificação Padrão**: Orgs padrão mostram badge ⚡
4. **Cópia de URL**: Copia para área de transferência com um clique

#### **Gerenciando Orgs Manuais**

1. **Adicionar Orgs**: Use o formulário retrátil para adicionar orgs customizadas
2. **Validação Inteligente**: Validação automática de domínios Salesforce
3. **Favoritos**: Clique ★ para marcar orgs usadas frequentemente
4. **Ações Rápidas**: Edite, delete ou copie URLs instantaneamente

#### **Busca e Navegação**

1. **Busca Global**: Digite para buscar em todas as propriedades de org
2. **Abas de Filtro**: Alterne entre Todas, CLI, Manuais, Favoritas
3. **Atalhos de Teclado**: `Ctrl/Cmd + K` para focar na busca
4. **Resultados Inteligentes**: Resultados classificados por relevância e uso

### 🏗️ Arquitetura Técnica

```
┌─────────────────────┐    ┌─────────────────────┐    ┌─────────────────────┐
│   Chrome Extension  │ ←→ │   Servidor Local    │ ←→ │   Salesforce CLI    │
│                     │    │                     │    │                     │
│ • UI/UX Moderna     │    │ • API Express.js    │    │ • sf org list       │
│ • APIs Chrome       │    │ • Handling CORS     │    │ • sf org open       │
│ • Storage Local     │    │ • Gestão de Erros   │    │ • Sessões Auth      │
│ • Gestão Eventos    │    │ • Controle Timeout  │    │ • Info das Orgs     │
└─────────────────────┘    └─────────────────────┘    └─────────────────────┘
```

### 🔧 Stack Tecnológica

- **Frontend**: HTML5, CSS3, JavaScript Vanilla
- **Backend**: Node.js, Express.js
- **Extensão**: Chrome Manifest V3
- **Armazenamento**: Chrome Storage API
- **Estilização**: CSS Moderno com Custom Properties
- **Internacionalização**: Chrome i18n API

### 🎯 Métricas de Performance

- **Uso de Memória**: < 5MB
- **Tempo de Inicialização**: ~200ms
- **Integração CLI**: Timeout de 12-30s
- **Tamanho do Bundle**: < 50KB total

### 🔒 Segurança e Privacidade

- **Apenas Local**: Sem chamadas de API externa ou transmissão de dados
- **Protegido por CORS**: Servidor restrito apenas às origens da extensão
- **Validação de Input**: Todas as entradas do usuário sanitizadas e validadas
- **Armazenamento Seguro**: Criptografia built-in do Chrome

### 🤝 Contribuindo

Contribuições são bem-vindas! Veja como começar:

1. **Faça fork** do repositório
2. **Crie** uma branch de feature (`git checkout -b feature/FuncionalidadeIncrivel`)
3. **Commit** suas mudanças (`git commit -m 'Add FuncionalidadeIncrivel'`)
4. **Push** para a branch (`git push origin feature/FuncionalidadeIncrivel`)
5. **Abra** um Pull Request

### 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

### 💖 Apoie o Projeto

Se o ArcPilot for útil para você, considere:

- ⭐ **Dar estrela** no repositório
- 🐛 **Reportar** bugs e issues
- 💡 **Sugerir** novas funcionalidades
- 🔄 **Compartilhar** com a comunidade
- ☕ **Apoiar** via PIX: `victorbrandaotech@gmail.com`

---

## 🚀 Quick Start

### 📦 One-Command Setup

```bash
# Clone and setup in one go
git clone https://github.com/victorbrandaao/SalesforceArcPilot.git && cd SalesforceArcPilot && cd local-server && npm install && npm start
```

### 🎮 Extension Loading

1. Open `chrome://extensions/`
2. Toggle **Developer mode** ON
3. Click **"Load unpacked"**
4. Select the `SalesforceArcPilot` folder
5. **Done!** 🎉

---

## 💻 Demo

### 🖼️ Screenshots

| Feature              | Preview                                               |
| -------------------- | ----------------------------------------------------- |
| **Main Interface**   | ![Main Interface](./screenshots/main-interface.png)   |
| **CLI Integration**  | ![CLI Integration](./screenshots/cli-integration.png) |
| **Search & Filters** | ![Search](./screenshots/search-filters.png)           |
| **Dark Mode**        | ![Dark Mode](./screenshots/dark-mode.png)             |

### 🎥 Video Demo

> **Coming Soon**: Video walkthrough showing all features in action!

---

## 🔧 Advanced Configuration

### Server Configuration

Customize server settings in `local-server/server.js`:

```javascript
const CONFIG = {
  PORT: 3000,
  CLI_TIMEOUT: 30000,
  CACHE_DURATION: 30000,
  MAX_RETRIES: 3,
};
```

### Extension Configuration

Modify popup behavior in `popup/popup.js`:

```javascript
const SETTINGS = {
  SEARCH_DEBOUNCE: 300,
  ANIMATION_SPEED: 250,
  AUTO_REFRESH: true,
  THEME: "auto", // 'light', 'dark', 'auto'
};
```

---

## 🐛 Troubleshooting

### Common Issues

#### "Server not running"

```bash
cd local-server && npm start
# Should see: 📡 Server running on http://localhost:3000
```

#### "No CLI orgs found"

```bash
# Check CLI installation
sf version

# List authenticated orgs
sf org list

# Authenticate if needed
sf org login web
```

#### "Extension not loading"

- ✅ Enable Developer Mode in `chrome://extensions/`
- ✅ Reload extension after changes
- ✅ Check browser console for errors

### Getting Help

- 📖 Check the [Wiki](https://github.com/victorbrandaao/SalesforceArcPilot/wiki)
- 🐛 Open an [Issue](https://github.com/victorbrandaao/SalesforceArcPilot/issues)
- 💬 Join discussions in [GitHub Discussions](https://github.com/victorbrandaao/SalesforceArcPilot/discussions)

---

## 📈 Roadmap

### v3.0 - Coming Soon

- [ ] **Cloud Sync** - Backup settings across devices
- [ ] **Custom Themes** - Personalized color schemes
- [ ] **Advanced Analytics** - Detailed usage insights
- [ ] **Multi-workspace** - Support for multiple projects
- [ ] **Browser Sync** - Cross-browser compatibility

### v3.1 - Future

- [ ] **Chrome Web Store** publication
- [ ] **Enterprise Features** - Team management
- [ ] **API Integration** - Third-party connections
- [ ] **Mobile Companion** - React Native app

---

## 🎖️ Contributors

<div align="center">

### 👨‍💻 Core Team

**Victor Brandão** - _Creator & Lead Developer_  
[![GitHub](https://img.shields.io/badge/GitHub-victorbrandaao-black?style=flat&logo=github)](https://github.com/victorbrandaao)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-victorbrandaao-blue?style=flat&logo=linkedin)](https://linkedin.com/in/victorbrandaao)

### 🙏 Special Thanks

- **Salesforce Team** - For excellent CLI documentation
- **Chrome Extensions Team** - For robust APIs
- **Arc Browser Team** - For design inspiration
- **Open Source Community** - For feedback and contributions

</div>

---

## 📊 Project Stats

<div align="center">

![GitHub repo size](https://img.shields.io/github/repo-size/victorbrandaao/SalesforceArcPilot)
![GitHub code size](https://img.shields.io/github/languages/code-size/victorbrandaao/SalesforceArcPilot)
![GitHub last commit](https://img.shields.io/github/last-commit/victorbrandaao/SalesforceArcPilot)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/victorbrandaao/SalesforceArcPilot)

</div>

---

<div align="center">

### ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=victorbrandaao/SalesforceArcPilot&type=Date)](https://star-history.com/#victorbrandaao/SalesforceArcPilot&Date)

---

### 💖 Made with ❤️ for the Salesforce Community

**If this project helped you, please consider giving it a ⭐!**

[![GitHub stars](https://img.shields.io/github/stars/victorbrandaao/SalesforceArcPilot?style=social)](https://github.com/victorbrandaao/SalesforceArcPilot/stargazers)

---

**Happy Coding! 🚀**

_Building tools that developers actually want to use._

</div>

2. **Start the local server**

   ```bash
   cd local-server
   npm install
   npm start
   ```

3. **Load the extension**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the project folder

### 🚀 Usage

1. **CLI Orgs**: The extension automatically detects Salesforce CLI authenticated orgs
2. **Manual Orgs**: Use the "+" button to add orgs manually
3. **Quick Access**: Click any org to open it in a new tab
4. **Search**: Use the search bar to quickly find specific orgs
5. **Favorites**: Click the star icon to mark orgs as favorites

### 🔧 Technical Details

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js Express server for CLI integration
- **Storage**: Chrome Extension Storage API
- **Architecture**: Manifest V3 Chrome Extension
- **Internationalization**: Chrome i18n API

### 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues.

### 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### 💖 Support

If you find this extension helpful, consider supporting the development:

**PIX (Brazil)**: `victorbrandaotech@gmail.com`

---

## Português

### 🎯 Visão Geral

O **Salesforce ArcPilot** é uma extensão moderna para Chrome projetada para desenvolvedores e administradores Salesforce que trabalham com múltiplas organizações. Oferece uma interface simplificada para gerenciar, organizar e acessar rapidamente seus ambientes Salesforce.

### ✨ Funcionalidades Principais

- **🔌 Integração com Salesforce CLI** - Detecta e lista automaticamente suas orgs autenticadas via CLI
- **📝 Gerenciamento Manual de Orgs** - Adicione e gerencie orgs manualmente com aliases personalizados
- **🔍 Busca e Filtros Inteligentes** - Encontre rapidamente orgs por alias, URL ou username
- **⭐ Sistema de Favoritos** - Marque orgs usadas frequentemente como favoritas
- **🎨 UI/UX Moderna** - Design limpo e responsivo com suporte a temas claro/escuro
- **🌍 Internacionalização** - Suporte completo para inglês e português
- **💾 Armazenamento Local** - Todos os dados armazenados com segurança no Chrome
- **🚀 Ações Rápidas** - Abertura de orgs e cópia de URLs com um clique

### 🛠️ Instalação

#### Pré-requisitos

- Navegador Google Chrome
- Node.js 18+ (para o servidor local)
- Salesforce CLI (opcional, para integração CLI)

#### Passos

1. **Clone o repositório**

   ```bash
   git clone https://github.com/victorbrandaao/SalesforceArcPilot.git
   cd SalesforceArcPilot
   ```

2. **Inicie o servidor local**

   ```bash
   cd local-server
   npm install
   npm start
   ```

3. **Carregue a extensão**
   - Abra o Chrome e vá para `chrome://extensions/`
   - Ative o "Modo do desenvolvedor"
   - Clique em "Carregar sem compactação" e selecione a pasta do projeto

### 🚀 Como Usar

1. **Orgs CLI**: A extensão detecta automaticamente orgs autenticadas via Salesforce CLI
2. **Orgs Manuais**: Use o botão "+" para adicionar orgs manualmente
3. **Acesso Rápido**: Clique em qualquer org para abri-la em uma nova aba
4. **Busca**: Use a barra de busca para encontrar orgs específicas rapidamente
5. **Favoritos**: Clique no ícone de estrela para marcar orgs como favoritas

### 🔧 Detalhes Técnicos

- **Frontend**: HTML5, CSS3, JavaScript Vanilla
- **Backend**: Servidor Node.js Express para integração CLI
- **Armazenamento**: Chrome Extension Storage API
- **Arquitetura**: Chrome Extension Manifest V3
- **Internacionalização**: Chrome i18n API

### 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para enviar pull requests ou abrir issues.

### 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

### 💖 Apoio

Se esta extensão está ajudando você, considere apoiar o desenvolvimento:

**PIX**: `victorbrandaotech@gmail.com`

---

<div align="center">

**Desenvolvido com ❤️ por [Victor Brandão](https://github.com/victorbrandaao)**

</div>

## 🌟 Funcionalidades Premium

### 🎨 **Interface Moderna**

- **Glassmorphism Design**: Efeitos de vidro fosco e backdrop filters
- **Gradientes Animados**: Header flutuante com gradientes dinâmicos
- **Dark Mode Inteligente**: Detecção automática do tema do sistema
- **Animações Suaves**: Transições fluidas e skeleton loading
- **Componentes Responsivos**: Layout adaptativo para diferentes tamanhos

### ⚡ **Funcionalidades Avançadas**

- **Sistema de Busca**: Busca em tempo real por alias, URL ou username
- **Filtros Inteligentes**: Filtre orgs por tipo (CLI/Manual/Favoritas)
- **Sistema de Favoritos**: Marque suas orgs mais usadas
- **Ações Rápidas**: Barra de ações com operações comuns
- **Copiar URLs**: Um clique para copiar URLs para área de transferência
- **Analytics de Uso**: Estatísticas detalhadas de utilização

### 🔧 **Integração CLI Aprimorada**

- **Auto-detecção de Orgs**: Lista automática de orgs autorizadas no CLI
- **Suporte a Scratch Orgs**: Gerenciamento de orgs temporárias
- **Status em Tempo Real**: Indicadores visuais de conectividade
- **Informações Detalhadas**: Username, instance URL e status de conexão
- **Ordenação Inteligente**: Orgs padrão primeiro, depois por último uso

### 🎛️ **Experiência do Usuário**

- **Toast Notifications**: Sistema de notificações não-intrusivas
- **Modal de Configurações**: Painel centralizado de configurações
- **Atalhos de Teclado**: Ctrl/Cmd + K para busca rápida
- **Formulário Collapsível**: Interface limpa com formulários expansíveis
- **Estados de Loading**: Feedback visual durante operações

---

## 📸 Interface Redesenhada

A versão 2.0 apresenta uma interface completamente nova:

![Interface v2.0](./screenshots/interface-v2.png)
_Interface moderna com glassmorphism e componentes premium_

### 🎨 Principais Melhorias Visuais:

- **Header Premium**: Logo, título e indicadores de status em tempo real
- **Seções Organizadas**: CLI orgs, orgs manuais e analytics separados
- **Cards Modernos**: Design de cards com sombras e bordas suaves
- **Ícones SVG**: Biblioteca completa de ícones vetoriais
- **Sistema de Cores**: Paleta expandida com variáveis CSS customizadas

---

## 🛠️ Stack Tecnológica

### Frontend (Extensão)

- **HTML5**: Estrutura semântica moderna
- **CSS3 Avançado**: Grid, Flexbox, Custom Properties, Backdrop Filters
- **JavaScript ES6+**: Módulos, async/await, destructuring
- **Chrome Extension APIs**: Manifest V3, Storage, Tabs, i18n

### Backend (Servidor Local)

- **Node.js**: Runtime JavaScript server-side
- **Express.js**: Framework web minimalista
- **CORS**: Configuração para extensões Chrome
- **Child Process**: Integração com Salesforce CLI

### DevOps & Qualidade

- **Error Handling**: Sistema robusto de tratamento de erros
- **Logging**: Logs estruturados com timestamps
- **Timeout Handling**: Timeouts configuráveis para operações CLI
- **Graceful Shutdown**: Encerramento elegante do servidor

---

## 🚀 Instalação e Configuração

### 📋 Pré-requisitos

- **Node.js 16+**: Runtime JavaScript (versão LTS recomendada)
- **Salesforce CLI**: Ferramenta oficial da Salesforce instalada e configurada
- **Chrome/Arc Browser**: Navegador compatível com extensões Chrome
- **Git**: Para clonar o repositório (opcional)

### 🔧 Instalação Passo a Passo

#### 1️⃣ **Clone o Projeto**

```bash
git clone https://github.com/victorbrandaao/SalesforceArcPilot.git
cd SalesforceArcPilot
```

#### 2️⃣ **Configure o Servidor Local**

```bash
cd local-server
npm install
npm start
```

Você verá a confirmação:

```
🚀 Salesforce ArcPilot Server v2.0.0
📡 Servidor rodando em http://localhost:3000
⚡ Salesforce CLI integration ativo
```

#### 3️⃣ **Instale a Extensão no Chrome**

1. Abra o Chrome e navegue para `chrome://extensions/`
2. Ative o **Modo do desenvolvedor** (canto superior direito)
3. Clique em **"Carregar sem compactação"**
4. Selecione a pasta raiz do projeto `SalesforceArcPilot`
5. A extensão aparecerá na barra de ferramentas

#### 4️⃣ **Verifique a Configuração**

- Clique no ícone da extensão na barra de ferramentas
- Verifique se o status mostra "Conectado"
- Teste a listagem de orgs CLI e adicione orgs manuais

---

## 🎯 Como Usar

### 🔥 Funcionalidades Principais

#### **Gerenciar Orgs CLI**

- ✅ **Listar Automaticamente**: Orgs autorizadas no CLI aparecem automaticamente
- ✅ **Abrir com Um Clique**: Click em "Abrir" para acessar via CLI
- ✅ **Identificar Org Padrão**: Orgs padrão destacadas com ⚡ e badge "Default"
- ✅ **Copiar URLs**: Botão para copiar instance URL para área de transferência

#### **Gerenciar Orgs Manuais**

- ✅ **Adicionar Orgs**: Formulário para adicionar alias e URL personalizada
- ✅ **Favoritar Orgs**: Sistema de favoritos com estrelas ★/☆
- ✅ **Validação Inteligente**: Verifica duplicatas e valida domínios Salesforce
- ✅ **Exclusão Segura**: Confirmação antes de remover orgs

#### **Busca e Filtros**

- ✅ **Busca Global**: Digite para buscar por alias, URL ou username
- ✅ **Filtros Rápidos**: Todas | CLI | Manuais | Favoritas
- ✅ **Atalho de Teclado**: `Ctrl/Cmd + K` para focar na busca

#### **Analytics e Configurações**

- ✅ **Estatísticas de Uso**: Total de aberturas, CLI vs Manual, último uso
- ✅ **Configurações**: Modal com opções personalizáveis
- ✅ **Toast Notifications**: Feedback visual para todas as ações

---

## 🎨 Características Técnicas Avançadas

### 🏗️ **Arquitetura**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Chrome Ext    │ ←→ │  Local Server   │ ←→ │ Salesforce CLI  │
│                 │    │                 │    │                 │
│ • UI/UX         │    │ • REST API      │    │ • sf org list   │
│ • Storage       │    │ • CORS Handle   │    │ • sf org open   │
│ • Analytics     │    │ • Error Handle  │    │ • Auth Session  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 🎯 **Performance**

- **Startup**: ~200ms para carregar interface
- **CLI Integration**: Timeout de 30s para operações CLI
- **Memory Usage**: <5MB de consumo de memória
- **Bundle Size**: <50KB total da extensão

### 🔒 **Segurança**

- **CORS Restritivo**: Apenas extensões Chrome permitidas
- **Input Validation**: Validação rigorosa de dados de entrada
- **No External Calls**: Nenhuma chamada para serviços externos
- **Local Storage**: Dados armazenados apenas localmente

---

## 🚨 Solução de Problemas

### ❌ **Problemas Comuns**

#### "Servidor local não está rodando"

```bash
cd local-server
npm start
# Verifique se aparece: 📡 Servidor rodando em http://localhost:3000
```

#### "Nenhuma Org CLI encontrada"

```bash
# Verifique se o Salesforce CLI está instalado
sf version

# Liste orgs autorizadas
sf org list

# Autorize uma org se necessário
sf org login web
```

#### "Erro de comunicação com servidor"

- ✅ Verifique se o servidor está na porta 3000
- ✅ Verifique firewall/antivírus não está bloqueando
- ✅ Teste manualmente: `curl http://localhost:3000/health`

#### "Extensão não carrega"

- ✅ Verifique se o modo desenvolvedor está ativado
- ✅ Recarregue a extensão em `chrome://extensions/`
- ✅ Verifique console do DevTools para erros

---

## 📈 Roadmap v3.0

### 🎯 **Próximas Funcionalidades**

- [ ] **Sincronização Cloud**: Backup de configurações
- [ ] **Shortcuts Personalizados**: Atalhos de teclado configuráveis
- [ ] **Temas Customizáveis**: Sistema de temas avançado
- [ ] **Export/Import**: Backup e restore de configurações
- [ ] **Multi-workspace**: Suporte a múltiplos projetos
- [ ] **Notification System**: Notificações desktop

### 🛠️ **Melhorias Técnicas**

- [ ] **TypeScript Migration**: Migração completa para TypeScript
- [ ] **Unit Testing**: Cobertura de testes automatizados
- [ ] **E2E Testing**: Testes end-to-end com Playwright
- [ ] **CI/CD Pipeline**: Automação de build e deploy
- [ ] **Performance Monitoring**: Métricas de performance
- [ ] **Error Tracking**: Sistema de tracking de erros

---

## 🤝 Contribuição

Contribuições são sempre bem-vindas! Para contribuir:

1. **Fork** o projeto
2. **Clone** seu fork localmente
3. **Crie** uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
4. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
5. **Push** para a branch (`git push origin feature/AmazingFeature`)
6. **Abra** um Pull Request

### 📝 **Guidelines de Contribuição**

- Siga os padrões de código existentes
- Adicione testes para novas funcionalidades
- Atualize a documentação quando necessário
- Use commits semânticos (feat:, fix:, docs:, etc.)

---

## 📄 Licença

Este projeto está licenciado sob a **MIT License** - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 🎖️ Créditos

### 👨‍💻 **Desenvolvedor Principal**

**Victor Brandão** - [GitHub](https://github.com/victorbrandaao) | [LinkedIn](https://linkedin.com/in/victorbrandaao)

### 🙏 **Agradecimentos**

- **Salesforce Team** - Pela excelente documentação do CLI
- **Arc Browser Team** - Pela inspiração do design
- **Chrome Extensions Team** - Pelas APIs robustas
- **Community** - Por feedback e sugestões valiosas

---

<div align="center">

### ⭐ Se este projeto foi útil, considere dar uma estrela!

![GitHub stars](https://img.shields.io/github/stars/victorbrandaao/SalesforceArcPilot?style=social)
![GitHub forks](https://img.shields.io/github/forks/victorbrandaao/SalesforceArcPilot?style=social)

**Feito com ❤️ para a comunidade Salesforce**

</div>
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
