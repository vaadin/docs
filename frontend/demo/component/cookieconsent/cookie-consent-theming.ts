import 'Frontend/demo/init'; // hidden-full-source-line
import '@vaadin/flow-frontend/contextMenuConnector.js'; // hidden-full-source-line
import './example-cleanup'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-cookie-consent/vaadin-cookie-consent';

@customElement('cookie-consent-theming')
export class Example extends LitElement {
  // tag::snippet[]
  connectedCallback() {
    const style = document.createElement('style');
    style.innerHTML = `
      div.cc-window.cc-theme-block {
        background-color: var(--lumo-base-color);
        box-shadow: var(--lumo-box-shadow-s);
        color: var(--lumo-body-text-color);
        font-family: var(--lumo-font-family);
        font-size: var(--lumo-font-size-m);
      }

      a.cc-link[role=button] {
        color: var(--lumo-primary-text-color);
        opacity: 1;
        padding: 0 var(--lumo-space-s);
      }

      a.cc-btn.cc-dismiss {
        border: none;
        border-radius: var(--lumo-border-radius);
        color: var(--lumo-primary-contrast-color);
        font-size: var(--lumo-font-size-m);
        line-height: var(--lumo-size-m);
        min-width: 0;
        padding: 0 calc(var(--lumo-size-m) / 3 + var(--lumo-border-radius) / 2);
      }
    `;
    document.body.appendChild(style);
    super.connectedCallback();
  }
  // end::snippet[]

  // tag::snippet[]
  render() {
    return html`<vaadin-cookie-consent></vaadin-cookie-consent>`;
  }
  // end::snippet[]
}
