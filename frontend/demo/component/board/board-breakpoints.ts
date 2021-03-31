import 'Frontend/demo/init';
import {
  boardCellColorsCSS,
  boardCellCSS,
} from 'Frontend/demo/component/board/utils/shared-styles'; // hidden-full-source-line

import '@vaadin/vaadin-board';
import '@vaadin/vaadin-split-layout';
import { html, LitElement, customElement, css } from 'lit-element';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('board-breakpoints')
export class Example extends LitElement {
  static get styles() {
    return [
      boardCellColorsCSS,
      boardCellCSS,
      css`
        :host {
          --vaadin-board-width-small: 300px;
          --vaadin-board-width-medium: 500px;
        }

        vaadin-board-row.large > div {
          font-size: var(--lumo-font-size-s);
          padding: var(--lumo-space-l);
        }

        vaadin-board-row.medium > div {
          font-size: var(--lumo-font-size-m);
          padding: var(--lumo-space-m);
        }

        vaadin-board-row.small > div {
          font-size: var(--lumo-font-size-l);
          padding: var(--lumo-space-s);
        }
      `,
    ];
  }

  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot!);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-split-layout>
        <vaadin-board style="width: 80%">
          <vaadin-board-row>
            <div class="cell">Cell 1</div>
            <div class="cell">Cell 2</div>
            <div class="cell">Cell 3</div>
            <div class="cell">Cell 4</div>
          </vaadin-board-row>
        </vaadin-board>
        <board-resize-info style="20%"></board-resize-info>
      </vaadin-split-layout>
      <!-- end::snippet[] -->
    `;
  }
}
