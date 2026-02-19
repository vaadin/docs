import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/avatar';
import '@vaadin/card';
import '@vaadin/icon';
import '@vaadin/vaadin-lumo-styles/icons.js';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';
import img from '../../../../src/main/resources/images/lapland.avif?url';

@customElement('card-media')
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
        <vaadin-card>
          <!-- tag::[] -->
          <img slot="media" width="100" src="${img}" alt="" />
          <!-- end::[] -->
          <div>
            Lapland is the northern-most region of Finland and an active outdoor destination.
          </div>
        </vaadin-card>

        <vaadin-card>
          <!-- tag::[] -->
          <vaadin-icon slot="media" icon="lumo:photo"></vaadin-icon>
          <!-- end::[] -->
          <div>
            Lapland is the northern-most region of Finland and an active outdoor destination.
          </div>
        </vaadin-card>

        <vaadin-card>
          <!-- tag::[] -->
          <vaadin-avatar slot="media" name="Lapland"></vaadin-avatar>
          <!-- end::[] -->
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
      grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
      gap: 1em;
    }
  `;
}
