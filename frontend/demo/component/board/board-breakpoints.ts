import 'Frontend/demo/init'; // hidden-full-source-line

import '@vaadin/vaadin-board/vaadin-board';
import '@vaadin/vaadin-split-layout/vaadin-split-layout';
import { html, LitElement, customElement, css } from 'lit-element';
import { applyTheme } from 'Frontend/generated/theme';
import './utils/example-resize-info';

@customElement('board-breakpoints')
export class Example extends LitElement {
  // tag::snippet[]
  static get styles() {
    return css`
      :host {
        --vaadin-board-width-small: 300px;
        --vaadin-board-width-medium: 400px;
      }

      vaadin-board-row.large > .cell {
        background: var(--lumo-success-color-10pct);
        color: var(--lumo-success-color);
      }

      vaadin-board-row.medium > .cell {
        background: var(--lumo-primary-color-10pct);
        color: var(--lumo-primary-color);
      }

      vaadin-board-row.small > .cell {
        background: var(--lumo-error-color-10pct);
        color: var(--lumo-error-color);
      }
    `;
  }
  // end::snippet[]

  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  // tag::snippet[]
  render() {
    return html`
      <vaadin-split-layout>
        <vaadin-board style="width: 80%">
          <vaadin-board-row>
            <div class="cell">Cell 1</div>
            <div class="cell">Cell 2</div>
            <div class="cell">Cell 3</div>
            <div class="cell">Cell 4</div>
          </vaadin-board-row>
        </vaadin-board>
        <example-resize-info style="width: 20%"></example-resize-info>
      </vaadin-split-layout>
    `;
  }
  // end::snippet[]
}
