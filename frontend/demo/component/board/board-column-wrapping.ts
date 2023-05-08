import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/board';
import '@vaadin/split-layout';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('board-column-wrapping')
export class Example extends LitElement {
  constructor() {
    super();
  }
  connectedCallback() {
    super.connectedCallback();
    this.classList.add('board-column-wrapping');
  }

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
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
