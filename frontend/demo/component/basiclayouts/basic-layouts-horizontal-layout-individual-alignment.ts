import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';
import '@vaadin/vaadin-item';
import { RadioGroupValueChangedEvent } from '@vaadin/vaadin-radio-button/vaadin-radio-group';
import './layout-item';

@customElement('basic-layouts-horizontal-layout-individual-alignment')
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
  private alignLayoutItems?: string;

  @state()
  private alignFirstItem?: string;

  render() {
    return html`
      <vaadin-horizontal-layout
        theme="spacing padding"
        class="height-5xl"
        style="align-items: ${this.alignLayoutItems}"
      >
        <layout-item style="align-self: ${this.alignFirstItem}">Item 1</layout-item>
        <layout-item theme="inactive">Item 2</layout-item>
        <layout-item theme="inactive">Item 3</layout-item>
      </vaadin-horizontal-layout>
      <vaadin-radio-group
        label="Vertical alignment"
        @value-changed="${(e: RadioGroupValueChangedEvent) =>
          (this.alignLayoutItems = e.detail.value)}"
      >
        <vaadin-radio-button value="stretch" checked>Stretch (default)</vaadin-radio-button>
        <vaadin-radio-button value="flex-start">Start</vaadin-radio-button>
        <vaadin-radio-button value="center">Center</vaadin-radio-button>
        <vaadin-radio-button value="flex-end">End</vaadin-radio-button>
        <vaadin-radio-button value="baseline">Baseline</vaadin-radio-button>
      </vaadin-radio-group>
      <vaadin-radio-group
        label="Item 1: alignment"
        @value-changed="${(e: RadioGroupValueChangedEvent) =>
          (this.alignFirstItem = e.detail.value)}"
      >
        <vaadin-radio-button value="auto" checked>Auto (default)</vaadin-radio-button>
        <vaadin-radio-button value="stretch">Stretch</vaadin-radio-button>
        <vaadin-radio-button value="flex-start">Start</vaadin-radio-button>
        <vaadin-radio-button value="center">Center</vaadin-radio-button>
        <vaadin-radio-button value="flex-end">End</vaadin-radio-button>
        <vaadin-radio-button value="baseline">Baseline</vaadin-radio-button>
      </vaadin-radio-group>
    `;
  }
  // end::snippet[]
}
