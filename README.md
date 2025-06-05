# 🚀 Salesforce ArcPilot v2.0

<div align="center">

<img src="./icons/logo.png" alt="Logo Salesforce ArcPilot" width="160" />

![Salesforce](https://img.shields.io/badge/Salesforce-00D2FF?style=for-the-badge&logo=salesforce&logoColor=white)
![Google Chrome](https://img.shields.io/badge/Google%20Chrome-4285F4?style=for-the-badge&logo=Google-Chrome&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

_Extensão Chrome premium para gerenciar orgs Salesforce com interface moderna e funcionalidades avançadas_

</div>

## 🎯 Sobre o Projeto

O **Salesforce ArcPilot v2.0** é uma extensão Chrome de próxima geração projetada especificamente para desenvolvedores e administradores Salesforce que trabalham com múltiplas organizações. Com uma interface completamente redesenhada e funcionalidades avançadas, oferece uma experiência de usuário premium para gerenciar seu ecossistema Salesforce.

---

## 📚 Documentação Completa

### 📋 **Guias e Relatórios**

- 📖 **[EXECUTIVE_SUMMARY.md](./EXECUTIVE_SUMMARY.md)** - Resumo executivo e visão geral técnica
- 🧪 **[TESTING_GUIDE.md](./TESTING_GUIDE.md)** - Guia completo de testes e validação
- ✅ **[FINAL_TEST_REPORT.md](./FINAL_TEST_REPORT.md)** - Relatório final de testes
- 📝 **[CHANGELOG_V2.md](./CHANGELOG_V2.md)** - Histórico detalhado de mudanças v2.0

---

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
