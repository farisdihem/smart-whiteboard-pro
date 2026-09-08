const fs = require('fs');
let content = fs.readFileSync('app.js', 'utf8');

content = content.replace(/try \{ cvs\.setPointerCapture/g, 'try { (e.target || document.getElementById("event-catcher")).setPointerCapture');
content = content.replace(/cvs\.style\.cursor/g, 'document.getElementById("event-catcher").style.cursor');

fs.writeFileSync('app.js', content);
console.log("Replaced successfully!");
