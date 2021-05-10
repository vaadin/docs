import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement, customElement, css, internalProperty } from 'lit-element';
import { applyTheme } from 'Frontend/generated/theme';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';
import '@vaadin/vaadin-item';
import { RadioGroupValueChangedEvent } from '@vaadin/vaadin-radio-button/vaadin-radio-group';
import './layout-item';

@customElement('basic-layouts-vertical-layout-horizontal-alignment')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  static get styles() {
    return css`
      vaadin-vertical-layout {
        border: 1px solid var(--lumo-primary-color);
        border-radius: var(--lumo-border-radius-l);
      }
    `;
  }

  // tag::snippet[]
  @internalProperty()
  private alignItems?: string;

  render() {
    return html`
      <vaadin-vertical-layout theme="spacing padding" style="align-items: ${this.alignItems}">
        <layout-item>Item 1</layout-item>
        <layout-item>Item 2</layout-item>
        <layout-item>Item 3</layout-item>
      </vaadin-vertical-layout>
      <vaadin-radio-group
        label="Horizontal alignment"
        @value-changed="${(e: RadioGroupValueChangedEvent) => (this.alignItems = e.detail.value)}"
      >
        <vaadin-radio-button value="flex-start" checked>Start (default)</vaadin-radio-button>
        <vaadin-radio-button value="center">Center</vaadin-radio-button>
        <vaadin-radio-button value="flex-end">End</vaadin-radio-button>
        <vaadin-radio-button value="stretch">Stretch</vaadin-radio-button>
      </vaadin-radio-group>
    `;
  }
  // end::snippet[]
}
