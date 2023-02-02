import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';
import '@vaadin/button';
import '@vaadin/radio-group';
import type { RadioGroupValueChangedEvent } from '@vaadin/radio-group';
import '@vaadin/vertical-layout';

@customElement('basic-layouts-vertical-layout-individual-alignment')
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
  alignLayoutItems = 'flex-start';

  @state()
  alignFirstItem = 'auto';

  render() {
    return html`
      <vaadin-vertical-layout theme="spacing padding" style="align-items: ${this.alignLayoutItems}">
        <vaadin-button style="align-self: ${this.alignFirstItem}" theme="primary">
          Button 1
        </vaadin-button>
        <vaadin-button>Button 2</vaadin-button>
        <vaadin-button>Button 3</vaadin-button>
      </vaadin-vertical-layout>
      <vaadin-radio-group
        label="Layout alignment"
        .value="${this.alignLayoutItems}"
        @value-changed="${(event: RadioGroupValueChangedEvent) => {
          this.alignLayoutItems = event.detail.value;
        }}"
      >
        <vaadin-radio-button value="flex-start" label="Start (default)"></vaadin-radio-button>
        <vaadin-radio-button value="center" label="Center"></vaadin-radio-button>
        <vaadin-radio-button value="flex-end" label="End"></vaadin-radio-button>
        <vaadin-radio-button value="stretch" label="Stretch"></vaadin-radio-button>
      </vaadin-radio-group>
      <vaadin-radio-group
        label="Item 1: alignment"
        .value="${this.alignFirstItem}"
        @value-changed="${(event: RadioGroupValueChangedEvent) => {
          this.alignFirstItem = event.detail.value;
        }}"
      >
        <vaadin-radio-button value="auto" label="Auto (default)"></vaadin-radio-button>
        <vaadin-radio-button value="flex-start" label="Start"></vaadin-radio-button>
        <vaadin-radio-button value="center" label="Center"></vaadin-radio-button>
        <vaadin-radio-button value="flex-end" label="End"></vaadin-radio-button>
        <vaadin-radio-button value="stretch" label="Stretch"></vaadin-radio-button>
      </vaadin-radio-group>
    `;
  }
  // end::snippet[]
}
