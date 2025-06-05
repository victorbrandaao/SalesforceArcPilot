# 🚀 SalesforceArcPilot v2.0 - Guia de Instalação Rápida

## ⚡ Instalação em 3 Passos

### 📦 **Passo 1: Preparar o Servidor**

```bash
# Navegar para o diretório do servidor
cd /Users/victorbrandao/Documents/SalesforceArcPilot/local-server

# Instalar dependências (se necessário)
npm install

# Iniciar o servidor
node server.js
```

**✅ Saída esperada:**

```
🚀 Salesforce ArcPilot Server v2.0.0
📡 Servidor rodando em http://localhost:3000
⚡ Salesforce CLI integration ativo
🔗 CORS configurado para extensões Chrome
```

### 🔧 **Passo 2: Carregar a Extensão**

1. Abra o Google Chrome
2. Digite: `chrome://extensions/` na barra de endereços
3. Ative o **"Modo do desenvolvedor"** (canto superior direito)
4. Clique em **"Carregar sem compactação"**
5. Selecione a pasta: `/Users/victorbrandao/Documents/SalesforceArcPilot`
6. A extensão será carregada com o nome **"Salesforce ArcPilot - Org Manager"**

### 🎯 **Passo 3: Testar Funcionalidades**

1. Clique no ícone da extensão na barra de ferramentas
2. Verifique se o status mostra "🟢 Conectado"
3. Teste a busca digitando na barra de pesquisa
4. Experimente os filtros: All, CLI, Manual, Favorites
5. Clique em Analytics para ver o dashboard
6. Teste abrir uma org (se disponível)

---

## 🧪 Checklist de Validação

### ✅ **Servidor Local**

- [ ] Servidor inicia sem erros
- [ ] Endpoint `/health` retorna status "healthy"
- [ ] Endpoint `/cli-info` retorna informações do CLI
- [ ] Endpoint `/list-orgs` lista orgs disponíveis

### ✅ **Interface da Extensão**

- [ ] Popup abre sem erros
- [ ] Header com gradiente animado aparece
- [ ] Status de conexão mostra "🟢 Conectado"
- [ ] Barra de pesquisa é funcional
- [ ] Botões de filtro respondem
- [ ] Analytics pode ser expandido/colapsado

### ✅ **Funcionalidades Avançadas**

- [ ] Busca em tempo real funciona
- [ ] Filtros alteram a lista corretamente
- [ ] Favoritos podem ser marcados (estrela)
- [ ] Copy to clipboard exibe toast de sucesso
- [ ] Atalho Ctrl/Cmd + K foca na busca
- [ ] Modal de configurações abre/fecha

### ✅ **Background Service Worker**

- [ ] Notificações do sistema funcionam
- [ ] Badge "SF" aparece em páginas Salesforce
- [ ] Analytics são atualizados automaticamente
- [ ] Tema do sistema é detectado

---

## 🎨 Recursos Visuais para Testar

### **Design Glassmorphism**

- Header com gradiente animado azul→roxo
- Cards com efeito de vidro fosco
- Backdrop blur nos modais
- Transições suaves em hover

### **Sistema de Cores**

- **Primary**: #4A90E2 (azul Salesforce)
- **Secondary**: #00D2FF (ciano vibrante)
- **Accent**: #8B5CF6 (roxo moderno)
- **Success**: #10B981 (verde)
- **Warning**: #F59E0B (laranja)
- **Error**: #EF4444 (vermelho)

### **Animações**

- Loading skeleton nos cards
- Fade in/out nos toasts
- Smooth transitions nos filtros
- Pulse animation nos botões ativos

---

## 🐛 Problemas Comuns e Soluções

### **❌ Problema: "🔴 Desconectado"**

**Solução:**

```bash
# Verificar se o servidor está rodando
curl http://localhost:3000/health

# Se não estiver, iniciar o servidor
cd /Users/victorbrandao/Documents/SalesforceArcPilot/local-server
node server.js
```

### **❌ Problema: "Nenhuma org encontrada"**

**Solução:**

```bash
# Verificar CLI instalado
sf version

# Listar orgs autorizadas
sf org list

# Autorizar uma org se necessário
sf org login web -a MyTestOrg
```

### **❌ Problema: Extensão não carrega**

**Solução:**

1. Verificar se todos os arquivos estão na pasta
2. Verificar `manifest.json` sem erros de sintaxe
3. Recarregar a extensão em `chrome://extensions/`
4. Verificar console do navegador para erros

### **❌ Problema: Background worker falha**

**Solução:**

1. Verificar se `background.js` existe
2. Checar permissões no `manifest.json`
3. Verificar console da extensão em Developer Tools

---

## 📋 Lista de Verificação Final

### **Antes de Compartilhar:**

- [ ] ✅ Servidor funcionando perfeitamente
- [ ] ✅ Todos os endpoints testados
- [ ] ✅ Interface carrega sem erros
- [ ] ✅ Todas as funcionalidades operacionais
- [ ] ✅ Background worker ativo
- [ ] ✅ Notificações funcionando
- [ ] ✅ Performance satisfatória
- [ ] ✅ Sem erros no console
- [ ] ✅ Documentação completa
- [ ] ✅ Screenshots capturados

### **Para Produção:**

- [ ] ✅ Código limpo e comentado
- [ ] ✅ Configurações otimizadas
- [ ] ✅ Segurança validada
- [ ] ✅ Compatibilidade testada
- [ ] ✅ Backup de configurações
- [ ] ✅ Instruções de uso claras

---

## 🎉 Resultado Esperado

Após seguir este guia, você terá uma extensão Chrome **premium** funcionando com:

- **Interface moderna** com glassmorphism
- **Funcionalidades avançadas** de busca e filtros
- **Analytics dashboard** para métricas de uso
- **Sistema de favoritos** para orgs importantes
- **Notificações inteligentes** do sistema
- **Performance otimizada** e responsiva

**A extensão SalesforceArcPilot v2.0 está pronta para impressionar! 🚀**
