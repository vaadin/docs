import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-ordered-layout/vaadin-scroller';
import '@vaadin/vaadin-form-layout/vaadin-form-layout';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-text-field/vaadin-text-area';
import '@vaadin/vaadin-date-picker/vaadin-date-picker';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-icons/vaadin-icons';
import '@vaadin/vaadin-lumo-styles/icons';
import * as img from '../../../../src/main/resources/images/reindeer.jpg';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('scroller-basic')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-scroller style="height: 300px; width: 100%;">
        <img src="${img}" alt="A reindeer walking on a snowy lake shore at dusk" />
      </vaadin-scroller>
      <!-- end::snippet[] -->
    `;
  }
}
