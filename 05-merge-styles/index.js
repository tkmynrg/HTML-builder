const fs = require('fs').promises;
const path = require('path');

async function mergeStyles(src, dest) {
  await fs.mkdir(dest, { recursive: true });

  const entries = await fs.readdir(src, { withFileTypes: true });

  let styles = [];

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);

    if (entry.isFile() && path.extname(entry.name) === '.css') {
      const style = await fs.readFile(srcPath, 'utf8');
      styles.push(style);
    }
  }

  await fs.writeFile(path.join(dest, 'bundle.css'), styles.join('\n'));
}

const srcDir = './05-merge-styles/styles';
const destDir = './05-merge-styles/project-dist';

mergeStyles(srcDir, destDir)
  .then(() => console.log('Success!'))
  .catch(console.error);
