import '@vaadin/stepper';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('stepper-navigation')
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
      <vaadin-stepper>
        <vaadin-step label="Account setup" href="#/account" state="completed"> </vaadin-step>
        <vaadin-step label="Profile information" href="#/profile" state="active"> </vaadin-step>
        <vaadin-step label="Preferences" href="#/preferences"> </vaadin-step>
        <vaadin-step label="Review" href="#/review"> </vaadin-step>
      </vaadin-stepper>
      <!-- end::snippet[] -->
    `;
  }
}
