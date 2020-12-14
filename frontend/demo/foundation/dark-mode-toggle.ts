import { cssFromModule } from '@polymer/polymer/lib/utils/style-gather';

export class DarkModeToggle extends HTMLElement {
  get styleModule() {
    return '';
  }

  parseCss(css: string): string {
    return css;
  }

  constructor() {
    super();
    const css = cssFromModule(this.styleModule);
    const style = document.createElement('style');
    style.innerHTML = this.parseCss(css);
    document.head.appendChild(style);

    this.innerHTML = `
    <button class="guibutton">Toggle dark palette</button>
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

  disconnectedCallback() {
    // Avoid affecting colors on other pages such as component examples
    document.documentElement.removeAttribute('theme');
  }
}
