import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/card';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('card-content')
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
      <vaadin-card>
        <p>
          Lapland is the northern-most region of Finland and an active outdoor destination that's
          known for its incredible, year-round light phenomena, vast arctic nature, and Santa Claus.
        </p>
        <p>
          The land of the indigenous Sámi people, known as Sámi homeland or Sápmi, also crosses the
          northern part of the region.
        </p>
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
