#!/bin/bash

# Script para testar a extensão Salesforce ArcPilot
# Execute com: chmod +x test-extension.sh && ./test-extension.sh

echo "🚀 Testando Extensão Salesforce ArcPilot"
echo "========================================"

# Verificar se os arquivos essenciais existem
echo "📁 Verificando arquivos essenciais..."

FILES=(
    "manifest.json"
    "popup/popup.html"
    "popup/popup.js"
    "popup/popup.css"
    "background/background.js"
    "icons/icon16.png"
    "icons/icon48.png"
    "icons/icon128.png"
    "_locales/pt_BR/messages.json"
    "_locales/en/messages.json"
)

MISSING_FILES=()

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file (MISSING)"
        MISSING_FILES+=("$file")
    fi
done

if [ ${#MISSING_FILES[@]} -eq 0 ]; then
    echo ""
    echo "🎉 Todos os arquivos essenciais estão presentes!"
else
    echo ""
    echo "⚠️  Arquivos faltando: ${#MISSING_FILES[@]}"
    for file in "${MISSING_FILES[@]}"; do
        echo "   - $file"
    done
fi

# Verificar sintaxe JSON
echo ""
echo "🔍 Verificando sintaxe JSON..."

JSON_FILES=(
    "manifest.json"
    "_locales/pt_BR/messages.json"
    "_locales/en/messages.json"
)

for file in "${JSON_FILES[@]}"; do
    if [ -f "$file" ]; then
        if python3 -m json.tool "$file" > /dev/null 2>&1; then
            echo "✅ $file (JSON válido)"
        else
            echo "❌ $file (JSON inválido)"
        fi
    fi
done

# Verificar se há ícones duplicados ou faltando
echo ""
echo "🎨 Verificando ícones..."

ICON_SIZES=(16 32 48 128)

for size in "${ICON_SIZES[@]}"; do
    if [ -f "icons/icon${size}.png" ]; then
        echo "✅ icon${size}.png"
    else
        echo "❌ icon${size}.png (MISSING)"
    fi
done

# Verificar se há traduções inconsistentes
echo ""
echo "🌍 Verificando traduções..."

if [ -f "_locales/pt_BR/messages.json" ] && [ -f "_locales/en/messages.json" ]; then
    echo "✅ Arquivos de tradução presentes"
    
    # Contar chaves
    PT_KEYS=$(python3 -c "import json; print(len(json.load(open('_locales/pt_BR/messages.json'))))" 2>/dev/null || echo "0")
    EN_KEYS=$(python3 -c "import json; print(len(json.load(open('_locales/en/messages.json'))))" 2>/dev/null || echo "0")
    
    echo "📊 Chaves PT-BR: $PT_KEYS"
    echo "📊 Chaves EN: $EN_KEYS"
    
    if [ "$PT_KEYS" -eq "$EN_KEYS" ]; then
        echo "✅ Número de traduções consistente"
    else
        echo "⚠️  Número de traduções inconsistente"
    fi
else
    echo "❌ Arquivos de tradução faltando"
fi

echo ""
echo "🔧 Como carregar a extensão no Chrome:"
echo "1. Abra chrome://extensions/"
echo "2. Ative o 'Modo do desenvolvedor'"
echo "3. Clique em 'Carregar sem compactação'"
echo "4. Selecione esta pasta"
echo ""
echo "✨ Extensão pronta para teste!"
