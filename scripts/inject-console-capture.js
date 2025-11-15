const fs = require('fs');
const path = require('path');

const outputDir = path.join(process.cwd(), '.next', 'static');
const scriptPath = path.join(process.cwd(), 'public', 'dashboard-console-capture.js');

function injectScript() {
  if (!fs.existsSync(outputDir)) {
    console.log('No build output found. Skipping console capture injection.');
    return;
  }

  const scriptContent = fs.readFileSync(scriptPath, 'utf-8');
  const scriptTag = `<script>${scriptContent}</script>`;

  function processHtmlFiles(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        processHtmlFiles(filePath);
      } else if (file.endsWith('.html')) {
        let content = fs.readFileSync(filePath, 'utf-8');
        
        if (!content.includes('dashboard-console-capture')) {
          content = content.replace('</head>', `${scriptTag}</head>`);
          fs.writeFileSync(filePath, content);
          console.log(`Injected console capture into ${filePath}`);
        }
      }
    });
  }

  processHtmlFiles(outputDir);
  console.log('Console capture script injection complete.');
}

injectScript();