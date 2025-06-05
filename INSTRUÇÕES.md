# Salesforce ArcPilot - Guia de Instalação e Uso

## 📋 Pré-requisitos

1. **Salesforce CLI** instalado e configurado

   ```bash
   # Verificar se o CLI está instalado
   sf --version

   # Se não estiver instalado, instale via npm
   npm install @salesforce/cli --global
   ```

2. **Node.js** instalado (para o servidor local)

## 🚀 Instalação

### 1. Instalar dependências do servidor local

```bash
cd local-server
npm install
```

### 2. Carregar a extensão no Chrome/Arc

1. Abra o Chrome/Arc Browser
2. Acesse `chrome://extensions/`
3. Ative o "Modo do desenvolvedor" (canto superior direito)
4. Clique em "Carregar sem compactação"
5. Selecione a pasta raiz do projeto (`SalesforceArcPilot`)

## 🔧 Como usar

### 1. Iniciar o servidor local

```bash
cd local-server
npm start
```

O servidor rodará em `http://localhost:3000`

### 2. Usar a extensão

1. Clique no ícone da extensão na barra de ferramentas
2. **Para Orgs do CLI**:
   - As orgs autorizadas no Salesforce CLI aparecerão automaticamente
   - Clique em "Abrir" para acessar uma org
3. **Para Orgs manuais**:
   - Adicione orgs manualmente preenchendo alias e URL
   - Clique em "Adicionar Org"

## 🛠️ Solução de problemas

### Servidor não está rodando

- Certifique-se de que o servidor local está rodando (`npm start` na pasta `local-server`)

### Nenhuma org do CLI encontrada

- Verifique se o Salesforce CLI está instalado: `sf --version`
- Certifique-se de ter orgs autorizadas: `sf org list`

### Erro de CORS

- O servidor foi configurado para aceitar requisições de extensões Chrome automaticamente

## 📁 Estrutura do projeto

```
SalesforceArcPilot/
├── manifest.json          # Configuração da extensão
├── _locales/              # Traduções (pt_BR e en)
├── icons/                 # Ícones da extensão
├── popup/                 # Interface da extensão
└── local-server/          # Servidor Node.js para comunicação com CLI
```
