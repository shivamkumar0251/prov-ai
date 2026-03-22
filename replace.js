const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  if (!fs.existsSync(dir)) return filelist;
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (file === 'node_modules' || file === '.git' || file === '.mintlify') return;
    try {
      if (fs.statSync(dirFile).isDirectory()) {
        filelist = walkSync(dirFile, filelist);
      } else {
        if (file.endsWith('.mdx') || file.endsWith('.md') || file.endsWith('.json')) {
          filelist.push(dirFile);
        }
      }
    } catch(e) {}
  });
  return filelist;
};

const files = walkSync('c:/Users/PC/Desktop/prov-ai-docs');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  content = content.replace(/Dify Docs/g, 'Prov AI Docs');
  content = content.replace(/Dify is an open-source platform/g, 'Prov AI is an enterprise platform');
  
  // Replace references to Dify
  content = content.replace(/Dify/g, 'Prov AI');
  
  // Replace open-source and open source with enterprise
  content = content.replace(/\bopen-source\b/gi, 'enterprise');
  content = content.replace(/\bopen source\b/gi, 'enterprise');
  content = content.replace(/\bOpen-source\b/gi, 'Enterprise');
  content = content.replace(/\bOpen source\b/gi, 'Enterprise');
  content = content.replace(/\bOpen Source\b/gi, 'Enterprise');
  
  // Some Chinese translation mappings
  content = content.replace(/开源/g, '企业级');

  if (original !== content) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated:', file);
  }
});
console.log('Done replacement.');
