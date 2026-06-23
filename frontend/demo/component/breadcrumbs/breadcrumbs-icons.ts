import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/breadcrumbs';
import '@vaadin/icon';
import '@vaadin/icons';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { patchBreadcrumbsNavigation } from 'Frontend/demo/component/breadcrumbs/breadcrumbs-helper'; // hidden-source-line
import { applyTheme } from 'Frontend/demo/theme';

@customElement('breadcrumbs-icons')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  /* prettier-ignore */ protected firstUpdated() { // hidden-source-line
    patchBreadcrumbsNavigation(this.shadowRoot!.querySelector('vaadin-breadcrumbs')!); // hidden-source-line
  } // hidden-source-line

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-breadcrumbs>
        <vaadin-breadcrumbs-item path="/">
          <vaadin-icon icon="vaadin:home" slot="prefix"></vaadin-icon>
          Home
        </vaadin-breadcrumbs-item>
        <vaadin-breadcrumbs-item path="/orders">
          <vaadin-icon icon="vaadin:package" slot="prefix"></vaadin-icon>
          Orders
        </vaadin-breadcrumbs-item>
        <vaadin-breadcrumbs-item>Order Details</vaadin-breadcrumbs-item>
      </vaadin-breadcrumbs>
      <!-- end::snippet[] -->
    `;
  }
}
