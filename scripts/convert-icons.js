// Script para converter ícones SVG para PNG
// Execute com: npm install sharp && node scripts/convert-icons.js

const fs = require("fs");
const path = require("path");

// Função para criar PNG usando Canvas API (browser)
function createIconPNG(size) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = size;
  canvas.height = size;

  // Fundo transparente
  ctx.clearRect(0, 0, size, size);

  // Círculo principal
  ctx.fillStyle = "#0066cc";
  ctx.strokeStyle = "#004499";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2 - 2, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();

  // Foguete branco
  ctx.fillStyle = "#ffffff";

  // Corpo do foguete
  ctx.beginPath();
  ctx.ellipse(
    size / 2,
    size / 2 - size / 12,
    size / 10,
    size / 5,
    0,
    0,
    2 * Math.PI
  );
  ctx.fill();

  // Ponta do foguete
  ctx.beginPath();
  ctx.moveTo(size / 2 - size / 16, size / 2 - size / 3.5);
  ctx.lineTo(size / 2, size / 2 - size / 2.8);
  ctx.lineTo(size / 2 + size / 16, size / 2 - size / 3.5);
  ctx.closePath();
  ctx.fill();

  // Aletas
  ctx.beginPath();
  ctx.moveTo(size / 2 - size / 10, size / 2 - size / 25);
  ctx.lineTo(size / 2 - size / 7, size / 2 + size / 12);
  ctx.lineTo(size / 2 - size / 16, size / 2 + size / 16);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(size / 2 + size / 10, size / 2 - size / 25);
  ctx.lineTo(size / 2 + size / 7, size / 2 + size / 12);
  ctx.lineTo(size / 2 + size / 16, size / 2 + size / 16);
  ctx.closePath();
  ctx.fill();

  // Janela
  ctx.fillStyle = "#0066cc";
  ctx.beginPath();
  ctx.arc(size / 2, size / 2 - size / 6, size / 25, 0, 2 * Math.PI);
  ctx.fill();

  // Chama
  ctx.fillStyle = "#ff6b35";
  ctx.beginPath();
  ctx.moveTo(size / 2 - size / 21, size / 2 + size / 8);
  ctx.lineTo(size / 2, size / 2 + size / 4);
  ctx.lineTo(size / 2 + size / 21, size / 2 + size / 8);
  ctx.closePath();
  ctx.fill();

  return canvas.toDataURL("image/png");
}

// Como não temos access ao DOM no Node.js, vamos criar um script HTML para conversão
const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>Convert Icons</title>
</head>
<body>
    <h1>Converting Icons...</h1>
    <div id="output"></div>
    
    <script>
        ${createIconPNG.toString()}
        
        const sizes = [16, 32, 48, 128];
        const output = document.getElementById('output');
        
        sizes.forEach(size => {
            const dataUrl = createIconPNG(size);
            const link = document.createElement('a');
            link.download = \`icon\${size}.png\`;
            link.href = dataUrl;
            link.textContent = \`Download icon\${size}.png\`;
            link.style.display = 'block';
            link.style.margin = '10px 0';
            output.appendChild(link);
            
            // Auto download
            setTimeout(() => link.click(), size * 10);
        });
    </script>
</body>
</html>
`;

const iconsDir = path.join(__dirname, "..", "icons");
fs.writeFileSync(path.join(iconsDir, "convert-icons.html"), htmlContent);

console.log("✅ Created convert-icons.html");
console.log(
  "🎯 Open icons/convert-icons.html in browser to download PNG files"
);
