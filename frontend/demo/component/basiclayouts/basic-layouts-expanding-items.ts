import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';
import '@vaadin/vaadin-item';
import { RadioGroupValueChangedEvent } from '@vaadin/vaadin-radio-button/vaadin-radio-group';
import './layout-item';

@customElement('basic-layouts-expanding-items')
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
  private size!: string;

  render() {
    return html`
      <vaadin-horizontal-layout theme="padding spacing">
        <layout-item style="flex-grow: ${this.size}">Item 1</layout-item>
        <layout-item>Item 2</layout-item>
        <layout-item>Item 3</layout-item>
      </vaadin-horizontal-layout>
      <vaadin-radio-group
        label="Item sizing"
        @value-changed="${(e: RadioGroupValueChangedEvent) => (this.size = e.detail.value)}"
      >
        <vaadin-radio-button value="0" checked>Default size</vaadin-radio-button>
        <vaadin-radio-button value="1">Expand</vaadin-radio-button>
      </vaadin-radio-group>
    `;
  }
  // end::snippet[]
}
