import 'construct-style-sheets-polyfill';

// target: Document | ShadowRoot
export const injectGlobalCss = (css, target) => {
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(css);
  target.adoptedStyleSheets = [...target.adoptedStyleSheets, sheet];
};
import stylesCss from './styles.css';

window.Vaadin = window.Vaadin || {};
window.Vaadin.Flow = window.Vaadin.Flow || {};
window.Vaadin.Flow['_vaadinds_docs_globalCss'] =
  window.Vaadin.Flow['_vaadinds_docs_globalCss'] || [];
export const applyTheme = target => {
  const injectGlobal =
    window.Vaadin.Flow['_vaadinds_docs_globalCss'].length === 0 ||
    (!window.Vaadin.Flow['_vaadinds_docs_globalCss'].includes(target) && target !== document);
  if (injectGlobal) {
    injectGlobalCss(stylesCss.toString(), target);

    window.Vaadin.Flow['_vaadinds_docs_globalCss'].push(target);
  }
  if (!document['_vaadinds_docs_componentCss']) {
    document['_vaadinds_docs_componentCss'] = true;
  }
};
