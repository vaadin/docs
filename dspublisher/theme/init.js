const path = require(`path`);
const fs = require(`fs`);
const https = require('https');

async function fetchAntlersStyleSheets() {
  // Full collection of available style sheets: https://gitlab.vaadin.com/dion/vcom-design-system/
  const antlersStyleSheets = [
    'https://cdn.vaadin.com/vaadin-design-system/latest/assets/css/haas-bundle.css',
    'https://cdn.vaadin.com/vaadin-design-system/latest/assets/css/3-patterns/card.css',
  ];

  // No try-catch, let the build fail if there is an error fetching the style sheets
  for (let i = 0; i < antlersStyleSheets.length; i++) {
    const url = antlersStyleSheets[i];
    const css = await new Promise((resolve) => {
      https
        .get(url, (res) => {
          res.setEncoding('utf8');
          let body = '';
          res.on('data', (data) => {
            body += data;
          });
          res.on('end', () => {
            resolve(body);
          });
        })
        .on('error', (e) => {
          throw new Error(
            `Failed to fetch Antlers stylesheet "${url}": ${response.status} ${response.statusText}`
          );
        });
    });

    let localStyleSheetPath =
      './styles/antlers/' + url.split('https://cdn.vaadin.com/vaadin-design-system/latest/')[1];

    const localStyleSheetDir = localStyleSheetPath.split('/').slice(0, -1).join('/');
    fs.mkdirSync(path.resolve(__dirname, localStyleSheetDir), { recursive: true });

    await fs.writeFileSync(path.resolve(__dirname, localStyleSheetPath), css);
  }
}

// The default gets run whenever dspublisher is started
module.exports = fetchAntlersStyleSheets;
