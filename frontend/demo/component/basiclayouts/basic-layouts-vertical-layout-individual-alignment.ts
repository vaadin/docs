import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';
import '@vaadin/radio-group';
import { RadioGroupValueChangedEvent } from '@vaadin/radio-group';
import '@vaadin/vertical-layout';
import './layout-item';

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
  alignLayoutItems?: string;

  @state()
  alignFirstItem?: string;

  render() {
    return html`
      <vaadin-vertical-layout theme="spacing padding" style="align-items: ${this.alignLayoutItems}">
        <layout-item style="align-self: ${this.alignFirstItem}">Item 1</layout-item>
        <layout-item theme="inactive">Item 2</layout-item>
        <layout-item theme="inactive">Item 3</layout-item>
      </vaadin-vertical-layout>
      <vaadin-radio-group
        label="Layout alignment"
        @value-changed="${(e: RadioGroupValueChangedEvent) =>
          (this.alignLayoutItems = e.detail.value)}"
      >
        <vaadin-radio-button
          value="flex-start"
          label="Start (default)"
          checked
        ></vaadin-radio-button>
        <vaadin-radio-button value="center" label="Center"></vaadin-radio-button>
        <vaadin-radio-button value="flex-end" label="End"></vaadin-radio-button>
        <vaadin-radio-button value="stretch" label="Stretch"></vaadin-radio-button>
      </vaadin-radio-group>
      <vaadin-radio-group
        label="Item 1: alignment"
        @value-changed="${(e: RadioGroupValueChangedEvent) =>
          (this.alignFirstItem = e.detail.value)}"
      >
        <vaadin-radio-button value="auto" label="Auto (default)" checked></vaadin-radio-button>
        <vaadin-radio-button value="flex-start" label="Start"></vaadin-radio-button>
        <vaadin-radio-button value="center" label="Center"></vaadin-radio-button>
        <vaadin-radio-button value="flex-end" label="End"></vaadin-radio-button>
        <vaadin-radio-button value="stretch" label="Stretch"></vaadin-radio-button>
      </vaadin-radio-group>
    `;
  }
  // end::snippet[]
}
