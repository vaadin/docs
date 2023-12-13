import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';
import '@vaadin/button';
import '@vaadin/radio-group';
import type { RadioGroupValueChangedEvent } from '@vaadin/radio-group';
import '@vaadin/horizontal-layout';

@customElement('basic-layouts-spacing')
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
  private theme = 'spacing';

  protected override render() {
    return html`
      <vaadin-horizontal-layout theme="${this.theme} padding" style="align-items: stretch">
        <vaadin-button>Button 1</vaadin-button>
        <vaadin-button>Button 2</vaadin-button>
        <vaadin-button>Button 3</vaadin-button>
      </vaadin-horizontal-layout>
      <vaadin-radio-group
        label="Spacing"
        .value="${this.theme}"
        @value-changed="${(event: RadioGroupValueChangedEvent) => {
          this.theme = event.detail.value;
        }}"
      >
        <vaadin-radio-button value="spacing" label="Enabled"></vaadin-radio-button>
        <vaadin-radio-button value="" label="Disabled"></vaadin-radio-button>
      </vaadin-radio-group>
    `;
  }
  // end::snippet[]
}
