import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/button';
import '@vaadin/icon';
import '@vaadin/popover';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset.js';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('notification-popup')
export class Example extends LitElement {
  static override styles = [
    css`
      span[theme~='badge'] {
        position: absolute;
        transform: translate(-40%, -30%);
      }
    `,
  ];

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  protected override render() {
    return html`
      <vaadin-button id="target" aria-label="notifications" theme="tertiary icon">
        <vaadin-icon icon="lumo:bell"></vaadin-icon>
        <span theme="badge error primary small pill">4</span>
      </vaadin-button>
      <vaadin-popover for="target">
        <div>Show notifications here</div>
      </vaadin-popover>
    `;
  }
  // end::snippet[]
}
