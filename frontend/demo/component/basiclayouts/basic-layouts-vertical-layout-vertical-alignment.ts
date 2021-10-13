import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';
import '@vaadin/radio-group';
import { RadioGroupValueChangedEvent } from '@vaadin/radio-group';
import '@vaadin/vertical-layout';
import './layout-item';

@customElement('basic-layouts-vertical-layout-vertical-alignment')
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
  justifyContent?: string;

  render() {
    return html`
      <vaadin-vertical-layout
        theme="spacing padding"
        class="height-5xl"
        style="justify-content: ${this.justifyContent}"
      >
        <layout-item>Item 1</layout-item>
        <layout-item>Item 2</layout-item>
        <layout-item>Item 3</layout-item>
      </vaadin-vertical-layout>
      <vaadin-radio-group
        label="Vertical alignment"
        @value-changed="${(e: RadioGroupValueChangedEvent) =>
          (this.justifyContent = e.detail.value)}"
      >
        <vaadin-radio-button value="flex-start" checked>Start (default)</vaadin-radio-button>
        <vaadin-radio-button value="center">Center</vaadin-radio-button>
        <vaadin-radio-button value="flex-end">End</vaadin-radio-button>
        <vaadin-radio-button value="space-between">Between</vaadin-radio-button>
        <vaadin-radio-button value="space-around">Around</vaadin-radio-button>
        <vaadin-radio-button value="space-evenly">Evenly</vaadin-radio-button>
      </vaadin-radio-group>
    `;
  }
  // end::snippet[]
}
