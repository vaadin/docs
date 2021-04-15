import './lumo-tokens';
import { DarkModeToggle } from './dark-mode-toggle';

export default class LumoDarkModeToggle extends DarkModeToggle {
  get styleModule() {
    return 'lumo-color';
  }

  parseCss(css: string): string {
    // Strip everything else than the first [theme~="dark"] selector to avoid global style collisions
    return `[theme~="dark"] ${css.split("[theme~='dark']")[1].split('}')[0]} }`;
  }
}

customElements.define('lumo-dark-mode-toggle', LumoDarkModeToggle);
