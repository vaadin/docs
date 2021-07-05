import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';
import '@vaadin/vaadin-item';
import { RadioGroupValueChangedEvent } from '@vaadin/vaadin-radio-button/vaadin-radio-group';
import './layout-item';

@customElement('basic-layouts-spacing-variants')
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
  private themeVariant!: string;

  render() {
    return html`
      <vaadin-vertical-layout
        theme="${this.themeVariant} padding"
        class="height-5xl"
        style="align-items: stretch"
      >
        <layout-item>Item 1</layout-item>
        <layout-item>Item 2</layout-item>
        <layout-item>Item 3</layout-item>
      </vaadin-vertical-layout>
      <vaadin-radio-group
        label="Spacing variant"
        @value-changed="${(e: RadioGroupValueChangedEvent) => (this.themeVariant = e.detail.value)}"
      >
        <vaadin-radio-button value="spacing-xs" checked>spacing-xs</vaadin-radio-button>
        <vaadin-radio-button value="spacing-s" checked>spacing-s</vaadin-radio-button>
        <vaadin-radio-button value="spacing" checked>spacing</vaadin-radio-button>
        <vaadin-radio-button value="spacing-l" checked>spacing-l</vaadin-radio-button>
        <vaadin-radio-button value="spacing-xl" checked>spacing-xl</vaadin-radio-button>
      </vaadin-radio-group>
    `;
  }
  // end::snippet[]
}
