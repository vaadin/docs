import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/board';
import '@vaadin/split-layout';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('board-breakpoints')
export class Example extends LitElement {
  constructor() {
    super();
  }
  connectedCallback() {
    super.connectedCallback();
    this.classList.add('board-breakpoints');
  }

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  protected override render() {
    return html`
      <vaadin-split-layout>
        <vaadin-board style="width: 100%">
          <!-- styles are defined separately, check the board.css snippet -->
          <vaadin-board-row>
            <div class="cell">Cell 1</div>
            <div class="cell">Cell 2</div>
            <div class="cell">Cell 3</div>
            <div class="cell">Cell 4</div>
          </vaadin-board-row>
        </vaadin-board>
        <div></div>
      </vaadin-split-layout>
    `;
  }
  // end::snippet[]
}
