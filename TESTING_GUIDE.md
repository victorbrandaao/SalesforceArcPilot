# Como Carregar e Testar a Extensão SalesforceArcPilot v2.0

## 🚀 Carregando a Extensão no Chrome

### Passo 1: Abrir o Chrome

1. Abra o Google Chrome
2. Digite na barra de endereços: `chrome://extensions/`
3. Pressione Enter

### Passo 2: Ativar Modo Desenvolvedor

1. No canto superior direito, ative o **"Modo do desenvolvedor"**
2. Novos botões aparecerão: "Carregar sem compactação", "Compactar extensão", "Atualizar"

### Passo 3: Carregar a Extensão

1. Clique em **"Carregar sem compactação"**
2. Navegue até a pasta: `/Users/victorbrandao/Documents/SalesforceArcPilot`
3. Selecione a pasta e clique em **"Selecionar"**

### Passo 4: Verificar Instalação

1. A extensão deve aparecer na lista com o nome **"Salesforce ArcPilot"**
2. Verifique se o status está **"Ativado"**
3. Anote o **ID da extensão** (será usado para permissões)

## 🔧 Iniciando o Servidor Local

### Terminal 1: Servidor Node.js

```bash
cd /Users/victorbrandao/Documents/SalesforceArcPilot/local-server
node server.js
```

**Saída esperada:**

```
🚀 Salesforce ArcPilot Server v2.0.0
📡 Servidor rodando em http://localhost:3000
⚡ Salesforce CLI integration ativo
🔗 CORS configurado para extensões Chrome
⏰ Iniciado em 2025-06-05T12:57:03.872Z
---
Endpoints disponíveis:
  GET  /health     - Status do servidor
  GET  /cli-info   - Informações do Salesforce CLI
  GET  /list-orgs  - Listar orgs autorizadas
  POST /open-org   - Abrir org via CLI
---
💡 Certifique-se de que o Salesforce CLI está instalado e configurado.
```

## 🧪 Testando as Funcionalidades

### 1. Teste Básico da Extensão

1. Clique no ícone da extensão na barra de ferramentas do Chrome
2. A interface deve abrir com:
   - ✅ Header com título e status do servidor
   - ✅ Barra de pesquisa
   - ✅ Botões de filtro (All, CLI, Manual, Favorites)
   - ✅ Lista de orgs (se houver orgs configuradas)
   - ✅ Seção de analytics (colapsível)

### 2. Teste de Conectividade com Servidor

1. Verifique o **status indicator** no header
2. Deve mostrar "🟢 Conectado" se o servidor estiver rodando
3. Se mostrar "🔴 Desconectado", verifique se o servidor está ativo

### 3. Teste de Busca

1. Digite qualquer texto na barra de pesquisa
2. A lista deve filtrar em tempo real
3. Teste com: nome da org, username, tipo, etc.

### 4. Teste de Filtros

1. Clique nos botões de filtro: **All**, **CLI**, **Manual**, **Favorites**
2. A lista deve atualizar conforme o filtro selecionado
3. O botão ativo deve ter aparência diferente

### 5. Teste de Favoritos

1. Clique na estrela (⭐) ao lado de uma org
2. A estrela deve ficar preenchida (★)
3. Clique no filtro **Favorites** para ver apenas orgs favoritadas

### 6. Teste de Analytics

1. Clique no botão **"Analytics"** para expandir/colapsar
2. Deve mostrar estatísticas de uso:
   - Total de aberturas
   - Aberturas via CLI
   - Aberturas manuais
   - Última utilização

### 7. Teste de Copy to Clipboard

1. Clique no botão **"Copy"** de uma org
2. Deve aparecer um toast de sucesso
3. Cole o conteúdo em qualquer editor - deve conter dados da org

### 8. Teste de Atalhos de Teclado

1. Pressione **Ctrl + K** (ou **Cmd + K** no Mac)
2. O foco deve ir para a barra de pesquisa
3. Pressione **Escape** para limpar a pesquisa

### 9. Teste de Abertura de Org

1. Clique no botão **"Open"** de uma org
2. Deve aparecer um toast de carregamento
3. A org deve abrir em uma nova aba
4. As estatísticas de analytics devem atualizar

### 10. Teste de Modal de Configurações

1. Clique no botão **"⚙️"** no header
2. O modal de configurações deve abrir
3. Teste as opções disponíveis
4. Clique fora ou no X para fechar

## 🐛 Troubleshooting

### Problema: Extensão não carrega

**Solução:**

1. Verifique se o arquivo `manifest.json` está correto
2. Verifique se todos os arquivos estão na pasta
3. Recarregue a extensão em `chrome://extensions/`

### Problema: Status "Desconectado"

**Solução:**

1. Verifique se o servidor está rodando na porta 3000
2. Teste o endpoint: `http://localhost:3000/health`
3. Verifique se não há bloqueio de firewall

### Problema: Orgs não aparecem

**Solução:**

1. Verifique se o Salesforce CLI está instalado: `sf version`
2. Verifique se há orgs autorizadas: `sf org list`
3. Autorize uma org: `sf org login web -a MyOrg`

### Problema: Erro de CORS

**Solução:**

1. Verifique se o servidor está configurado corretamente
2. Reinicie o servidor
3. Verifique se a extensão está usando HTTPS/HTTP correto

## 📸 Screenshots Sugeridos

Para documentação ou posts em fóruns, capture screenshots dos seguintes estados:

1. **Interface Principal** - Lista de orgs com filtros
2. **Busca Ativa** - Mostrando filtro de pesquisa funcionando
3. **Analytics Expandido** - Dashboard de estatísticas
4. **Modal de Configurações** - Tela de configurações
5. **Toast Notifications** - Notificações de sucesso/erro
6. **Dark Mode** - Se implementado, mostrar tema escuro
7. **Estados de Loading** - Skeleton loading animations

## ✅ Checklist de Validação Final

- [ ] Extensão carrega sem erros
- [ ] Servidor conecta corretamente
- [ ] Busca funciona em tempo real
- [ ] Filtros funcionam corretamente
- [ ] Favoritos podem ser marcados/desmarcados
- [ ] Analytics mostram dados corretos
- [ ] Copy to clipboard funciona
- [ ] Atalhos de teclado respondem
- [ ] Orgs abrem corretamente
- [ ] Modal de configurações abre/fecha
- [ ] Toast notifications aparecem
- [ ] Layout é responsivo
- [ ] Performance é satisfatória

## 🎉 Próximos Passos

Após validar todas as funcionalidades:

1. **Documentar Issues**: Anote qualquer problema encontrado
2. **Coletar Feedback**: Teste com outros usuários
3. **Criar Screenshots**: Para documentação e posts
4. **Preparar Release**: Versão final para distribuição
5. **Compartilhar**: Posts em fóruns de desenvolvedores Salesforce

---

**A extensão SalesforceArcPilot v2.0 está pronta para uso e showcase!** 🚀
