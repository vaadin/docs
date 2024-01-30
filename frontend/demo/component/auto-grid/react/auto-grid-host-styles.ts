import { css, unsafeCSS } from 'lit';
// @ts-ignore
import autoGridStyles from '@vaadin/hilla-react-crud/autogrid.obj.js';
// @ts-ignore
import autoFormStyles from '@vaadin/hilla-react-crud/autoform.obj.js';
// @ts-ignore
import autoCrudStyles from '@vaadin/hilla-react-crud/autocrud.obj.js';

function extractCss(stylesheet: CSSStyleSheet): string {
  return Array.from(stylesheet.cssRules)
    .map((rule) => rule.cssText)
    .join('\n');
}

export const autoGridHostStyles = css`
  ${unsafeCSS(extractCss(autoGridStyles))}
  ${unsafeCSS(extractCss(autoFormStyles))}
  ${unsafeCSS(extractCss(autoCrudStyles))}
`;
