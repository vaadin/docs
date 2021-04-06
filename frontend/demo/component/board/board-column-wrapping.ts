import 'Frontend/demo/init'; // hidden-full-source-line

import '@vaadin/vaadin-board/vaadin-board';
import '@vaadin/vaadin-split-layout/vaadin-split-layout';
import { html, LitElement, customElement } from 'lit-element';
import { applyTheme } from 'Frontend/generated/theme';
import cellColorsCSS from './shared-styles/example-cell-color.css';
import defaultCellCSS from './shared-styles/example-cell-default.css';
import defaultBreakpointsCSS from './shared-styles/example-default-breakpoints.css';
import './utils/example-resize-info';

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
        <example-resize-info></example-resize-info>
      </vaadin-split-layout>
      <!-- end::snippet[] -->
    `;
  }
}
