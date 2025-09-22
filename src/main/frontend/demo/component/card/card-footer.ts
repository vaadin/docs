import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/card';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('card-footer')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-card style="height: 240px;">
        <div slot="title">Lapland</div>
        <div>Lapland is the northern-most region of Finland and an active outdoor destination.</div>
        <!-- tag::[] -->
        <vaadin-button slot="footer">Book Vacation</vaadin-button>
        <vaadin-button slot="footer">Learn More</vaadin-button>
        <!-- end::[] -->
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
