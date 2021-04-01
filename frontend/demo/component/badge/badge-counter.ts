import 'Frontend/demo/init'; // hidden-full-source-line

import '@vaadin/vaadin-list-box';
import { html, LitElement, customElement, css } from 'lit-element';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('badge-counter')
export class Example extends LitElement {
  static styles = css`
    .content {
      display: flex;
      justify-content: space-between;
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
      <vaadin-list-box>
        <vaadin-item>
          <div class="content">
            <span>Tasks</span>
            <span theme="badge contrast pill">12</span>
          </div>
        </vaadin-item>
        <hr />
        <vaadin-item>
          <div class="content">
            <span>Messages</span>
            <span theme="badge contrast pill">2</span>
          </div>
        </vaadin-item>
        <hr />
        <vaadin-item>
          <div class="content">
            <span>Settings</span>
            <span theme="badge error primary pill">1</span>
          </div>
        </vaadin-item>
      </vaadin-list-box>
      <!-- end::snippet[] -->
    `;
  }
}
