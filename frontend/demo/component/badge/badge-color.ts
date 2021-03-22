import 'Frontend/demo/init'; // hidden-full-source-line

import { html, LitElement, customElement, css } from 'lit-element';
import '@vaadin/vaadin-checkbox/vaadin-checkbox';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('badge-color')
export class Example extends LitElement {
  static get styles() {
    return css`
      .container {
        width: calc(var(--lumo-space-xl) * 10);
        display: grid;
        grid-template-rows: 1fr 1fr;
        grid-gap: var(--lumo-space-s) var(--lumo-space-m);
        grid-template-columns: repeat(4, max-content);
      }
    `;
  }

  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <section class="container">
        <!-- tag::snippet[] -->
        <span theme="badge">Pending</span>
        <span theme="badge success">Confirmed</span>
        <span theme="badge error">Denied</span>
        <span theme="badge contrast">On hold</span>
        <span theme="badge primary">Pending</span>
        <span theme="badge success primary">Confirmed</span>
        <span theme="badge error primary">Denied</span>
        <span theme="badge contrast primary">On hold</span>
        <!-- end::snippet[] -->
      </section>
    `;
  }
}
