import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';
import '@vaadin/horizontal-layout';
import '@vaadin/radio-group';
import type { RadioGroupValueChangedEvent } from '@vaadin/radio-group';
import '@vaadin/text-area';

@customElement('basic-layouts-horizontal-layout-vertical-alignment')
export class Example extends LitElement {
  constructor() {
    super();
    this.classList.add('basic-layouts-example');
  }

  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  @state()
  private alignItems = 'stretch';

  render() {
    return html`
      <vaadin-horizontal-layout
        theme="spacing padding"
        class="height-5xl"
        style="align-items: ${this.alignItems}"
      >
        <vaadin-text-area label="Text area 1"></vaadin-text-area>
        <vaadin-text-area label="Text area 2"></vaadin-text-area>
        <vaadin-text-area label="Text area 3"></vaadin-text-area>
      </vaadin-horizontal-layout>
      <vaadin-radio-group
        label="Vertical alignment"
        .value="${this.alignItems}"
        @value-changed="${(event: RadioGroupValueChangedEvent) => {
          this.alignItems = event.detail.value;
        }}"
      >
        <vaadin-radio-button value="stretch" label="Stretch (default)"></vaadin-radio-button>
        <vaadin-radio-button value="flex-start" label="Start"></vaadin-radio-button>
        <vaadin-radio-button value="center" label="Center"></vaadin-radio-button>
        <vaadin-radio-button value="flex-end" label="End"></vaadin-radio-button>
        <vaadin-radio-button value="baseline" label="Baseline"></vaadin-radio-button>
      </vaadin-radio-group>
    `;
  }
  // end::snippet[]
}
