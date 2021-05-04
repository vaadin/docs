import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-item/vaadin-item';
import '@vaadin/vaadin-list-box';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('list-box-separators')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-list-box multiple .selectedValues="${[0, 2, 3]}">
        <vaadin-item>Show assignee</vaadin-item>
        <vaadin-item>Show due date</vaadin-item>
        <vaadin-item>Show status</vaadin-item>
        <hr />
        <vaadin-item>Show thumbnail</vaadin-item>
        <vaadin-item>Show preview</vaadin-item>
      </vaadin-list-box>
      <!-- end::snippet[] -->
    `;
  }
}
