import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/avatar';
import '@vaadin/card';
import '@vaadin/icon';
import '@vaadin/vaadin-lumo-styles/icons.js';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';
import img from '../../../../src/main/resources/images/lapland.avif?url';

@customElement('card-cover-media')
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
      <!-- tag::[] -->
      <vaadin-card theme="cover-media">
        <!-- end::[] -->
        <img slot="media" width="100" src="${img}" alt="" />
        <div slot="title">Lapland</div>
        <div slot="subtitle">The Exotic North</div>
        <div>Lapland is the northern-most region of Finland and an active outdoor destination.</div>
      </vaadin-card>

      <!-- tag::[] -->
      <vaadin-card theme="cover-media">
        <!-- end::[] -->
        <vaadin-icon
          slot="media"
          icon="lumo:photo"
          class="bg-primary-10 text-primary"
        ></vaadin-icon>
        <div slot="title">Lapland</div>
        <div slot="subtitle">The Exotic North</div>
        <div>Lapland is the northern-most region of Finland and an active outdoor destination.</div>
      </vaadin-card>
      <!-- end::snippet[] -->
    `;
  }
}
