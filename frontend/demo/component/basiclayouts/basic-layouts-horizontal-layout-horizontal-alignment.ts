import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';
import '@vaadin/button';
import '@vaadin/horizontal-layout';
import '@vaadin/radio-group';
import type { RadioGroupValueChangedEvent } from '@vaadin/radio-group';

@customElement('basic-layouts-horizontal-layout-horizontal-alignment')
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
  private justifyContent = 'flex-start';

  render() {
    return html`
      <vaadin-horizontal-layout
        theme="spacing padding"
        style="justify-content: ${this.justifyContent}"
      >
        <vaadin-button>Button 1</vaadin-button>
        <vaadin-button>Button 2</vaadin-button>
        <vaadin-button>Button 3</vaadin-button>
      </vaadin-horizontal-layout>
      <vaadin-radio-group
        label="Horizontal alignment"
        .value="${this.justifyContent}"
        @value-changed="${(event: RadioGroupValueChangedEvent) => {
          this.justifyContent = event.detail.value;
        }}"
      >
        <vaadin-radio-button value="flex-start" label="Start (default)"></vaadin-radio-button>
        <vaadin-radio-button value="center" label="Center"></vaadin-radio-button>
        <vaadin-radio-button value="flex-end" label="End"></vaadin-radio-button>
        <vaadin-radio-button value="space-between" label="Between"></vaadin-radio-button>
        <vaadin-radio-button value="space-around" label="Around"></vaadin-radio-button>
        <vaadin-radio-button value="space-evenly" label="Evenly"></vaadin-radio-button>
      </vaadin-radio-group>
    `;
  }
  // end::snippet[]
}
