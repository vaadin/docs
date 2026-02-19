import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/card';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('card-subtitle')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-card>
        <div slot="title">Lapland</div>
        <!-- tag::[] -->
        <div slot="subtitle">The Exotic North</div>
        <!-- end::[] -->
        <div>Lapland is the northern-most region of Finland and an active outdoor destination.</div>
      </vaadin-card>
      <!-- end::snippet[] -->
    `;
  }

  static styles = css`
    vaadin-card {
      max-width: 300px;
    }
  `;
}
