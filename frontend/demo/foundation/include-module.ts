import { cssFromModule } from '@polymer/polymer/lib/utils/style-gather';

export function includeModule(moduleName: string, parseCss: (css: string) => string) {
  const css = cssFromModule(moduleName);
  const style = document.createElement('style');
  style.innerHTML = parseCss(css);
  document.head.appendChild(style);
}
