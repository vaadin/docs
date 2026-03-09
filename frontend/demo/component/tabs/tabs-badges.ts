import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/badge';
import '@vaadin/tabs';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('tabs-badges')
export class Example extends LitElement {
  static override styles = [
    css`
      vaadin-badge {
        margin-inline-start: var(--vaadin-gap-xs);
      }
    `,
  ];

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
          <span>Open</span>
          <vaadin-badge number="24" theme="filled"></vaadin-badge>
        </vaadin-tab>
        <vaadin-tab>
          <span>Completed</span>
          <vaadin-badge number="49" theme="filled"></vaadin-badge>
        </vaadin-tab>
        <vaadin-tab>
          <span>Cancelled</span>
          <vaadin-badge number="5" theme="filled"></vaadin-badge>
        </vaadin-tab>
      </vaadin-tabs>
      <!-- end::snippet[] -->
    `;
  }
}
