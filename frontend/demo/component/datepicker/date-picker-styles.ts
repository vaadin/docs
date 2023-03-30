import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/date-picker';
import dateFnsFormat from 'date-fns/format';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('date-picker-styles')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
        <!-- tag::snippet[] -->
        <vaadin-date-picker theme="align-right small helper-above-field"
          label="Label" helper-text="Helper text" value="${dateFnsFormat(new Date(), 'yyyy-MM-dd')}">
        </vaadin-date-picker>
        <!-- end::snippet[] -->
    `;
  }
}
