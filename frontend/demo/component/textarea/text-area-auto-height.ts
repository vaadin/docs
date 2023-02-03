import 'Frontend/demo/init'; // hidden-source-line

import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/text-area';
import { loremIpsum } from '../../../../src/main/resources/data/templates.json';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('text-area-auto-height')
export class Example extends LitElement {
  static styles = css`
    vaadin-text-area {
      width: 100%;
    }
  `;

  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-text-area label="Description" value="${loremIpsum}"></vaadin-text-area>
      <!-- end::snippet[] -->
    `;
  }
}
