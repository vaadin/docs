import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-full-source-line (Grid's connector)

import { customElement, LitElement, property } from 'lit-element';
import '@vaadin/vaadin-grid/vaadin-grid';
import type { GridItemModel } from '@vaadin/vaadin-grid/vaadin-grid';
import { getPeople } from '../../domain/DataService';
import { render, html } from 'lit-html';
import { Person } from '../../domain/Person';

// tag::snippet[]
@customElement('grid-basic')
export class GridBasic extends LitElement {
  @property({ type: Array }) items = getPeople();

  render() {
    return html`
      <vaadin-grid .items=${this.items}>
        <vaadin-grid-column
          header="Image"
          .renderer=${this.avatarRenderer}
          flex-grow="0"
          auto-width
        ></vaadin-grid-column>
        <vaadin-grid-column path="firstName"></vaadin-grid-column>
        <vaadin-grid-column path="lastName"></vaadin-grid-column>
        <vaadin-grid-column path="email"></vaadin-grid-column>
      </vaadin-grid>
    `;
  }

  avatarRenderer(root: HTMLElement, _: HTMLElement, model: GridItemModel) {
    render(
      html`
        <img style="height: 40px" src=${(model.item as Person).pictureUrl} alt="User avatar" />
      `,
      root
    );
  }
}
// end::snippet[]
