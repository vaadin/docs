import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/scroller';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';
import img from '../../../../src/main/resources/images/reindeer.jpg?url';

@customElement('scroller-both')
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
      <vaadin-scroller class="w-full" style="height: 300px">
        <img src="${img}" alt="A reindeer walking on a snowy lake shore at dusk" />
      </vaadin-scroller>
      <!-- end::snippet[] -->
    `;
  }
}
