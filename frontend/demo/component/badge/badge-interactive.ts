import { getPeople } from 'Frontend/demo/domain/DataService'; // hidden-source-line
import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/flow-frontend/comboBoxConnector'; // hidden-source-line
import '@vaadin/button';
import '@vaadin/combo-box';
import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/horizontal-layout';
import '@vaadin/vertical-layout';
import type { Button } from '@vaadin/button';
import type { ComboBoxChangeEvent } from '@vaadin/combo-box';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { applyTheme } from 'Frontend/generated/theme';

type Profession = string;

@customElement('badge-interactive')
export class Example extends LitElement {
  @state()
  private items: readonly Profession[] = [];

  @state()
  private selectedProfessions: readonly Profession[] = [];

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  protected override async firstUpdated() {
    const { people } = await getPeople();
    this.items = [...new Set(people.map(({ profession }) => profession))];
  }

  protected override render() {
    // tag::snippet[]
    return html`
      <vaadin-vertical-layout theme="spacing">
        <vaadin-combo-box
          label="Profession"
          .items="${this.items}"
          @change="${this.onChange}"
        ></vaadin-combo-box>
        <vaadin-horizontal-layout style="flex-wrap: wrap" theme="spacing">
          ${repeat(
            this.selectedProfessions,
            (profession) => profession,
            (profession) => html`
              <span theme="badge pill contrast">
                <span>${profession}</span>
                <vaadin-button
                  aria-label="Clear filter: ${profession}"
                  data-profession="${profession}"
                  theme="contrast tertiary-inline"
                  title="Clear filter: ${profession}"
                  style="margin-inline-start: var(--lumo-space-xs)"
                  @click="${this.onClick}"
                >
                  <vaadin-icon icon="vaadin:close-small"></vaadin-icon>
                </vaadin-button>
              </span>
            `
          )}
        </vaadin-horizontal-layout>
      </vaadin-vertical-layout>
    `;
    // end::snippet[]
  }

  private onChange(event: ComboBoxChangeEvent<Profession>) {
    const { selectedItem } = event.target;

    if (selectedItem == null) {
      return;
    }

    if (!this.selectedProfessions.includes(selectedItem)) {
      this.selectedProfessions = [...this.selectedProfessions, selectedItem];
    }
  }

  private onClick({ target }: Event) {
    const { profession } = (target as Button).dataset;

    if (profession) {
      this.selectedProfessions = this.selectedProfessions.filter((p) => p !== profession);
    }
  }
}
