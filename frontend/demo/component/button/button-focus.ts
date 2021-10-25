import 'Frontend/demo/init'; // hidden-source-line

import { customElement, html, LitElement } from 'lit-element';
import '@vaadin/vaadin-button/vaadin-button';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('button-focus')
export class Example extends LitElement {
    protected createRenderRoot() {
        const root = super.createRenderRoot();
        // Apply custom theme (only supported if your app uses one)
        applyTheme(root);
        return root;
    }

    render() {
        return html`
      <!-- tag::snippet[] -->
      <vaadin-button focus-ring>Keyboard focus</vaadin-button>
      <!-- end::snippet[] -->
    `;
    }
}
