const fs = require('fs').promises;
const path = require('path');

async function buildPage() {
  const template = await fs.readFile('./template.html', 'utf8');
  const styles = await fs.readdir('./styles');
  const components = await fs.readdir('./components');

  await fs.mkdir('./project-dist', { recursive: true });

  let html = template;
  for (const component of components) {
    if (path.extname(component) === '.html') {
      const content = await fs.readFile(`./components/${component}`, 'utf8');
      html = html.replace(`{{${path.basename(component, '.html')}}}`, content);
    }
  }
  await fs.writeFile('./project-dist/index.html', html);

  let css = '';
  for (const style of styles) {
    if (path.extname(style) === '.css') {
      const content = await fs.readFile(`./styles/${style}`, 'utf8');
      css += content;
    }
  }
  await fs.writeFile('./project-dist/style.css', css);

  await fs.copyFile('./assets', './project-dist/assets');
}

buildPage().catch(console.error);
