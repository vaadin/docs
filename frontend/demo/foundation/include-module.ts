import { CSSResult } from 'lit';

export function includeModule(cssModule: CSSResult, parseCss: (css: string) => string) {
  const css = cssModule.cssText;
  const style = document.createElement('style');
  style.innerHTML = parseCss(css);
  document.head.appendChild(style);
}
