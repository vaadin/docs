import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/card';
import '@vaadin/icon';
import '@vaadin/vaadin-lumo-styles/icons.js';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';
import img from '../../../../src/main/resources/images/lapland.avif?url';

@customElement('card-stretch-media')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <div class="card-grid">
        <!-- tag::snippet[] -->
        <!-- tag::[] -->
        <vaadin-card theme="stretch-media">
          <!-- end::[] -->
          <img slot="media" width="100" src="${img}" alt="" />
          <div slot="title">Lapland</div>
          <div slot="subtitle">The Exotic North</div>
          <div>
            Lapland is the northern-most region of Finland and an active outdoor destination.
          </div>
        </vaadin-card>

        <!-- tag::[] -->
        <vaadin-card theme="stretch-media">
          <!-- end::[] -->
          <vaadin-icon
            slot="media"
            icon="lumo:photo"
            style="background: rgba(0, 0, 0, 0.2)"
          ></vaadin-icon>
          <div slot="title">Lapland</div>
          <div slot="subtitle">The Exotic North</div>
          <div>
            Lapland is the northern-most region of Finland and an active outdoor destination.
          </div>
        </vaadin-card>
        <!-- end::snippet[] -->
      </div>
    `;
  }

  static styles = css`
    .card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1em;
    }
  `;
}
