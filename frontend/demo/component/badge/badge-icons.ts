import 'Frontend/demo/init'; // hidden-full-source-line
import './init'; // hidden-full-source-line

import { html, LitElement, customElement, css } from 'lit-element';
import '@vaadin/vaadin-checkbox/vaadin-checkbox';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('badge-icons')
export class Example extends LitElement {
  static styles = css`
    :host {
      width: calc(var(--lumo-space-xl) * 7.5);
      display: grid;
      grid-template-columns: repeat(3, max-content);
      grid-template-rows: 1fr 1fr;
      grid-gap: var(--lumo-space-s) var(--lumo-space-m);
    }
  `;

  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <span theme="badge">
        <iron-icon icon="lumo:clock"></iron-icon>
        <span>Pending</span>
      </span>
      <span theme="badge success">
        <iron-icon icon="lumo:checkmark"></iron-icon>
        <span>Confirmed</span>
      </span>
      <span theme="badge error">
        <iron-icon icon="lumo:error"></iron-icon>
        <span>Denied</span>
      </span>
      <span theme="badge">
        <span>Pending</span>
        <iron-icon icon="lumo:clock"></iron-icon>
      </span>
      <span theme="badge success">
        <span>Confirmed</span>
        <iron-icon icon="lumo:checkmark"></iron-icon>
      </span>
      <span theme="badge error">
        <span>Denied</span>
        <iron-icon icon="lumo:error"></iron-icon>
      </span>
      <!-- end::snippet[] -->
    `;
  }
}
