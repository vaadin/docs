import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/card';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('card-variants')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <div class="card-variant-layout">
        <!-- tag::snippet[] -->
        <vaadin-card card-title="Default">
          <div>This is the default card style.</div>
        </vaadin-card>

        <vaadin-card card-title="Outlined" theme="outlined">
          <div>Adds a solid outline around the card.</div>
        </vaadin-card>

        <vaadin-card card-title="Elevated" theme="elevated">
          <div>This variant works better on a shaded background.</div>
        </vaadin-card>
        <!-- end::snippet[] -->
      </div>
    `;
  }

  static styles = css`
    .card-variant-layout {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(12ch, 1fr));
      gap: 1rem;
    }
  `;
}
