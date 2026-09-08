const fs = require('fs');
let content = fs.readFileSync('data/shapes3d_engine.js', 'utf8');

content = content.replace(/<text x="12" y="20"([^>]+)>([^<]+)<\/text>/g, '<text x="${svgW - 32}" y="20" text-anchor="start"$1>$2</text>');
content = content.replace(/<text x="\$\{svgW - 24\}" y="20"([^>]+)text-anchor="end">([^<]+)<\/text>/g, '<text x="12" y="20"$1text-anchor="end">$2</text>');
content = content.replace(/<text x="12" y="38"([^>]+)>([^<]+)<\/text>/g, '<text x="${svgW - 32}" y="38" text-anchor="start"$1>$2</text>');
content = content.replace(/<text x="\$\{svgW - 24\}" y="38"([^>]+)text-anchor="end">([^<]+)<\/text>/g, '<text x="12" y="38"$1text-anchor="end">$2</text>');

fs.writeFileSync('data/shapes3d_engine.js', content);
console.log("Replaced successfully!");
