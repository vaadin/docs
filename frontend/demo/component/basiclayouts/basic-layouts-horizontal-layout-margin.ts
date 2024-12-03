import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/button';
import '@vaadin/horizontal-layout';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('basic-layouts-horizontal-layout-margin')
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
      <p>Horizontal layout without margin:</p>
      <div class="container">
        <vaadin-horizontal-layout theme="spacing padding">
          <vaadin-button>Button 1</vaadin-button>
          <vaadin-button>Button 2</vaadin-button>
          <vaadin-button>Button 3</vaadin-button>
        </vaadin-horizontal-layout>
      </div>

      <p>Horizontal layout with margin:</p>
      <div class="container">
        <!-- tag::snippet[] -->
        <vaadin-horizontal-layout theme="margin spacing padding">
          <!-- end::snippet[] -->
          <vaadin-button>Button 1</vaadin-button>
          <vaadin-button>Button 2</vaadin-button>
          <vaadin-button>Button 3</vaadin-button>
          <!-- tag::snippet[] -->
        </vaadin-horizontal-layout>
        <!-- end::snippet[] -->
      </div>
    `;
  }
}
