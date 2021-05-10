import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement, customElement, css, internalProperty } from 'lit-element';
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
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  static get styles() {
    return css`
      vaadin-vertical-layout {
        height: calc(var(--lumo-size-xl) * 5);
        align-items: stretch;
        border: 1px solid var(--lumo-primary-color);
        border-radius: var(--lumo-border-radius-l);
      }
    `;
  }

  // tag::snippet[]
  @internalProperty()
  private themeVariant!: string;

  render() {
    return html`
      <p>Spacing is enabled by applying one of five available spacing theme variants.</p>
      <vaadin-vertical-layout theme="${this.themeVariant} padding">
        <layout-item>Item 1</layout-item>
        <layout-item>Item 2</layout-item>
        <layout-item>Item 3</layout-item>
      </vaadin-vertical-layout>
      <vaadin-radio-group
        label="Vertical layout: spacing variants"
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
