# 🚀 Guia de Deploy - Salesforce ArcPilot

## ✅ **PROBLEMA RESOLVIDO!**

O projeto agora está configurado corretamente para deploy no Railway/Heroku.

## 🎯 **SOLUÇÃO IMPLEMENTADA**

### **Configuração para Deploy Backend**

1. ✅ **package.json na raiz** - Configurado para executar o backend
2. ✅ **Procfile** - Para Heroku/Railway
3. ✅ **railway.toml** - Configuração específica Railway
4. ✅ **.railwayignore** - Ignora arquivos desnecessários
5. ✅ **Dependências atualizadas** - Vulnerabilidades corrigidas

### **Estrutura do Deploy**

```
/ (raiz - Deploy do Backend)
├── package.json ← Roda backend/server.js
├── Procfile ← web: npm start
├── railway.toml ← Configuração Railway
├── .railwayignore ← Ignora extensão/docs
└── backend/
    └── server.js ← API Node.js
```

## 🚀 **COMO FAZER DEPLOY AGORA**

### **Opção 1: Railway (RECOMENDADO)**

1. **Conectar repositório no Railway:**

   ```bash
   # Seu repositório atual já está pronto!
   # Apenas conecte no Railway dashboard
   ```

2. **Railway detectará automaticamente:**

   - ✅ Node.js project
   - ✅ package.json na raiz
   - ✅ npm start command
   - ✅ Port 3000

3. **Deploy automático:**
   - Push para main = deploy automático
   - URL: `https://seu-projeto.up.railway.app`

### **Opção 2: Heroku**

```bash
# 1. Instalar Heroku CLI
brew install heroku/brew/heroku

# 2. Login
heroku login

# 3. Criar app
heroku create salesforce-arcpilot-api

# 4. Deploy
git add .
git commit -m "Deploy backend"
git push heroku main
```

### **Opção 3: Vercel**

```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Deploy
vercel --prod
```

## 🔧 **CONFIGURAÇÕES APLICADAS**

### **package.json (Raiz)**

```json
{
  "name": "salesforce-arc-pilot-backend",
  "main": "backend/server.js",
  "scripts": {
    "start": "node backend/server.js"
  },
  "dependencies": {
    "express": "4.21.2",
    "cors": "2.8.5"
  }
}
```

### **Procfile**

```
web: npm start
```

### **railway.toml**

```toml
[build]
  cmd = "npm install"

[start]
  cmd = "npm start"
```

## 📊 **ENDPOINTS DISPONÍVEIS**

Após o deploy, sua API estará disponível em:

- `GET /api/health` - Health check
- `POST /api/subscription/check` - Verificar assinatura
- `POST /api/analytics/track` - Rastrear eventos
- `POST /api/subscribe` - Newsletter
- `GET /admin` - Dashboard admin

## 🔄 **ATUALIZAÇÕES DA EXTENSÃO**

Para conectar a extensão ao backend deployed:

1. **Editar `shared/config.js`:**

   ```javascript
   const CONFIG = {
     API_BASE_URL: "https://seu-app.up.railway.app/api",
     // ...outras configs
   };
   ```

2. **Atualizar `background/background.js`:**
   ```javascript
   const CONFIG = {
     API_BASE_URL: "https://seu-app.up.railway.app/api",
     // ...
   };
   ```

## 🎯 **PRÓXIMOS PASSOS**

### **1. Deploy do Backend** ✅

- [x] Configurado e pronto
- [ ] Fazer deploy no Railway
- [ ] Testar endpoints

### **2. Publicação da Extensão**

```bash
# Criar package da extensão
./separate-for-deploy.sh
cd ../salesforce-arcpilot-deploy/extension
./build.sh

# Upload na Chrome Web Store
# https://chrome.google.com/webstore/devconsole/
```

### **3. Deploy da Landing Page**

```bash
cd landing-page/
# Deploy no Vercel/Netlify
```

## 🚨 **COMANDO PARA DEPLOY IMEDIATO**

```bash
# 1. Commit as mudanças
git add .
git commit -m "Backend ready for deployment"

# 2. Push para repositório
git push origin main

# 3. Conectar no Railway:
# - https://railway.app
# - "New Project" > "Deploy from GitHub"
# - Selecionar seu repositório
# - Deploy automático!
```

## ✅ **STATUS ATUAL**

- ✅ **Backend configurado** e testado
- ✅ **Package.json** funcionando
- ✅ **Dependências** atualizadas
- ✅ **Vulnerabilidades** corrigidas
- ✅ **Railway config** criada
- ✅ **Pronto para deploy**

---

🎉 **O projeto está agora 100% compatível com Railway/Heroku!**

Basta fazer o deploy e sua API estará no ar! 🚀
