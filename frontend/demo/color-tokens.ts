import './design-tokens';
import { cssFromModule } from '@polymer/polymer/lib/utils/style-gather';

export default class DarkModeToggle extends HTMLElement {
  constructor() {
    super();
    let css = cssFromModule('lumo-color');
    // Strip everything else than the first [theme~="dark"] selector to avoid global style collisions
    css = `[theme~="dark"] ${css.split('[theme~="dark"]')[1].split('}')[0]} }`;
    const style = document.createElement('style');
    style.innerHTML = css;
    document.head.appendChild(style);
  }

  connectedCallback() {
    this.innerHTML = `
      <button>Toggle dark palette</button>
    `;

    this.querySelector('button')?.addEventListener('click', () => {
      if (document.documentElement.getAttribute('theme') == 'dark') {
        document.documentElement.removeAttribute('theme');
      } else {
        document.documentElement.setAttribute('theme', 'dark');
      }

      requestAnimationFrame(() => {
        window.dispatchEvent(new CustomEvent('custom-properties-changed'));
      });
    });
  }
}

customElements.define('dark-mode', DarkModeToggle);
