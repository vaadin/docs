import { html, LitElement, customElement, css, unsafeCSS, property } from 'lit-element';
import '@vaadin/vaadin-icons/vaadin-icons';
import '@vaadin/vaadin-lumo-styles/badge.js';

// tag::snippet[]
@customElement('hint-badge')
export class Example extends LitElement {
  static get styles() {
    return [
      // Workaround for applying `lumo-badge` styles
      unsafeCSS(
        document.head.querySelector('dom-module#lumo-badge')?.querySelector('template')?.content
          .firstElementChild?.textContent
      ),
      css`
        span[theme~='badge'] {
          margin-bottom: var(--lumo-space-s);
          justify-content: flex-start;
          width: 100%;
        }

        iron-icon {
          /* Overriding margin from badge theme */
          margin: var(--lumo-space-m) !important;
        }
      `
    ];
  }

  @property({ type: String })
  public message =
    'Open the Context Menu by right-clicking (desktop) or long-pressing (mobile) a Grid row';

  render() {
    return html`
      <span theme="badge">
        <iron-icon icon="vaadin:exclamation-circle"></iron-icon>
        <span>${this.message}</span>
      </span>
    `;
  }
}
// end::snippet[]
