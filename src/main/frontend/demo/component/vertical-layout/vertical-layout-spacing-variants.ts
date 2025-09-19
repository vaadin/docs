import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/radio-group';
import '@vaadin/vertical-layout';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { RadioGroupValueChangedEvent } from '@vaadin/radio-group';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('vertical-layout-spacing-variants')
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
      <vaadin-vertical-layout
        theme="${this.themeVariant} padding"
        class="height-4xl"
        style="align-items: stretch"
      >
        <div class="example-item">Item 1</div>
        <div class="example-item">Item 2</div>
        <div class="example-item">Item 3</div>
      </vaadin-vertical-layout>
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
