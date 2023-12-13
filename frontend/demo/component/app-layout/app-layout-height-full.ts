import 'Frontend/demo/init'; // hidden-source-line
import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/app-layout';
import '@vaadin/grid';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('app-layout-height-full')
export class Example extends LitElement {
  static override styles = css`
    :host {
      height: 100vh;
    }

    h1 {
      font-size: var(--lumo-font-size-l);
      margin: var(--lumo-space-m);
    }
  `;

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private items: Person[] = [];

  protected override async firstUpdated() {
    const { people } = await getPeople();
    this.items = people;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-app-layout style="height: 100%;">
        <h1 slot="navbar">MyApp</h1>
        <vaadin-grid .items="${this.items}" style="height: 100%;" theme="no-border">
          <vaadin-grid-column path="firstName"></vaadin-grid-column>
          <vaadin-grid-column path="lastName"></vaadin-grid-column>
          <vaadin-grid-column path="email"></vaadin-grid-column>
          <vaadin-grid-column path="profession"></vaadin-grid-column>
        </vaadin-grid>
      </vaadin-app-layout>
      <!-- end::snippet[] -->
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    // TODO: workaround to remove the padding from parent container (coming from Design System Publisher)
    if (this.parentElement) this.parentElement.style.padding = '0';
  }
}
