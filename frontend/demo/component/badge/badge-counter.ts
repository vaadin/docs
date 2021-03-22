import 'Frontend/demo/init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-list-box';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('badge-counter')
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
        <vaadin-item>
          <span>Tasks</span>
          <span theme="badge contrast pill">12</span>
        </vaadin-item>
        <hr />
        <vaadin-item>
          <span>Messages</span>
          <span theme="badge contrast pill">2</span>
        </vaadin-item>
        <hr />
        <vaadin-item>
          <span>Settings</span>
          <span theme="badge error primary pill">1</span>
        </vaadin-item>
      </vaadin-list-box>
      <!-- end::snippet[] -->
    `;
  }
}
