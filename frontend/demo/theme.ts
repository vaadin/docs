import docsCss from 'Frontend/themes/docs/styles.css?inline';

const docsStyles = new CSSStyleSheet() as any;
docsStyles.replaceSync(docsCss);

export function applyTheme(root: DocumentOrShadowRoot) {
  if (!root.adoptedStyleSheets.includes(docsStyles)) {
    root.adoptedStyleSheets = [...root.adoptedStyleSheets, docsStyles];
  }
}
