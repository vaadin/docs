import 'Frontend/demo/init'; // hidden-source-line

import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/vaadin-ordered-layout/vaadin-scroller';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-text-field/vaadin-text-area';
import '@vaadin/vaadin-date-picker/vaadin-date-picker';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-icon/vaadin-icon';
import '@vaadin/vaadin-icons/vaadin-iconset';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('scroller-basic')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  static get styles() {
    return css`
      #container {
        align-items: stretch;
        border: 1px solid var(--lumo-contrast-20pct);
        max-width: 100%;
        height: 400px;
        width: 360px;
      }

      header {
        align-items: center;
        display: flex;
        border-bottom: 1px solid var(--lumo-contrast-20pct);
        padding: var(--lumo-space-m);
      }

      header h2 {
        margin: 0;
      }

      header vaadin-icon {
        box-sizing: border-box;
        height: var(--lumo-icon-size-m);
        margin-right: var(--lumo-space-m);
        padding: calc(var(--lumo-space-xs) / 2);
        width: var(--lumo-icon-size-m);
      }

      footer {
        padding: var(--lumo-space-wide-m);
      }

      footer vaadin-button:first-child {
        margin-right: var(--lumo-space-s);
      }
    `;
  }

  render() {
    return html`
      <vaadin-vertical-layout id="container">
        <header>
          <a href="#" aria-label="Go back">
            <vaadin-icon icon="vaadin:arrow-left" aria-hidden="true"></vaadin-icon>
          </a>
          <h2>Edit employee</h2>
        </header>

        <!-- tag::snippet[] -->
        <vaadin-scroller
          scroll-direction="vertical"
          style="border-bottom: 1px solid var(--lumo-contrast-20pct); padding: var(--lumo-space-m);"
        >
          <section aria-labelledby="personal-title">
            <h3 id="personal-title">Personal information</h3>
            <vaadin-text-field style="width: 100%;" label="First name"></vaadin-text-field>
            <vaadin-text-field style="width: 100%;" label="Last name"></vaadin-text-field>
            <vaadin-date-picker
              initial-position="1990-01-01"
              label="Birthdate"
              style="width: 100%;"
            ></vaadin-date-picker>
          </section>
          <section aria-labelledby="employment-title">
            <h3 id="employment-title">Employment information</h3>
            <vaadin-text-field style="width: 100%;" label="Position"></vaadin-text-field>
            <vaadin-text-area
              style="width: 100%;"
              label="Additional information"
            ></vaadin-text-area>
          </section>
        </vaadin-scroller>
        <!-- end::snippet[] -->

        <footer>
          <vaadin-button theme="primary">Save</vaadin-button>
          <vaadin-button theme="tertiary">Reset</vaadin-button>
        </footer>
      </vaadin-vertical-layout>
    `;
  }
}
