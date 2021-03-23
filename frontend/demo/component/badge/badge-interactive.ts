import { getProfessions } from 'Frontend/demo/domain/DataService'; // hidden-full-source-line
import 'Frontend/demo/init'; // hidden-full-source-line
import Profession from 'Frontend/generated/com/vaadin/demo/domain/Profession'; // hidden-full-source-line

import '@vaadin/vaadin-button';
import '@vaadin/vaadin-combo-box';
import '@vaadin/vaadin-icons/vaadin-icons';
import '@vaadin/vaadin-lumo-styles/icons';
import type { ButtonElement } from '@vaadin/vaadin-button';
import type { ComboBoxElement } from '@vaadin/vaadin-combo-box';
import { html, LitElement, customElement, css, internalProperty } from 'lit-element';
import { applyTheme } from 'Frontend/generated/theme';
import { repeat } from 'lit-html/directives/repeat';

@customElement('badge-interactive')
export class Example extends LitElement {
  static styles = css`
    .container {
      display: flex;
      flex-direction: column;
    }

    .combobox {
      width: calc(var(--lumo-space-xl) * 5);
    }

    .badge {
      margin-right: var(--lumo-space-xs);
      margin-bottom: var(--lumo-space-xs);
    }

    .badge-btn {
      margin-left: var(--lumo-space-xs);
    }
  `;

  @internalProperty() private _items: readonly Profession[] = [];

  @internalProperty() private _selectedProfessions: readonly Profession[] = [];

  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  async firstUpdated() {
    this._items = await getProfessions();
  }

  render() {
    return html`
      <section class="container">
        <!-- tag::snippet[] -->
        <vaadin-combo-box
          class="combobox"
          label="Profession"
          .itemIdPath=${'id'}
          .itemLabelPath=${'name'}
          .itemValuePath=${'id'}
          .items="${this._items}"
          @change=${this._onChange}
        ></vaadin-combo-box>
        <div>
          ${repeat(
            this._selectedProfessions,
            ({ id }) => id,
            ({ id, name }) => html`
              <span class="badge" theme="badge contrast">
                ${name}
                <vaadin-button
                  class="badge-btn"
                  data-profession=${id}
                  title="Clear filter: ${name}"
                  aria-label="Clear filter: ${name}"
                  @click=${this._onClick}
                  theme="contrast tertiary-inline"
                >
                  <iron-icon icon="lumo:cross"></iron-icon>
                </vaadin-button>
              </span>
            `
          )}
        </div>
        <!-- end::snippet[] -->
      </section>
    `;
  }

  private _onChange({ target }: Event) {
    const { selectedItem } = target as ComboBoxElement;

    if (selectedItem == null) {
      return;
    }

    const changedProfession = this._items.find(({ id }) => id === (selectedItem as Profession).id);

    if (
      !this._selectedProfessions.find(({ id }) => id === (selectedItem as Profession).id) &&
      changedProfession
    ) {
      this._selectedProfessions = [...this._selectedProfessions, changedProfession];
    }
  }

  private _onClick({ target }: Event) {
    const { profession } = (target as ButtonElement).dataset;

    if (profession) {
      const professionId = parseInt(profession, 10);
      this._selectedProfessions = this._selectedProfessions.filter(({ id }) => id !== professionId);
    }
  }
}
