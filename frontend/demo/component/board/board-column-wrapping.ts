import 'Frontend/demo/init'; // hidden-source-line

import '@vaadin/vaadin-board/vaadin-board';
import '@vaadin/vaadin-split-layout/vaadin-split-layout';
import { html, LitElement, customElement } from 'lit-element';
import { applyTheme } from 'Frontend/generated/theme';
import defaultColorCSS from './example-color-default.css';
import defaultCellCSS from './example-cell-default.css';
import defaultBreakpointsCSS from './example-breakpoint-default.css';

@customElement('board-column-wrapping')
export class Example extends LitElement {
  static get styles() {
    return [defaultBreakpointsCSS, defaultCellCSS, defaultColorCSS];
  }

  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
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
