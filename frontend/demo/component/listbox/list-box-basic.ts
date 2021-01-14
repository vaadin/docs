import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-list-box';
import '@vaadin/vaadin-icons/vaadin-icons';
import '@polymer/iron-icon';
import { applyTheme } from 'themes/theme-generated.js';

@customElement('list-box-basic')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-list-box>
        <vaadin-item>Show assignee</vaadin-item>
        <vaadin-item>Show due date</vaadin-item>
        <vaadin-item>Show status</vaadin-item>
      </vaadin-list-box>
      <!-- end::snippet[] -->
    `;
  }
}
