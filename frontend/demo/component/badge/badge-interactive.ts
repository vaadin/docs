import { getProfessions } from 'Frontend/demo/domain/DataService'; // hidden-full-source-line
import 'Frontend/demo/init'; // hidden-full-source-line
import './init'; // hidden-full-source-line

import { ButtonElement } from '@vaadin/vaadin-button';
import { ComboBoxElement } from '@vaadin/vaadin-combo-box';
import { html, LitElement, customElement, css, internalProperty } from 'lit-element';
import '@vaadin/vaadin-checkbox/vaadin-checkbox';
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

  @internalProperty() private _items: readonly string[] = [];

  @internalProperty() private _selectedProfessions: readonly string[] = [];

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
          .itemLabelPath="name"
          .itemValuePath="id"
          .items="${this._items}"
          @change=${this._onChange}
        ></vaadin-combo-box>
        <div>
          ${repeat(
            this._selectedProfessions,
            (prof) => prof,
            (prof) => html`
              <span class="badge" theme="badge contrast">
                ${prof}
                <vaadin-button
                  class="badge-btn"
                  data-prof=${prof}
                  title="Clear filter: ${prof}"
                  aria-label="Clear filter: ${prof}"
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
    const { value } = target as ComboBoxElement;

    if (!this._selectedProfessions.includes(value)) {
      this._selectedProfessions = [...this._selectedProfessions, value];
    }
  }

  private _onClick({ target }: Event) {
    const { prof } = (target as ButtonElement).dataset;
    this._selectedProfessions = this._selectedProfessions.filter((p) => p !== prof);
  }
}
