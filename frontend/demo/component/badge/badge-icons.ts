import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/vaadin-lumo-styles/icons';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import { html, LitElement, customElement } from 'lit-element';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('badge-icons')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-vertical-layout theme="spacing">
        <vaadin-horizontal-layout theme="spacing">
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
        </vaadin-horizontal-layout>
        <vaadin-horizontal-layout theme="spacing">
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
        </vaadin-horizontal-layout>
      </vaadin-vertical-layout>
      <!-- end::snippet[] -->
    `;
  }
}
