import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/board';
import '@vaadin/split-layout';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('board-column-wrapping')
export class Example extends LitElement {
  connectedCallback() {
    super.connectedCallback();
    this.classList.add('board-column-wrapping');
  }

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
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
