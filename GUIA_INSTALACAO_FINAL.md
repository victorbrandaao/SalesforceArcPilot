# 🚀 Guia de Instalação e Teste Final

## Salesforce ArcPilot v2.0.0 - Pronto para Uso!

---

## 📋 STATUS ATUAL

✅ **Todas as melhorias implementadas**  
✅ **Todos os arquivos validados**  
✅ **Servidor local funcionando**  
✅ **0 erros de sintaxe**

---

## 👶 TUTORIAL PARA INICIANTES

### 🤔 **O que é esta extensão?**

O **Salesforce ArcPilot** é uma extensão para o navegador Chrome que facilita o gerenciamento das suas organizações Salesforce. Com ela você pode:

- 🔍 **Buscar** organizações rapidamente
- 🚀 **Abrir** orgs com um clique
- 💝 **Apoiar** o projeto com doações PIX
- 🌐 **Usar** em português ou inglês

### 🛠️ **Pré-requisitos Simples**

**Você vai precisar de:**

1. ✅ **Google Chrome** (navegador)
2. ✅ **Node.js** instalado no seu computador
3. ✅ **Salesforce CLI** (vamos ensinar a instalar)

### 📥 **Passo 1: Instalar Node.js (se não tiver)**

1. **Verificar se já tem Node.js:**

   - Abra o **Terminal** (procure por "Terminal" no Spotlight/Launchpad)
   - Digite: `node --version` e pressione Enter
   - Se aparecer algo como "v18.x.x", você já tem! Pule para o Passo 2
   - Se der erro "command not found", continue abaixo

2. **Instalar Node.js:**
   - Acesse: https://nodejs.org
   - Baixe a versão **LTS** (recomendada)
   - Abra o arquivo baixado e siga o instalador
   - Reinicie o Terminal e teste novamente: `node --version`

### 📥 **Passo 2: Instalar Salesforce CLI**

1. **No Terminal, digite:**
   ```bash
   npm install -g @salesforce/cli
   ```
2. **Aguarde a instalação** (pode demorar alguns minutos)

3. **Teste se funcionou:**
   ```bash
   sf --version
   ```
4. **Deve aparecer algo como:** `@salesforce/cli/2.90.4`

---

## 🚀 **Passo 3: Iniciar o Servidor da Extensão**

### **Para usuários iniciantes:**

1. **Abrir o Terminal:**

   - Pressione `Cmd + Espaço` (abre Spotlight)
   - Digite "Terminal" e pressione Enter

2. **Navegar até a pasta:**
   ```bash
   cd /Users/victorbrandao/Documents/SalesforceArcPilot/local-server
   ```
3. **Iniciar o servidor:**

   ```bash
   node server.js
   ```

4. **O que deve aparecer:**

   ```
   🚀 Salesforce ArcPilot Server v2.0.0
   📡 Servidor rodando em http://localhost:3000
   ⚡ Salesforce CLI integration ativo
   ```

5. **⚠️ IMPORTANTE:** Deixe esta janela do Terminal **aberta**! Se fechar, a extensão não funcionará.

### **Teste se está funcionando:**

- Abra seu navegador
- Acesse: http://localhost:3000/health
- Deve aparecer: `{"status": "healthy"}`

---

## 🌐 **Passo 4: Instalar a Extensão no Chrome**

### **Tutorial passo a passo:**

1. **Abrir Chrome Extensions:**

   - Abra o Google Chrome
   - Na barra de endereços, digite: `chrome://extensions/`
   - Pressione Enter

2. **Ativar Modo Desenvolvedor:**

   - No canto superior direito, você verá um toggle "Modo do desenvolvedor"
   - **Clique para ativar** (deve ficar azul/verde)

3. **Carregar a Extensão:**

   - Clique no botão **"Carregar sem compactação"**
   - Uma janela de pastas vai abrir
   - Navegue até: `/Users/victorbrandao/Documents/SalesforceArcPilot`
   - **Selecione a pasta inteira** (não um arquivo específico)
   - Clique **"Selecionar"**

4. **Confirmar Instalação:**
   - A extensão deve aparecer na lista
   - Nome: "Salesforce ArcPilot - Org Manager"
   - Versão: "2.0.0"
   - Status: "Ativado" ✅

---

## 🎯 **Passo 5: Testar a Extensão (Para Iniciantes)**

### **1. Primeiro Teste - Abrir a Extensão:**

1. **Encontrar o ícone:**
   - Olhe na barra superior do Chrome (ao lado da barra de endereços)
   - Procure por um ícone da extensão (pode estar no menu de extensões: 🧩)
2. **Clicar no ícone:**
   - A janela da extensão deve abrir
   - Tamanho: aproximadamente 520x850px (bem maior que antes!)
3. **O que você deve ver:**
   - ✅ "CLI Disponível" (não mais "Verificando CLI...")
   - Interface moderna com glassmorphism
   - Barra de pesquisa no topo

### **2. Teste do Sistema PIX:**

1. **Localizar o botão PIX:**

   - Role até o final da extensão (footer)
   - Procure pelo botão **"Doar com PIX"** 💝

2. **Abrir modal de doação:**

   - Clique no botão "Doar com PIX"
   - Uma janela modal deve abrir

3. **Testar funcionalidades:**
   - ✅ Clique nos botões de valores (R$ 5, 10, 20, 50)
   - ✅ Clique no botão "Copiar" ao lado da chave PIX
   - ✅ Deve aparecer "Copiado!"
   - ✅ Pressione ESC para fechar

### **3. Teste de Idiomas:**

1. **Mudar idioma do Chrome:**

   - Vá em: Chrome → Configurações → Idiomas
   - Adicione/mova "English" para o topo
   - Reinicie o Chrome

2. **Verificar tradução:**

   - Abra a extensão novamente
   - Botão PIX deve mostrar "Donate with PIX"
   - Interface deve estar em inglês

3. **Voltar para português:**
   - Mova "Português (Brasil)" para o topo
   - Reinicie o Chrome

### **4. Teste de Funcionalidades Básicas:**

1. **Busca:**

   - Digite algo na barra de pesquisa
   - Deve filtrar resultados em tempo real

2. **Filtros:**

   - Clique nos botões de filtro (se disponíveis)
   - Deve organizar as organizações

3. **Atualizar:**
   - Clique no botão "Atualizar Tudo" 🔄
   - Deve recarregar os dados

---

## ❌ **Problemas Comuns (Para Iniciantes)**

### **🚫 Problema: "Extensão não aparece"**

**Soluções:**

1. ✅ Verifique se o "Modo do desenvolvedor" está ativado
2. ✅ Vá em `chrome://extensions/` e procure a extensão
3. ✅ Clique no ícone 🧩 na barra do Chrome para ver extensões ocultas

### **🚫 Problema: "CLI Indisponível"**

**Soluções:**

1. ✅ Abra o Terminal
2. ✅ Digite: `sf --version`
3. ✅ Se der erro, reinstale: `npm install -g @salesforce/cli`

### **🚫 Problema: "Servidor Offline"**

**Soluções:**

1. ✅ Verifique se o Terminal ainda está aberto
2. ✅ Se fechou, reabra e execute:
   ```bash
   cd /Users/victorbrandao/Documents/SalesforceArcPilot/local-server
   node server.js
   ```

### **🚫 Problema: "PIX não funciona"**

**Soluções:**

1. ✅ Verifique se o servidor está rodando
2. ✅ Atualize a página da extensão (recarregue em chrome://extensions/)
3. ✅ Teste em uma aba anônima do Chrome

---

## 💡 **Dicas Para Iniciantes**

### **📌 Sempre Lembrar:**

- 🔄 **Servidor deve estar rodando** (Terminal aberto)
- 🔄 **Não feche o Terminal** com o servidor
- 🔄 **Para parar:** `Ctrl + C` no Terminal

### **📌 Como Reiniciar Tudo:**

1. **Parar servidor:** `Ctrl + C` no Terminal
2. **Iniciar novamente:**
   ```bash
   cd /Users/victorbrandao/Documents/SalesforceArcPilot/local-server
   node server.js
   ```
3. **Recarregar extensão:** Vá em `chrome://extensions/` e clique no ⟳

### **📌 Atalhos Úteis:**

- **Abrir Terminal:** `Cmd + Espaço` → "Terminal"
- **Fechar modal PIX:** Tecla `ESC`
- **Acessar extensões:** `chrome://extensions/`

---

## 🔧 PRÉ-REQUISITOS (VERSÃO TÉCNICA)

### 1. Servidor Local (OBRIGATÓRIO)

```bash
# No terminal, navegue até a pasta da extensão:
cd /Users/victorbrandao/Documents/SalesforceArcPilot/local-server

# Inicie o servidor (deve ficar rodando):
node server.js
```

**Verificação:** Acesse http://localhost:3000/health - deve retornar `{"status": "healthy"}`

### 2. Salesforce CLI

```bash
# Verificar se está instalado:
sf --version

# Se não estiver instalado:
npm install -g @salesforce/cli
```

---

## 🌐 CARREGANDO A EXTENSÃO NO CHROME (VERSÃO TÉCNICA)

### Passo 1: Abrir Chrome Extensions

1. Abra o Google Chrome
2. Digite na barra de endereços: `chrome://extensions/`
3. Ative o **"Modo do desenvolvedor"** (toggle no canto superior direito)

### Passo 2: Carregar Extensão

1. Clique em **"Carregar sem compactação"**
2. Navegue até: `/Users/victorbrandao/Documents/SalesforceArcPilot`
3. Selecione a pasta (onde está o `manifest.json`)
4. Clique **"Selecionar"**

### Passo 3: Verificar Instalação

✅ A extensão deve aparecer na lista com:

- Nome: "Salesforce ArcPilot - Org Manager"
- Versão: "2.0.0"
- Status: "Ativado"

---

## 🧪 TESTES ESSENCIAIS

### 1. Teste Básico

1. Clique no ícone da extensão na barra do Chrome
2. **Verifique:** Popup abre com tamanho 520x850px
3. **Verifique:** Status CLI mostra "✅ CLI Disponível" (não mais "Verificando CLI...")

### 2. Teste do Sistema PIX

1. No footer da extensão, clique **"Doar com PIX"**
2. **Verifique:** Modal de doação abre
3. **Verifique:** Chave PIX é copiável
4. **Verifique:** Botões de valores (R$ 5, 10, 20, 50) funcionam
5. **Teste:** Tecla ESC fecha o modal

### 3. Teste de Idiomas

1. Altere o idioma do Chrome para inglês
2. Recarregue a extensão
3. **Verifique:** Interface muda para inglês
4. **Verifique:** Botão PIX mostra "Donate with PIX"

### 4. Teste de Funcionalidades Core

1. **Search:** Digite na barra de pesquisa
2. **Filters:** Teste os filtros de organização
3. **CLI Integration:** Verifique se orgs são listadas corretamente

---

## 🔍 RESOLUÇÃO DE PROBLEMAS

### ❌ Problema: "CLI Indisponível"

**Solução:**

```bash
# Verificar CLI:
sf --version

# Reinstalar se necessário:
npm install -g @salesforce/cli

# Verificar organizações:
sf org list
```

### ❌ Problema: "Servidor Offline"

**Solução:**

```bash
# Reiniciar servidor:
cd /Users/victorbrandao/Documents/SalesforceArcPilot/local-server
node server.js
```

### ❌ Problema: Extensão não carrega

**Verificações:**

1. Modo desenvolvedor ativado
2. Pasta correta selecionada (com manifest.json)
3. Recarregar extensão: ⟳ na página chrome://extensions/

---

## 📊 FUNCIONALIDADES IMPLEMENTADAS

### ✅ Melhorias Principais

- **CLI Verification:** Não trava mais, status em tempo real
- **PIX Donation:** Sistema completo de doação
- **English Support:** Tradução completa
- **Larger Popup:** 520x850px (18% maior)

### ✅ Correções Críticas

- **JavaScript:** Totalmente reestruturado, 0 erros
- **JSON Locales:** Sintaxe corrigida
- **Server Integration:** Health checks robustos

---

## 📋 **CHECKLIST COMPLETO (Para Iniciantes)**

### **✅ Antes de Começar:**

- [ ] Google Chrome instalado
- [ ] Node.js instalado (`node --version` funciona)
- [ ] Salesforce CLI instalado (`sf --version` funciona)

### **✅ Instalação:**

- [ ] Servidor rodando (Terminal mostra "Servidor rodando em http://localhost:3000")
- [ ] Modo desenvolvedor ativado no Chrome
- [ ] Extensão carregada e aparece na lista
- [ ] Status "Ativado" ✅

### **✅ Testes Básicos:**

- [ ] Extensão abre ao clicar no ícone
- [ ] Mostra "✅ CLI Disponível"
- [ ] Popup tem tamanho grande (520x850px)

### **✅ Testes PIX:**

- [ ] Botão "Doar com PIX" existe no footer
- [ ] Modal abre ao clicar
- [ ] Chave PIX é copiável
- [ ] Botões de valores funcionam
- [ ] ESC fecha o modal

### **✅ Testes de Idioma:**

- [ ] Interface muda para inglês
- [ ] PIX mostra "Donate with PIX"
- [ ] Volta para português corretamente

---

## 🎯 PRÓXIMOS PASSOS

### **Para Usuários Iniciantes**

1. **✅ Usar a extensão diariamente:**

   - Sempre iniciar o servidor antes de usar
   - Gerenciar suas orgs Salesforce
   - Explorar todas as funcionalidades

2. **✅ Apoiar o projeto:**

   - Usar o sistema PIX para doações
   - Compartilhar com outros desenvolvedores Salesforce
   - Deixar feedback

3. **✅ Aprender mais:**
   - Explorar o Salesforce CLI
   - Descobrir outras funcionalidades
   - Participar da comunidade Salesforce

### Para Desenvolvimento

1. ✅ Extensão funcionando localmente
2. 📝 Documentar funcionalidades extras
3. 🚀 Preparar para Chrome Web Store

### Para Produção

1. **Screenshots:** Atualizar para novas funcionalidades
2. **Store Listing:** Preparar descrição
3. **Package:** Criar .zip para upload

---

## 📞 SUPORTE

### Se encontrar problemas:

1. Verificar console do Chrome (F12)
2. Verificar se servidor está rodando
3. Verificar se CLI está instalado
4. Recarregar extensão

### Logs importantes:

- **Console da Extensão:** Erros JavaScript
- **Network Tab:** Problemas de conexão com servidor
- **Terminal:** Status do servidor local

---

## ❓ **FAQ - Perguntas Frequentes (Para Iniciantes)**

### **🤔 "O que é Node.js e por que preciso dele?"**

**Resposta:** Node.js é um programa que permite executar código JavaScript no seu computador. A extensão precisa dele para rodar o servidor local que conecta com o Salesforce CLI.

### **🤔 "O que é Salesforce CLI?"**

**Resposta:** É uma ferramenta de linha de comando oficial da Salesforce que permite gerenciar organizações pelo Terminal. A extensão usa ela para listar e abrir suas orgs.

### **🤔 "Por que preciso deixar o Terminal aberto?"**

**Resposta:** O Terminal está rodando um "servidor local" que é como uma ponte entre a extensão e o Salesforce CLI. Se fechar, a ponte quebra e a extensão não funciona.

### **🤔 "É seguro usar esta extensão?"**

**Resposta:** Sim! A extensão roda localmente no seu computador e não envia dados para servidores externos. Todo o código está disponível para análise.

### **🤔 "O que acontece se eu fechar o Chrome?"**

**Resposta:** A extensão para de funcionar, mas o servidor continua rodando no Terminal. Quando abrir o Chrome novamente, a extensão funcionará normalmente.

### **🤔 "Como faço para parar tudo?"**

**Resposta:** No Terminal onde o servidor está rodando, pressione `Ctrl + C`. Isso para o servidor. A extensão ficará disponível no Chrome mas não funcionará até reiniciar o servidor.

### **🤔 "Posso usar sem o Salesforce CLI?"**

**Resposta:** A extensão funcionará parcialmente, mas muitas funcionalidades (como listar orgs automaticamente) não estarão disponíveis. Recomendamos instalar o CLI.

### **🤔 "Como doar via PIX?"**

**Resposta:** Clique em "Doar com PIX" no footer da extensão, copie a chave PIX ou escaneie o QR Code, e faça a transferência pelo seu banco. Qualquer valor ajuda!

### **🤔 "A extensão consome muita internet?"**

**Resposta:** Não! Ela roda localmente e só acessa a internet para abrir as organizações Salesforce quando você clica nelas.

### **🤔 "Posso usar no Safari ou Firefox?"**

**Resposta:** Atualmente só funciona no Google Chrome. É uma extensão específica para Chrome devido às suas funcionalidades avançadas.

---

## 🎉 CONCLUSÃO

A extensão **Salesforce ArcPilot v2.0.0** está **100% funcional** com todas as melhorias implementadas:

- ✅ Interface moderna e responsiva
- ✅ Sistema PIX de doação completo
- ✅ Suporte internacional (PT/EN)
- ✅ Integração CLI robusta
- ✅ UX aprimorada
- ✅ **Tutorial completo para iniciantes**

**Pronta para uso em produção!** 🚀

### **📞 Precisa de Ajuda?**

Se mesmo seguindo este tutorial você encontrar dificuldades:

1. **📧 Contato:** GitHub - @victorbrandaao
2. **🔍 Verificar:** Console do Chrome (F12) para erros
3. **💡 Dica:** A maioria dos problemas é resolvida reiniciando o servidor

---

**Desenvolvido por:** Victor Brandão  
**Data:** 09 de Junho de 2025
