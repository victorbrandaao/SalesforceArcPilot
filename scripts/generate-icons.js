// Script para gerar ícones da extensão
// Execute com: node scripts/generate-icons.js

const fs = require("fs");
const path = require("path");

// Função para criar um ícone SVG simples
function createIcon(size) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <circle cx="${size / 2}" cy="${size / 2}" r="${
    size / 2 - 2
  }" fill="#0066cc" stroke="#004499" stroke-width="2"/>
  <g transform="translate(${size / 2}, ${size / 2})">
    <ellipse cx="0" cy="${-size / 12}" rx="${size / 10}" ry="${
    size / 5
  }" fill="#ffffff"/>
    <path d="M ${-size / 16},${-size / 3.5} L 0,${-size / 2.8} L ${size / 16},${
    -size / 3.5
  } Z" fill="#ffffff"/>
    <path d="M ${-size / 10},${-size / 25} L ${-size / 7},${size / 12} L ${
    -size / 16
  },${size / 16} Z" fill="#ffffff"/>
    <path d="M ${size / 10},${-size / 25} L ${size / 7},${size / 12} L ${
    size / 16
  },${size / 16} Z" fill="#ffffff"/>
    <circle cx="0" cy="${-size / 6}" r="${size / 25}" fill="#0066cc"/>
    <path d="M ${-size / 21},${size / 8} L 0,${size / 4} L ${size / 21},${
    size / 8
  } Z" fill="#ff6b35"/>
  </g>
</svg>`;
}

// Criar diretório de ícones se não existir
const iconsDir = path.join(__dirname, "..", "icons");
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Gerar ícones SVG para diferentes tamanhos
const sizes = [16, 32, 48, 128];

sizes.forEach((size) => {
  const svg = createIcon(size);
  fs.writeFileSync(path.join(iconsDir, `icon${size}.svg`), svg);
  console.log(`✅ Generated icon${size}.svg`);
});

console.log("🎨 Icons generated successfully!");
console.log(
  "💡 Para converter SVG para PNG, use um conversor online ou ImageMagick:"
);
console.log("   convert icon128.svg icon128.png");
