import { getPeople } from 'Frontend/demo/domain/DataService'; // hidden-full-source-line
import 'Frontend/demo/init';

import '@vaadin/vaadin-button';
import '@vaadin/vaadin-combo-box';
import '@vaadin/vaadin-icons/vaadin-icons';
import '@vaadin/vaadin-lumo-styles/icons';
import '@vaadin/vaadin-ordered-layout';
import type { ButtonElement } from '@vaadin/vaadin-button';
import type { ComboBoxElement } from '@vaadin/vaadin-combo-box';
import { html, LitElement, customElement, internalProperty } from 'lit-element';
import { applyTheme } from 'Frontend/generated/theme';
import { repeat } from 'lit-html/directives/repeat';

type Profession = string;

@customElement('badge-interactive')
export class Example extends LitElement {
  @internalProperty()
  private items: readonly Profession[] = [];

  @internalProperty()
  private selectedProfessions: readonly Profession[] = [];

  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  async firstUpdated() {
    const { people } = await getPeople();
    this.items = [...new Set(people.map(({ profession }) => profession))];
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-vertical-layout theme="spacing">
        <vaadin-combo-box
          label="Profession"
          .items="${this.items}"
          @change=${this.onChange}
        ></vaadin-combo-box>
        <vaadin-horizontal-layout theme="spacing">
          ${repeat(
            this.selectedProfessions,
            (profession) => profession,
            (profession) => html`
              <span class="badge" theme="badge contrast">
                <span>${profession}</span>
                <vaadin-button
                  class="badge-btn"
                  data-profession=${profession}
                  title="Clear filter: ${profession}"
                  aria-label="Clear filter: ${profession}"
                  @click=${this.onClick}
                  theme="contrast tertiary-inline"
                >
                  <iron-icon icon="lumo:cross"></iron-icon>
                </vaadin-button>
              </span>
            `
          )}
        </vaadin-horizontal-layout>
      </vaadin-vertical-layout>
      <!-- end::snippet[] -->
    `;
  }

  private onChange({ target }: Event) {
    const { selectedItem } = target as ComboBoxElement;

    if (selectedItem == null) {
      return;
    }

    if (!this.selectedProfessions.includes(selectedItem as Profession)) {
      this.selectedProfessions = [...this.selectedProfessions, selectedItem as Profession];
    }
  }

  private onClick({ target }: Event) {
    const { profession } = (target as ButtonElement).dataset;

    if (profession) {
      this.selectedProfessions = this.selectedProfessions.filter((p) => p !== profession);
    }
  }
}
