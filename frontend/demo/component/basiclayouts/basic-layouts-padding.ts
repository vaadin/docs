import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement, customElement, css, internalProperty } from 'lit-element';
import { applyTheme } from 'Frontend/generated/theme';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';
import '@vaadin/vaadin-item';
import { RadioGroupValueChangedEvent } from '@vaadin/vaadin-radio-button/vaadin-radio-group';
import './layout-item';

@customElement('basic-layouts-padding')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  static get styles() {
    return css`
      vaadin-vertical-layout {
        height: calc(var(--lumo-size-xl) * 4);
        align-items: stretch;
        border: 1px solid var(--lumo-primary-color);
        border-radius: var(--lumo-border-radius-l);
      }
    `;
  }

  // tag::snippet[]
  @internalProperty()
  private theme!: string;

  render() {
    return html`
      <vaadin-vertical-layout theme="${this.theme} spacing">
        <layout-item>Item 1</layout-item>
        <layout-item>Item 2</layout-item>
        <layout-item>Item 3</layout-item>
      </vaadin-vertical-layout>
      <vaadin-radio-group
        label="Vertical layout: padding"
        @value-changed="${(e: RadioGroupValueChangedEvent) => (this.theme = e.detail.value)}"
      >
        <vaadin-radio-button value="padding" checked>Enabled</vaadin-radio-button>
        <vaadin-radio-button value="">Disabled</vaadin-radio-button>
      </vaadin-radio-group>
      <p>Padding is applied using the padding theme variant.</p>
    `;
  }
  // end::snippet[]
}
