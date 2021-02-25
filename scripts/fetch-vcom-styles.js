const path = require(`path`);
const fs = require(`fs-extra`);
const fetch = require('node-fetch').default;

async function fetchAntlersStyleSheets() {
  // Full collection of available style sheets: https://gitlab.vaadin.com/dion/vcom-design-system/
  const antlersStyleSheets = [
    'https://cdn.vaadin.com/vaadin-design-system/latest/assets/css/haas-bundle.css',
    'https://cdn.vaadin.com/vaadin-design-system/latest/assets/css/3-patterns/card.css'
  ];

  // No try-catch, let the build fail if there is an error fetching the style sheets
  for (let i = 0; i < antlersStyleSheets.length; i++) {
    const url = antlersStyleSheets[i];
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch Antlers stylesheet "${url}": ${response.status} ${response.statusText}`
      );
    }
    const css = await response.text();
    let localStyleSheetPath =
      '../dspublisher/theme/styles/antlers/' + url.split('https://cdn.vaadin.com/vaadin-design-system/latest/')[1];
    await fs.outputFile(path.resolve(__dirname, localStyleSheetPath), css);
  }
}
fetchAntlersStyleSheets();
