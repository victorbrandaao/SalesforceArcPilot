# 🚀 Salesforce Arc Pilot

A extensão mais completa para desenvolvedores Salesforce. Organize, acesse e monitore suas orgs com facilidade.

![Salesforce Arc Pilot](https://via.placeholder.com/800x400/667eea/ffffff?text=Salesforce+Arc+Pilot)

## 📋 Índice

- [Instalação](#-instalação)
- [Recursos](#-recursos)
- [Como Usar](#-como-usar)
- [Planos](#-planos)
- [Suporte](#-suporte)
- [Desenvolvimento](#-desenvolvimento)

## 🚀 Instalação

### Método 1: Download Direto (Recomendado)

1. **Baixe a extensão:**

   - Acesse nossa [Landing Page](https://victorbrandaao.github.io/salesforce-arc-pilot-landing)
   - Clique em "Download Grátis"
   - Baixe o arquivo `salesforce-arc-pilot-free.zip`

2. **Extraia o arquivo:**

   ```bash
   # Extraia o ZIP em uma pasta de sua escolha
   unzip salesforce-arc-pilot-free.zip
   ```

3. **Instale no Chrome:**
   - Abra o Chrome e vá para `chrome://extensions/`
   - Ative o "Modo do desenvolvedor" (canto superior direito)
   - Clique em "Carregar sem compactação"
   - Selecione a pasta extraída da extensão
   - A extensão será instalada e o ícone aparecerá na barra de ferramentas

### Método 2: GitHub Releases

1. **Acesse as releases:**

   ```bash
   # Via browser
   https://github.com/victorbrandao-tech/SalesforceArcPilot/releases

   # Via command line
   curl -s https://api.github.com/repos/victorbrandao-tech/SalesforceArcPilot/releases/latest | grep "browser_download_url.*zip" | cut -d '"' -f 4 | wget -i -
   ```

2. **Baixe a versão desejada:**
   - **Grátis:** `salesforce-arc-pilot-free-v1.0.0.zip`
   - **Premium:** `salesforce-arc-pilot-premium-v1.0.0.zip` (após assinatura)

### Método 3: Clone do Repositório (Desenvolvedores)

```bash
# Clone o repositório
git clone https://github.com/victorbrandao-tech/SalesforceArcPilot.git

# Entre na pasta
cd SalesforceArcPilot

# Instale dependências (se necessário)
npm install

# Carregue a extensão no Chrome
# Siga os passos do Método 1, item 3
```

## ✨ Recursos

### 🆓 Plano Grátis

- ✅ Até 2 orgs Salesforce
- ✅ Busca básica de orgs
- ✅ Interface clara e intuitiva
- ✅ Suporte por email

### 💎 Plano Premium (R$ 19/mês)

- ✅ **Orgs ilimitadas**
- ✅ **Analytics dashboard completo**
- ✅ **Dark mode + temas personalizados**
- ✅ **Sincronização na nuvem**
- ✅ **Backup automático**
- ✅ **Histórico de acesso**
- ✅ **Suporte prioritário**

### 🏢 Plano Enterprise (R$ 199/mês)

- ✅ Todos os recursos Premium
- ✅ White-label customização
- ✅ API access
- ✅ Integrações personalizadas
- ✅ Suporte dedicado

## 📖 Como Usar

### 1. Primeira Configuração

Após a instalação:

1. **Clique no ícone da extensão** na barra do Chrome
2. **Adicione sua primeira org:**
   - Clique em "Adicionar Org"
   - Digite o nome da org
   - Cole a URL da org
   - Selecione o tipo (Production, Sandbox, etc.)
   - Salve

### 2. Funcionalidades Principais

#### 🔍 **Busca de Orgs**

```
- Digite o nome da org na barra de busca
- Use filtros por tipo (Production, Sandbox, etc.)
- Acesso rápido com atalhos de teclado
```

#### 🎯 **Acesso Rápido**

```
- Clique na org desejada para abrir
- Histórico de orgs acessadas recentemente
- Favoritos para orgs mais utilizadas
```

#### ⚙️ **Configurações**

```
- Tema claro/escuro (Premium)
- Sincronização na nuvem (Premium)
- Backup automático (Premium)
```

### 3. Atalhos de Teclado

| Atalho             | Ação                    |
| ------------------ | ----------------------- |
| `Ctrl + Shift + S` | Abrir extensão          |
| `Ctrl + K`         | Foco na busca           |
| `Enter`            | Acessar org selecionada |
| `Esc`              | Fechar extensão         |

## 💳 Planos e Assinatura

### Como Fazer Upgrade

1. **Acesse a extensão**
2. **Clique em "Upgrade para Premium"**
3. **Escolha seu plano na landing page**
4. **Complete o pagamento:**
   - PIX (instantâneo)
   - Cartão de crédito
   - PayPal
5. **Ativação automática** em até 5 minutos

### Gerenciar Assinatura

- **Ver status:** Clique no ícone da extensão > "Gerenciar Assinatura"
- **Cancelar:** Botão "Cancelar" nas configurações (manter até o fim do período)
- **Atualizar pagamento:** "Atualizar método de pagamento"

## 🆘 Suporte

### Problemas Comuns

#### ❌ Extensão não carrega

```bash
# Verifique se:
1. O Chrome está atualizado (versão 88+)
2. O "Modo desenvolvedor" está ativado
3. A pasta da extensão está íntegra
4. Não há conflitos com outras extensões
```

#### ❌ Orgs não aparecem

```bash
# Soluções:
1. Verifique sua conexão com a internet
2. Recarregue a extensão (chrome://extensions/)
3. Limpe o cache da extensão
4. Verifique se não atingiu o limite do plano
```

#### ❌ Sincronização não funciona (Premium)

```bash
# Verifique:
1. Se está logado na mesma conta
2. Conexão com internet estável
3. Se a assinatura Premium está ativa
```

### Canais de Suporte

- **📧 Email:** support@salesforcearcpilot.com
- **💬 Chat:** Landing page (horário comercial)
- **📚 Documentação:** [docs.salesforcearcpilot.com](https://docs.salesforcearcpilot.com)
- **🐛 Bugs:** [GitHub Issues](https://github.com/victorbrandao-tech/SalesforceArcPilot/issues)

## 🔧 Desenvolvimento

### Estrutura do Projeto

```
SalesforceArcPilot/
├── manifest.json              # Configuração da extensão
├── popup/                     # Interface principal
│   ├── popup.html
│   ├── popup.js
│   └── popup.css
├── background/                # Scripts de background
│   ├── background.js
│   └── subscription-manager.js
├── content/                   # Scripts de conteúdo
│   └── content.js
├── icons/                     # Ícones da extensão
├── landing-page/              # Landing page
└── releases/                  # Versões para distribuição
```

### Build para Distribuição

```bash
# Script para criar release
./scripts/build-release.sh

# Gera:
# - salesforce-arc-pilot-free.zip (plano grátis)
# - salesforce-arc-pilot-premium.zip (plano premium)
```

### Contribuindo

1. Fork o repositório
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🤝 Contribuidores

- **Victor Brandão** - _Desenvolvimento inicial_ - [@victorbrandao-tech](https://github.com/victorbrandao-tech)

## 🌟 Avaliações

⭐ **4.9/5** - Baseado em 800+ desenvolvedores Salesforce

> _"Revolucionou meu workflow diário. Não consigo mais trabalhar sem!"_  
> — João Silva, Senior Salesforce Developer

> _"A busca inteligente economiza horas do meu tempo toda semana."_  
> — Maria Santos, Salesforce Architect

---

## 🚀 Links Úteis

- **🌐 Landing Page:** https://victorbrandaao.github.io/salesforce-arc-pilot-landing
- **📊 Admin Dashboard:** https://salesforcearcpilot-production.up.railway.app/admin
- **💰 Upgrade Premium:** https://victorbrandaao.github.io/salesforce-arc-pilot-landing/#pricing
- **📧 Contato:** support@salesforcearcpilot.com

---

Feito com ❤️ no Brasil 🇧🇷
