const fs = require('fs').promises;
const path = require('path');

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isFile()) {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

const srcDir = './04-copy-directory/files';
const destDir = './04-copy-directory/files-copy';

copyDir(srcDir, destDir)
  .then(() => console.log('Success!'))
  .catch(console.error);
