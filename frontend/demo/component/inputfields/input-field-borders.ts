import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/text-field';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('input-field-borders')
export class Example extends LitElement {
    static styles = css`
    * {
        --vaadin-input-field-border-width: 1px;
    }
    .custom-border {
        --vaadin-input-field-border-color: #14b900;
    }
    `;
    protected override createRenderRoot() {
        const root = super.createRenderRoot();
        // Apply custom theme (only supported if your app uses one)
        applyTheme(root);
        return root;
    }

    protected override render() {
        return html`
          <div style="display: flex; gap: 1em;">
            <!-- tag::snippet[] -->
              <vaadin-text-field label="Bordered field"></vaadin-text-field>
              <vaadin-text-field label="Bordered invalid field" invalid></vaadin-text-field>
              <vaadin-text-field label="Custom border color" class="custom-border"></vaadin-text-field>
            <!-- end::snippet[] -->
          </div>
    `;
    }
}
