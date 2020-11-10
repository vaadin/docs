import './material-tokens';
import { DarkModeToggle } from './dark-mode-toggle';

export default class MaterialDarkModeToggle extends DarkModeToggle {
  get styleModule() {
    return 'material-color-dark';
  }

  parseCss(css: string): string {
    return css
      .replace(':host', 'html[theme~="dark"]')
      .replace('background-color: var(--material-background-color);', '')
      .replace('color: var(--material-body-text-color);', '');
  }
}

customElements.define('material-dark-mode-toggle', MaterialDarkModeToggle);
