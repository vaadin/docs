import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/vaadin-tabs/vaadin-tabs';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('badge-counter')
export class Example extends LitElement {
  static get styles() {
    return css`
      span[theme~='badge'] {
        margin-inline-start: var(--lumo-space-s);
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
      <vaadin-tabs>
        <vaadin-tab>
          <span>Inbox</span>
          <span
            theme="badge contrast pill small"
            aria-label="12 unread messages"
            title="12 unread messages"
            >12</span
          >
        </vaadin-tab>
        <vaadin-tab>
          <span>Important</span>
          <span
            theme="badge contrast pill small"
            aria-label="3 unread messages"
            title="3 unread messages"
            >3</span
          >
        </vaadin-tab>
        <vaadin-tab>
          <span>Spam</span>
          <span
            theme="badge contrast pill small"
            aria-label="45 unread messages"
            title="45 unread messages"
          >
            45
          </span>
        </vaadin-tab>
        <vaadin-tab>
          <span>Archive</span>
          <span
            theme="badge contrast pill small"
            aria-label="23 unread messages"
            title="23 unread messages"
          >
            23
          </span>
        </vaadin-tab>
      </vaadin-tabs>
      <!-- end::snippet[] -->
    `;
  }
}
