import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/flow-frontend/selectConnector.js'; // hidden-source-line

import { html, LitElement, customElement } from 'lit-element';
import { render } from 'lit-html';
import { guard } from 'lit-html/directives/guard';
import '@vaadin/vaadin-select/vaadin-select';
import '@vaadin/vaadin-list-box/vaadin-list-box';
import '@vaadin/vaadin-item/vaadin-item';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('select-basic')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-select
        value="recent"
        label="Sort by"
        .renderer="${guard(
          [],
          () => (root: HTMLElement) =>
            render(
              html`
                <vaadin-list-box>
                  <vaadin-item value="recent">Most recent first</vaadin-item>
                  <vaadin-item value="rating-desc">Rating: high to low</vaadin-item>
                  <vaadin-item value="rating-asc">Rating: low to high</vaadin-item>
                  <vaadin-item value="price-desc">Price: high to low</vaadin-item>
                  <vaadin-item value="price-asc">Price: low to high</vaadin-item>
                </vaadin-list-box>
              `,
              root
            )
        )}"
      ></vaadin-select>
      <!-- end::snippet[] -->
    `;
  }
}
