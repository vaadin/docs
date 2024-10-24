import 'Frontend/demo/init'; // hidden-source-line
import './example-cleanup'; // hidden-source-line
import '@vaadin/cookie-consent';
import '@vaadin/vaadin-lumo-styles/all-imports';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('cookie-consent-theming')
export class Example extends LitElement {
  // tag::snippet[]
  connectedCallback() {
    super.connectedCallback();
    document.documentElement.classList.add('cookie-consent-theming');
  }
  // end::snippet[]

  // tag::snippet[]
  protected override render() {
    return html`<vaadin-cookie-consent></vaadin-cookie-consent>`;
  }
  // end::snippet[]
}
