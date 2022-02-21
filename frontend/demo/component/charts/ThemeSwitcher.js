import { html, PolymerElement } from '@polymer/polymer';

/**
 * Theme switcher component for the charts examples.
 */
class ThemeSwitcher extends PolymerElement {
  static get template() {
    return html`
      <style>
        .theme-switcher {
          display: flex;
          padding: 1rem;
          z-index: 1;
        }
        .theme-switcher button {
          margin-right: 0.5rem;
        }
      </style>
      
      <select id="theme-switcher">
        <optgroup label="Lumo">
            <option value="lumo-default">Default</option>
            <option value="lumo-gradient">Gradient</option>
            <option value="lumo-monotone">Monotone</option>
        </optgroup>
        <optgroup label="Material">
            <option value="material-default">Default</option>
            <option value="material-gradient">Gradient</option>
            <option value="material-monotone">Monotone</option>
        </optgroup>
      </select>
    `;
  }

  static get is() {
    return 'theme-switcher';
  }

  ready() {
    super.ready();
    let select = this.shadowRoot.getElementById('theme-switcher');
    let value;

    // TODO Theme switching does not work
    select.addEventListener('change', () => {
      value = select.options[select.selectedIndex].text;
      console.log(value);
      this.changeTheme(value)
    });
  }

  changeTheme(theme) {
    const charts = document.getElementsByTagName('vaadin-chart');
    for (let i = 0; i < charts.length; i++) {
      charts[i].setAttribute('theme', theme);
    }
  }
}

customElements.define(ThemeSwitcher.is, ThemeSwitcher);

export { ThemeSwitcher };