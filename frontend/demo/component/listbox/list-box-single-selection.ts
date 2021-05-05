import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement, customElement } from 'lit-element';
import '@polymer/iron-icon';
import '@vaadin/vaadin-icons/vaadin-icons';
import '@vaadin/vaadin-item/vaadin-item';
import '@vaadin/vaadin-list-box';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('list-box-single-selection')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-list-box selected="0">
        <vaadin-item>In progress</vaadin-item>
        <vaadin-item>Done</vaadin-item>
        <vaadin-item>Cancelled</vaadin-item>
      </vaadin-list-box>
      <!-- end::snippet[] -->
    `;
  }
}
