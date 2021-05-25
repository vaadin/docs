import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/vaadin-list-box/vaadin-list-box';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('badge-counter')
export class Example extends LitElement {
  static get styles() {
    return css`
      .item {
        display: flex;
        justify-content: space-between;
      }
    `;
  }

  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-list-box>
        <vaadin-item>
          <div class="item">
            <span>Tasks</span>
            <span theme="badge contrast pill">12</span>
          </div>
        </vaadin-item>
        <hr />
        <vaadin-item>
          <div class="item">
            <span>Messages</span>
            <span theme="badge contrast pill">2</span>
          </div>
        </vaadin-item>
        <hr />
        <vaadin-item>
          <div class="item">
            <span>Settings</span>
            <span aria-label="Settings require attention!" theme="badge error primary pill">
              1
            </span>
          </div>
        </vaadin-item>
      </vaadin-list-box>
      <!-- end::snippet[] -->
    `;
  }
}
