import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/vaadin-ordered-layout/vaadin-scroller';
import * as img from '../../../../src/main/resources/images/reindeer.jpg';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('scroller-basic')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-scroller style="height: 300px; width: 100%;">
        <img src="${img}" alt="A reindeer walking on a snowy lake shore at dusk" />
      </vaadin-scroller>
      <!-- end::snippet[] -->
    `;
  }
}
