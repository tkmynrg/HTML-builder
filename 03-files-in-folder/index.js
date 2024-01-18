const fs = require('fs');
const path = require('path');

const dirPath = './03-files-in-folder/secret-folder';

fs.readdir(dirPath, (err, files) => {
  if (err) {
    console.error('Error directory.', err);
    process.exit(1);
  }

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);

    fs.stat(filePath, (error, stat) => {
      if (error) {
        console.error('Error file.', error);
        return;
      }

      if (stat.isFile()) {
        console.log(
          `${path.basename(file, path.extname(file))}.${path
            .extname(file)
            .slice(1)}-${stat.size / 1024}kb`,
        );
      }
    });
  });
});
