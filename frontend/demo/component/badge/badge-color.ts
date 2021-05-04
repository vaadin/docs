import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import { html, LitElement, customElement } from 'lit-element';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('badge-color')
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
          <span theme="badge">Pending</span>
          <span theme="badge success">Confirmed</span>
          <span theme="badge error">Denied</span>
          <span theme="badge contrast">On hold</span>
        </vaadin-horizontal-layout>
        <vaadin-horizontal-layout theme="spacing">
          <span theme="badge primary">Pending</span>
          <span theme="badge success primary">Confirmed</span>
          <span theme="badge error primary">Denied</span>
          <span theme="badge contrast primary">On hold</span>
        </vaadin-horizontal-layout>
      </vaadin-vertical-layout>
      <!-- end::snippet[] -->
    `;
  }
}
