import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/button';
import '@vaadin/horizontal-layout';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('basic-layouts-horizontal-layout-wrapping')
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

  protected override render() {
    return html`
      <p>Horizontal layout without wrapping:</p>
      <vaadin-horizontal-layout theme="spacing margin padding" style="width: 350px;">
        <vaadin-button>Button 1</vaadin-button>
        <vaadin-button>Button 2</vaadin-button>
        <vaadin-button>Button 3</vaadin-button>
        <vaadin-button>Button 4</vaadin-button>
        <vaadin-button>Button 5</vaadin-button>
      </vaadin-horizontal-layout>

      <p>Horizontal layout with wrapping:</p>
      <!-- tag::snippet[] -->
      <vaadin-horizontal-layout theme="wrap spacing margin padding" style="width: 350px;">
        <!-- end::snippet[] -->
        <vaadin-button>Button 1</vaadin-button>
        <vaadin-button>Button 2</vaadin-button>
        <vaadin-button>Button 3</vaadin-button>
        <vaadin-button>Button 4</vaadin-button>
        <vaadin-button>Button 5</vaadin-button>
        <!-- tag::snippet[] -->
      </vaadin-horizontal-layout>
      <!-- end::snippet[] -->
    `;
  }
}
