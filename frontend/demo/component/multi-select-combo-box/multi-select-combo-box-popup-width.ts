import 'Frontend/demo/init'; // hidden-source-line

import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/multi-select-combo-box';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('multi-select-combo-box-popup-width')
export class Example extends LitElement {
  static get styles() {
    return css`
      vaadin-multi-select-combo-box {
        width: 300px;
      }
    `;
  }

  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private items: Person[] = [];

  async firstUpdated() {
    this.items = (await getPeople()).people.map((person) => {
      return {
        ...person,
        displayName: `${person.profession} - ${person.firstName} ${person.lastName}`,
      };
    });
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-multi-select-combo-box
        style="--vaadin-multi-select-combo-box-overlay-width: 350px"
        label="Employee"
        item-label-path="displayName"
        item-value-path="id"
        .items="${this.items}"
      ></vaadin-multi-select-combo-box>
      <!-- end::snippet[] -->
    `;
  }
}
