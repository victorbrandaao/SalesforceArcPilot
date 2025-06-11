#!/bin/bash

# Script para separar componentes para deploy
# Execute com: chmod +x separate-for-deploy.sh && ./separate-for-deploy.sh

echo "🚀 Separando componentes para deploy..."
echo "======================================"

# Criar diretório para deploy separado
DEPLOY_DIR="../salesforce-arcpilot-deploy"
BACKEND_DIR="$DEPLOY_DIR/backend"
EXTENSION_DIR="$DEPLOY_DIR/extension"
LANDING_DIR="$DEPLOY_DIR/landing"

# Limpar e criar diretórios
rm -rf "$DEPLOY_DIR"
mkdir -p "$BACKEND_DIR" "$EXTENSION_DIR" "$LANDING_DIR"

echo "📁 Criando estrutura de deploy..."

# Backend para Railway/Heroku
echo "🔧 Preparando backend..."
cp -r backend/* "$BACKEND_DIR/"
cp package.json "$BACKEND_DIR/"
cp Procfile "$BACKEND_DIR/"

# Extension para Chrome Web Store
echo "🔌 Preparando extensão..."
cp manifest.json "$EXTENSION_DIR/"
cp -r popup "$EXTENSION_DIR/"
cp -r background "$EXTENSION_DIR/"
cp -r content "$EXTENSION_DIR/"
cp -r icons "$EXTENSION_DIR/"
cp -r _locales "$EXTENSION_DIR/"
cp -r shared "$EXTENSION_DIR/"
cp -r translations "$EXTENSION_DIR/"

# Landing page para Vercel/Netlify
echo "🌐 Preparando landing page..."
cp -r landing-page/* "$LANDING_DIR/"

# Criar READMEs específicos
cat > "$BACKEND_DIR/README.md" << 'EOF'
# Salesforce ArcPilot Backend

Backend API para a extensão Salesforce ArcPilot.

## Deploy

1. Push este diretório para um repositório
2. Conecte no Railway/Heroku
3. Deploy automático

## Local

```bash
npm install
npm start
```

API rodará em http://localhost:3000
EOF

cat > "$EXTENSION_DIR/README.md" << 'EOF'
# Salesforce ArcPilot Extension

Extensão Chrome para gerenciamento de orgs Salesforce.

## Instalação Development

1. Chrome → Extensões → Modo Desenvolvedor
2. "Carregar sem compactação" → Selecionar esta pasta

## Publicação

1. Zipar esta pasta
2. Upload na Chrome Web Store
3. https://chrome.google.com/webstore/devconsole/
EOF

cat > "$LANDING_DIR/README.md" << 'EOF'
# Salesforce ArcPilot Landing Page

Site promocional para a extensão.

## Deploy

- Vercel: `vercel --prod`
- Netlify: Drag & drop esta pasta
- GitHub Pages: Push para repositório

## Local

Abrir index.html no navegador
EOF

# Criar package.json para extensão
cat > "$EXTENSION_DIR/package.json" << 'EOF'
{
  "name": "salesforce-arc-pilot-extension",
  "version": "1.0.0",
  "description": "Chrome Extension para gerenciar orgs Salesforce",
  "manifest_version": 3,
  "private": true
}
EOF

# Criar script de build para extensão
cat > "$EXTENSION_DIR/build.sh" << 'EOF'
#!/bin/bash
echo "📦 Criando package da extensão..."
zip -r salesforce-arcpilot-extension.zip \
  manifest.json \
  popup/ \
  background/ \
  content/ \
  icons/ \
  _locales/ \
  shared/ \
  translations/
echo "✅ Package criado: salesforce-arcpilot-extension.zip"
EOF

chmod +x "$EXTENSION_DIR/build.sh"

echo ""
echo "✅ Separação concluída!"
echo ""
echo "📁 Estrutura criada em: $DEPLOY_DIR"
echo ""
echo "🎯 Próximos passos:"
echo ""
echo "🔧 BACKEND (Railway/Heroku):"
echo "   cd $BACKEND_DIR"
echo "   git init && git add . && git commit -m 'Backend'"
echo "   # Conectar no Railway"
echo ""
echo "🔌 EXTENSÃO (Chrome Web Store):"
echo "   cd $EXTENSION_DIR"
echo "   ./build.sh"
echo "   # Upload do ZIP na Chrome Web Store"
echo ""
echo "🌐 LANDING PAGE (Vercel/Netlify):"
echo "   cd $LANDING_DIR"
echo "   # Deploy direto ou git"
echo ""
echo "✨ Deploy separado pronto!"
