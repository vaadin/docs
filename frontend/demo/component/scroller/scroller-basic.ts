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
      <vaadin-vertical-layout class="border border-contrast-20 items-stretch max-w-full" id="container">
        <header class="flex gap-m items-center border-b p-m">
          <a href="#" aria-label="Go back">
            <vaadin-icon
              class="box-border icon-m p-xs"
              icon="vaadin:arrow-left"
              aria-hidden="true"
            ></vaadin-icon>
          </a>
          <h2 class="text-xl">Edit employee</h2>
        </header>

        <!-- tag::snippet[] -->
        <vaadin-scroller class="border-b p-m" scroll-direction="vertical">
          <section aria-labelledby="personal-title">
            <h3 class="text-l" id="personal-title">Personal information</h3>
            <vaadin-text-field class="w-full" label="First name"></vaadin-text-field>
            <vaadin-text-field class="w-full" label="Last name"></vaadin-text-field>
            <vaadin-date-picker
              class="w-full"
              initial-position="1990-01-01"
              label="Birthdate"
            ></vaadin-date-picker>
          </section>
          <section aria-labelledby="employment-title">
            <h3 class="mt-l text-l" id="employment-title">Employment information</h3>
            <vaadin-text-field class="w-full" label="Position"></vaadin-text-field>
            <vaadin-text-area class="w-full" label="Additional information"></vaadin-text-area>
          </section>
        </vaadin-scroller>
        <!-- end::snippet[] -->

        <footer class="flex gap-s px-m py-s">
          <vaadin-button theme="primary">Save</vaadin-button>
          <vaadin-button theme="tertiary">Reset</vaadin-button>
        </footer>
      </vaadin-vertical-layout>
    `;
  }
}
