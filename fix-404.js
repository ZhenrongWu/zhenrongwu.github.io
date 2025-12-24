const fs = require('fs');
const path = require('path');

// 讀取 build/index.html
const indexPath = path.join(__dirname, 'build', 'index.html');
const indexContent = fs.readFileSync(indexPath, 'utf8');

// 將內容寫入 build/404.html
const fourOhFourPath = path.join(__dirname, 'build', '404.html');
fs.writeFileSync(fourOhFourPath, indexContent, 'utf8');

console.log('✓ 已將 index.html 的內容複製到 404.html');

