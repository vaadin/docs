import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/badge';
import '@vaadin/tabs';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('badge-counter')
export class Example extends LitElement {
  static override styles = css`
    vaadin-badge {
      margin-inline-start: var(--vaadin-gap-s);
    }
  `;

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-tabs>
        <vaadin-tab>
          <span>Inbox</span>
          <vaadin-badge .number="${12}" theme="filled number-only">
            unread messages
          </vaadin-badge>
        </vaadin-tab>
        <vaadin-tab>
          <span>Important</span>
          <vaadin-badge .number="${3}" theme="filled number-only">
            unread messages
          </vaadin-badge>
        </vaadin-tab>
        <vaadin-tab>
          <span>Spam</span>
          <vaadin-badge .number="${45}" theme="filled number-only">
            unread messages
          </vaadin-badge>
        </vaadin-tab>
        <vaadin-tab>
          <span>Archive</span>
          <vaadin-badge .number="${23}" theme="filled number-only">
            unread messages
          </vaadin-badge>
        </vaadin-tab>
      </vaadin-tabs>
      <!-- end::snippet[] -->
    `;
  }
}
