import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/vaadin-lumo-styles/vaadin-icons.js';
import '@vaadin/vaadin-icon/vaadin-icon.js';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout.js';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout.js';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('badge-icons')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-vertical-layout theme="spacing">
        <vaadin-horizontal-layout theme="spacing">
          <span theme="badge">
            <vaadin-icon icon="lumo:clock"></vaadin-icon>
            <span>Pending</span>
          </span>
          <span theme="badge success">
            <vaadin-icon icon="lumo:checkmark"></vaadin-icon>
            <span>Confirmed</span>
          </span>
          <span theme="badge error">
            <vaadin-icon icon="lumo:error"></vaadin-icon>
            <span>Denied</span>
          </span>
        </vaadin-horizontal-layout>
        <vaadin-horizontal-layout theme="spacing">
          <span theme="badge">
            <span>Pending</span>
            <vaadin-icon icon="lumo:clock"></vaadin-icon>
          </span>
          <span theme="badge success">
            <span>Confirmed</span>
            <vaadin-icon icon="lumo:checkmark"></vaadin-icon>
          </span>
          <span theme="badge error">
            <span>Denied</span>
            <vaadin-icon icon="lumo:error"></vaadin-icon>
          </span>
        </vaadin-horizontal-layout>
      </vaadin-vertical-layout>
      <!-- end::snippet[] -->
    `;
  }
}
