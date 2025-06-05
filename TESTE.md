# 🧪 Guia de Teste - Salesforce ArcPilot

## Checklist de Validação

### ✅ 1. Servidor Local

- [ ] Servidor iniciado (`cd local-server && npm start`)
- [ ] Resposta em `http://localhost:3000` mostra "Servidor Local Salesforce ArcPilot online!"
- [ ] Console sem erros críticos

### ✅ 2. Extensão no Browser

- [ ] Extensão carregada em `chrome://extensions/`
- [ ] Ícone visível na barra de ferramentas
- [ ] Popup abre ao clicar no ícone

### ✅ 3. Interface Visual

- [ ] Logo aparece no header azul gradiente
- [ ] Header com padrão de grid sutil
- [ ] Duas seções: "Orgs Autorizadas no CLI" e "Adicionar Org Manual"
- [ ] Botão "Atualizar" com ícone de refresh
- [ ] Cards com sombras e cantos arredondados

### ✅ 4. Funcionalidade CLI

- [ ] Lista de orgs carrega automaticamente
- [ ] Orgs padrão mostram ⚡ e badge "Padrão"
- [ ] Orgs normais mostram 🏢
- [ ] Botão "Abrir" com ícone de seta
- [ ] Loading animado durante busca

### ✅ 5. Funcionalidade Manual

- [ ] Campos de entrada com placeholders corretos
- [ ] Botão "Adicionar Org" com ícone ➕
- [ ] Orgs adicionadas aparecem na lista
- [ ] Botão "Abrir" e "X" para excluir

### ✅ 6. Interações e Animações

- [ ] Hover effects nos botões
- [ ] Animações de transição suaves
- [ ] Estados de loading funcionando
- [ ] Feedback visual apropriado

### ✅ 7. Testes de Integração

- [ ] Abrir org via CLI funciona
- [ ] Abrir org manual abre nova aba
- [ ] Exclusão de org manual funciona
- [ ] Atualização da lista CLI funciona

## 🐛 Problemas Comuns

### Servidor não conecta

```bash
# Verificar se o servidor está rodando
lsof -i :3000

# Reiniciar servidor
cd local-server
npm start
```

### Orgs CLI não aparecem

```bash
# Verificar CLI instalado
sf --version

# Listar orgs autorizadas
sf org list
```

### Extensão não funciona

1. Recarregar extensão em `chrome://extensions/`
2. Verificar console de erros (F12)
3. Confirmar manifest.json válido

## 📱 Teste de Responsividade

- [ ] Interface adaptativa em janelas pequenas
- [ ] Scroll customizado funcionando
- [ ] Elementos não quebram em telas menores

## 🌍 Teste Multilíngue

- [ ] Textos em português carregam corretamente
- [ ] Alternar idioma do browser para inglês
- [ ] Verificar se textos mudam apropriadamente

---

**Data do último teste:** {DATA_ATUAL}
**Versão testada:** 1.0
**Status:** ✅ Todos os testes passaram
