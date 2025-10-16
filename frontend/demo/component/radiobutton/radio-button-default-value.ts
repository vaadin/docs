import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/radio-group';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('radio-button-default-value')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-radio-group label="Repeat" theme="vertical">
        <vaadin-radio-button value="none" label="None" checked></vaadin-radio-button>
        <vaadin-radio-button value="daily" label="Daily"></vaadin-radio-button>
        <vaadin-radio-button value="weekly" label="Weekly"></vaadin-radio-button>
        <vaadin-radio-button value="monthly" label="Monthly"></vaadin-radio-button>
      </vaadin-radio-group>
      <!-- end::snippet[] -->
    `;
  }
}
