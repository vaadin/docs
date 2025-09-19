import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/avatar';
import '@vaadin/card';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';
import img from '../../../../src/main/resources/images/lapland.avif?url';

@customElement('card-combine-variants')
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
      <vaadin-card theme="outlined elevated horizontal cover-media">
        <!-- end::[] -->
        <img slot="media" width="100" src="${img}" alt="" />
        <div slot="title">Lapland</div>
        <div slot="subtitle">The Exotic North</div>
        <div>Lapland is the northern-most region of Finland and an active outdoor destination.</div>
      </vaadin-card>
      <!-- end::snippet[] -->
    `;
  }
}
