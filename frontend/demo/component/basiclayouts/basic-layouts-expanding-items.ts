import 'Frontend/demo/init'; // hidden-source-line
import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';
import '@vaadin/vaadin-item';
import { RadioGroupValueChangedEvent } from '@vaadin/vaadin-radio-button/vaadin-radio-group';
import './layout-item';

@customElement('basic-layouts-expanding-items')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  static get styles() {
    return css`
      vaadin-horizontal-layout {
        border: 1px solid var(--lumo-primary-color);
        border-radius: var(--lumo-border-radius-l);
      }
    `;
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
        label="Item 1: sizing"
        @value-changed="${(e: RadioGroupValueChangedEvent) => (this.size = e.detail.value)}"
      >
        <vaadin-radio-button value="0" checked>Default size</vaadin-radio-button>
        <vaadin-radio-button value="1">Expand</vaadin-radio-button>
      </vaadin-radio-group>
    `;
  }
  // end::snippet[]
}
