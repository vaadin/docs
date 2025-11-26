import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/button';
import '@vaadin/date-picker';
import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/scroller';
import '@vaadin/text-area';
import '@vaadin/text-field';
import '@vaadin/vertical-layout';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('scroller-basic')
export class Example extends LitElement {
  static override styles = css`
    #container {
      align-items: stretch;
      border: 1px solid var(--vaadin-border-color);
      max-width: 100%;
      height: 400px;
      width: 360px;
    }

    header {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      border-bottom: solid 1px var(--vaadin-border-color);
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
        <header>
          <a href="#" aria-label="Go back">
            <vaadin-icon
              icon="vaadin:arrow-left"
              style="padding: 0.25rem"
              aria-hidden="true"
            ></vaadin-icon>
          </a>
          <h2 style="font-size: 1.375rem">Edit employee</h2>
        </header>

        <!-- tag::snippet[] -->
        <vaadin-scroller
          style="border-bottom: solid 1px var(--vaadin-border-color); padding: 1rem"
          scroll-direction="vertical"
        >
          <section aria-labelledby="personal-title">
            <h3 id="personal-title" style="font-size: 1.125rem">Personal information</h3>
            <vaadin-text-field style="width: 100%" label="First name"></vaadin-text-field>
            <vaadin-text-field style="width: 100%" label="Last name"></vaadin-text-field>
            <vaadin-date-picker
              style="width: 100%"
              initial-position="1990-01-01"
              label="Birthdate"
            ></vaadin-date-picker>
          </section>
          <section aria-labelledby="employment-title">
            <h3 id="employment-title" style="font-size: 1.125rem; margin-top: 1.5rem">
              Employment information
            </h3>
            <vaadin-text-field style="width: 100%" label="Position"></vaadin-text-field>
            <vaadin-text-area style="width: 100%" label="Additional information"></vaadin-text-area>
          </section>
        </vaadin-scroller>
        <!-- end::snippet[] -->

        <footer style="display: flex; gap: 0.5rem; padding: 0.5rem 1rem">
          <vaadin-button theme="primary">Save</vaadin-button>
          <vaadin-button theme="tertiary">Reset</vaadin-button>
        </footer>
      </vaadin-vertical-layout>
    `;
  }
}
