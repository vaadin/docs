import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/vaadin-icon/vaadin-icon';
import '@vaadin/vaadin-icons/vaadin-iconset';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-split-layout/vaadin-split-layout';
import { applyTheme } from 'Frontend/generated/theme';
import './master-content';
import './detail-content';

@customElement('split-layout-toggle')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  @state()
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
            <vaadin-icon
              icon="${this.sidebarCollapsed ? 'vaadin:arrow-right' : 'vaadin:arrow-left'}"
            ></vaadin-icon>
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
