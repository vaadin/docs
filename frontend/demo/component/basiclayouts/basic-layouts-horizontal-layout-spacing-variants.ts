import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';
import '@vaadin/button';
import '@vaadin/radio-group';
import type { RadioGroupValueChangedEvent } from '@vaadin/radio-group';
import '@vaadin/horizontal-layout';

@customElement('basic-layouts-spacing-variants')
export class Example extends LitElement {
  connectedCallback() {
    super.connectedCallback();
    this.classList.add('basic-layouts-example');
  }

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  @state()
  private themeVariant = 'spacing-xl';

  protected override render() {
    return html`
      <vaadin-horizontal-layout theme="${this.themeVariant} padding" style="align-items: stretch">
        <vaadin-button>Button 1</vaadin-button>
        <vaadin-button>Button 2</vaadin-button>
        <vaadin-button>Button 3</vaadin-button>
      </vaadin-horizontal-layout>
      <vaadin-radio-group
        label="Spacing variant"
        .value="${this.themeVariant}"
        @value-changed="${(event: RadioGroupValueChangedEvent) => {
          this.themeVariant = event.detail.value;
        }}"
      >
        <vaadin-radio-button value="spacing-xs" label="spacing-xs"></vaadin-radio-button>
        <vaadin-radio-button value="spacing-s" label="spacing-s"></vaadin-radio-button>
        <vaadin-radio-button value="spacing" label="spacing"></vaadin-radio-button>
        <vaadin-radio-button value="spacing-l" label="spacing-l"></vaadin-radio-button>
        <vaadin-radio-button value="spacing-xl" label="spacing-xl"></vaadin-radio-button>
      </vaadin-radio-group>
    `;
  }
  // end::snippet[]
}
