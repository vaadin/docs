import 'Frontend/demo/init'; // hidden-full-source-line

import '@vaadin/vaadin-board';
import '@vaadin/vaadin-split-layout';
import { html, LitElement, customElement } from 'lit-element';
import { applyTheme } from 'Frontend/generated/theme';
import cellColorsCSS from './shared-styles/board-cell-color';
import defaultCellCSS from './shared-styles/board-cell-default';
import defaultBreakpointsCSS from './shared-styles/board-default-breakpoints';
import './utils/board-resize-info';

@customElement('board-column-wrapping')
export class Example extends LitElement {
  static get styles() {
    return [defaultBreakpointsCSS, cellColorsCSS, defaultCellCSS];
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
        <vaadin-board>
          <vaadin-board-row class="row">
            <div class="cell">Cell 1</div>
            <div class="cell">Cell 2</div>
            <div class="cell">Cell 3</div>
            <div class="cell">Cell 4</div>
          </vaadin-board-row>
        </vaadin-board>
        <board-resize-info></board-resize-info>
      </vaadin-split-layout>
      <!-- end::snippet[] -->
    `;
  }
}
