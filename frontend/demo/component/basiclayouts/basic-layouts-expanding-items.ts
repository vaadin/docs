import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';
import '@vaadin/button';
import '@vaadin/horizontal-layout';
import '@vaadin/radio-group';
import type { RadioGroupValueChangedEvent } from '@vaadin/radio-group';

@customElement('basic-layouts-expanding-items')
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
  private size = '0';

  protected override render() {
    return html`
      <vaadin-horizontal-layout theme="padding spacing">
        <vaadin-button style="flex-grow: ${this.size}">Button 1</vaadin-button>
        <vaadin-button>Button 2</vaadin-button>
        <vaadin-button>Button 3</vaadin-button>
      </vaadin-horizontal-layout>
      <vaadin-radio-group
        label="Item sizing"
        .value="${this.size}"
        @value-changed="${(event: RadioGroupValueChangedEvent) => {
          this.size = event.detail.value;
        }}"
      >
        <vaadin-radio-button value="0" label="Default size"></vaadin-radio-button>
        <vaadin-radio-button value="1" label="Expand"></vaadin-radio-button>
      </vaadin-radio-group>
    `;
  }
  // end::snippet[]
}
