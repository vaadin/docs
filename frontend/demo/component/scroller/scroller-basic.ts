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
import { applyTheme } from 'Frontend/generated/theme';

@customElement('scroller-basic')
export class Example extends LitElement {
  static override styles = css`
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

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  protected override render() {
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
