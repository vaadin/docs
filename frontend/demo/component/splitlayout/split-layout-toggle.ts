import 'Frontend/demo/init'; // hidden-source-line
import { customElement, html, internalProperty, LitElement } from 'lit-element';
import '@polymer/iron-icon';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-icons';
import '@vaadin/vaadin-split-layout/vaadin-split-layout';
import { applyTheme } from 'Frontend/generated/theme';
import './master-content';
import './detail-content';

@customElement('split-layout-toggle')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  // tag::snippet[]
  @internalProperty()
  private sidebarCollapsed = false;

  render() {
    const sidebarWidthPercentage = this.sidebarCollapsed ? 13 : 40;

    return html`
      <vaadin-split-layout style="max-height: 280px;">
        <div style="overflow: hidden; width: ${sidebarWidthPercentage}%">
          <vaadin-button
            theme="icon tertiary"
            aria-label="Expand/collapse sidebar"
            @click="${this.toggleSidebar}"
            style="float: right;"
          >
            <iron-icon
              icon="${this.sidebarCollapsed ? 'vaadin:arrow-right' : 'vaadin:arrow-left'}"
            ></iron-icon>
          </vaadin-button>
          <master-content></master-content>
        </div>
        <detail-content style="width: ${100 - sidebarWidthPercentage}%"></detail-content>
      </vaadin-split-layout>
    `;
  }

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
  // end::snippet[]
}
