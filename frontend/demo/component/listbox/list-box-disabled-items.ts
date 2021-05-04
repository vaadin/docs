import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-item/vaadin-item';
import '@vaadin/vaadin-list-box';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('list-box-disabled-items')
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
        <vaadin-item>In progress (2)</vaadin-item>
        <vaadin-item>Done (4)</vaadin-item>
        <vaadin-item disabled>Cancelled (0)</vaadin-item>
      </vaadin-list-box>
      <!-- end::snippet[] -->
    `;
  }
}
