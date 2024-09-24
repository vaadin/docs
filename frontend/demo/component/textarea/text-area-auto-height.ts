import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/text-area';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';
import templates from '../../../../src/main/resources/data/templates.json';

@customElement('text-area-auto-height')
export class Example extends LitElement {
  static override styles = css`
    vaadin-text-area {
      width: 100%;
    }
  `;

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-text-area label="Description" value="${templates.loremIpsum}"></vaadin-text-area>
      <!-- end::snippet[] -->
    `;
  }
}
