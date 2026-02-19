import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/button';
import '@vaadin/popover';
import '@vaadin/select';
import '@vaadin/vertical-layout';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { PopoverPosition } from '@vaadin/popover';
import type { SelectChangeEvent } from '@vaadin/select';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('popover-positioning')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  @state()
  items = [
    { label: 'Top Start', value: 'top-start' },
    { label: 'Top', value: 'top' },
    { label: 'Top End', value: 'top-end' },
    { label: 'Bottom Start', value: 'bottom-start' },
    { label: 'Bottom', value: 'bottom' },
    { label: 'Bottom End', value: 'bottom-end' },
    { label: 'Start Top', value: 'start-top' },
    { label: 'Start', value: 'start' },
    { label: 'Start Bottom', value: 'start-bottom' },
    { label: 'End Top', value: 'end-top' },
    { label: 'End', value: 'end' },
    { label: 'End Bottom', value: 'end-bottom' },
  ];

  @state()
  position: PopoverPosition = 'bottom';

  protected override render() {
    return html`
      <vaadin-vertical-layout theme="padding spacing" style="align-items: center">
        <vaadin-button id="target" style="--vaadin-button-height: 3rem; margin-top: 1rem">
          Open
        </vaadin-button>
        <vaadin-select
          label="Position"
          .items="${this.items}"
          .value="${this.position}"
          @change="${this.onPositionChange}"
        ></vaadin-select>
      </vaadin-vertical-layout>
      <!-- tag::snippet[] -->
      <vaadin-popover for="target" .position="${this.position}">Popover content</vaadin-popover>
      <!-- end::snippet[] -->
    `;
  }

  onPositionChange(event: SelectChangeEvent) {
    this.position = event.target.value as PopoverPosition;
  }
}
