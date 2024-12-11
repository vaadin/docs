import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/button';
import '@vaadin/vertical-layout';
import '@vaadin/horizontal-layout';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('basic-layouts-vertical-layout-wrapping')
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
      <vaadin-horizontal-layout theme="margin spacing" style="border: 0;">
        <div style="width: 100%;">
          <p>Vertical layout without wrapping:</p>
          <vaadin-vertical-layout
            theme="spacing padding"
            style="align-items: stretch; height: 200px;"
          >
            <vaadin-button>Button 1</vaadin-button>
            <vaadin-button>Button 2</vaadin-button>
            <vaadin-button>Button 3</vaadin-button>
            <vaadin-button>Button 4</vaadin-button>
          </vaadin-vertical-layout>
        </div>
        <div style="width: 100%;">
          <p>Vertical layout with wrapping:</p>
          <!-- tag::snippet[] -->
          <vaadin-vertical-layout
            theme="wrap spacing padding"
            style="align-items: stretch; height: 200px;"
          >
            <!-- end::snippet[] -->
            <vaadin-button>Button 1</vaadin-button>
            <vaadin-button>Button 2</vaadin-button>
            <vaadin-button>Button 3</vaadin-button>
            <vaadin-button>Button 4</vaadin-button>
            <!-- tag::snippet[] -->
          </vaadin-vertical-layout>
          <!-- end::snippet[] -->
        </div>
      </vaadin-horizontal-layout>
    `;
  }
}
