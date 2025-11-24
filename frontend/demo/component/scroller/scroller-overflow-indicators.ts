import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/button';
import '@vaadin/checkbox';
import '@vaadin/email-field';
import '@vaadin/scroller';
import '@vaadin/text-field';
import '@vaadin/vertical-layout';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('scroller-overflow-indicators')
export class Example extends LitElement {
  static override styles = css`
    #container {
      align-items: stretch;
      border: 1px solid var(--vaadin-border-color);
      max-width: 100%;
      height: 400px;
      width: 360px;
    }
  `;

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <vaadin-vertical-layout id="container">
        <h2 style="padding: 1rem; font-size: 1.375rem">Create your account</h2>
        <!-- tag::snippet[] -->
        <vaadin-scroller scroll-direction="vertical" theme="overflow-indicators">
          <div style="display: flex; flex-direction: column; padding: 0 1rem 1rem">
            <vaadin-text-field label="First name"></vaadin-text-field>
            <vaadin-text-field label="Last name"></vaadin-text-field>
            <vaadin-email-field label="Email"></vaadin-email-field>
            <vaadin-text-field label="Phone number"></vaadin-text-field>
            <vaadin-text-field label="Address"></vaadin-text-field>
            <vaadin-text-field label="City"></vaadin-text-field>
            <vaadin-combo-box label="State"></vaadin-combo-box>
            <vaadin-text-field label="Zip code"></vaadin-text-field>
            <vaadin-combo-box label="Country"></vaadin-combo-box>
            <vaadin-checkbox label="Agree to terms and conditions"></vaadin-checkbox>
          </div>
        </vaadin-scroller>
        <!-- end::snippet[] -->
        <footer style="display: flex; gap: 0.5rem; padding: 0.5rem 1rem">
          <vaadin-button theme="primary">Next</vaadin-button>
          <vaadin-button theme="tertiary">Cancel</vaadin-button>
        </footer>
      </vaadin-vertical-layout>
    `;
  }
}
