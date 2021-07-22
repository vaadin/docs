import 'Frontend/demo/init'; // hidden-source-line

import '@vaadin/vaadin-board/vaadin-board';
import '@vaadin/vaadin-split-layout/vaadin-split-layout';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('board-column-wrapping')
export class Example extends LitElement {
  constructor() {
    super();
    this.classList.add('board-column-wrapping');
  }

  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-split-layout>
        <vaadin-board style="width: 100%">
          <vaadin-board-row class="row">
            <div class="cell color">Cell 1</div>
            <div class="cell color">Cell 2</div>
            <div class="cell color">Cell 3</div>
            <div class="cell color">Cell 4</div>
          </vaadin-board-row>
        </vaadin-board>
        <div></div>
      </vaadin-split-layout>
      <!-- end::snippet[] -->
    `;
  }
}
