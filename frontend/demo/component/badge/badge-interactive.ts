import { getPeople } from 'Frontend/demo/domain/DataService'; // hidden-source-line
import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-combo-box/vaadin-combo-box';
import '@vaadin/vaadin-icon/vaadin-icon';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import type { ButtonElement } from '@vaadin/vaadin-button';
import type { ComboBoxElement } from '@vaadin/vaadin-combo-box';
import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { applyTheme } from 'Frontend/generated/theme';

type Profession = string;

@customElement('badge-interactive')
export class Example extends LitElement {
  static get styles() {
    return css`
      .professions {
        display: flex;
        flex-wrap: wrap;
      }

      .professions > span {
        margin-inline-end: var(--lumo-space-m);
        margin-block-end: var(--lumo-space-m);
      }

      .professions vaadin-button {
        margin-inline-start: var(--lumo-space-s);
      }
    `;
  }

  @state()
  private items: readonly Profession[] = [];

  @state()
  private selectedProfessions: readonly Profession[] = [];

  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  async firstUpdated() {
    const { people } = await getPeople();
    this.items = [...new Set(people.map(({ profession }) => profession))];
  }

  render() {
    // tag::snippet[]
    return html`
      <vaadin-vertical-layout theme="spacing">
        <vaadin-combo-box
          label="Profession"
          .items="${this.items}"
          @change="${this.onChange}"
        ></vaadin-combo-box>
        <div class="professions">
          ${repeat(
            this.selectedProfessions,
            (profession) => profession,
            (profession) => html`
              <span theme="badge pill contrast">
                <span>${profession}</span>
                <vaadin-button
                  class="badge-btn"
                  data-profession="${profession}"
                  title="Clear filter: ${profession}"
                  aria-label="Clear filter: ${profession}"
                  @click="${this.onClick}"
                  theme="contrast tertiary-inline"
                >
                  <vaadin-icon icon="lumo:cross"></vaadin-icon>
                </vaadin-button>
              </span>
            `
          )}
        </vaadin-horizontal-layout>
      </vaadin-vertical-layout>
    `;
    // end::snippet[]
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
