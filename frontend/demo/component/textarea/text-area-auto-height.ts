import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, customElement, css } from 'lit-element';
import { loremIpsum } from '../../../../src/main/resources/data/templates.json';
import '@vaadin/vaadin-text-field/vaadin-text-area';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('text-area-auto-height')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  static get styles() {
    return css`
      vaadin-text-area {
        width: 100%;
      }
    `;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-text-area label="Description" value="${loremIpsum}"></vaadin-text-area>
      <!-- end::snippet[] -->
    `;
  }
}
