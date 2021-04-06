import 'Frontend/demo/init'; // hidden-full-source-line
import { customElement, html, internalProperty, LitElement, query } from 'lit-element';
import '@polymer/iron-icon';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-icons';
import '@vaadin/vaadin-split-layout/vaadin-split-layout';
import type { SplitLayoutElement } from '@vaadin/vaadin-split-layout/vaadin-split-layout';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('split-layout-toggle')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  firstUpdated() {
    this.updateSplitterPosition();
  }

  @query('vaadin-split-layout')
  private splitLayout?: SplitLayoutElement;

  @internalProperty()
  private sidebarCollapsed = false;

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-split-layout>
        <div>
          left
          <vaadin-button
            theme="icon tertiary"
            aria-label="Expand/collapse sidebar"
            @click="${this.toggleSidebar}"
          >
            <iron-icon
              icon="${this.sidebarCollapsed ? 'vaadin:arrow-right' : 'vaadin:arrow-left'}"
            ></iron-icon>
          </vaadin-button>
        </div>
        <div>right</div>
      </vaadin-split-layout>
      <!-- end::snippet[] -->
    `;
  }

  setSplitterPosition(sidebarWidthInPx: number) {
    if (!this.splitLayout) throw 'splitLayout not ready';
    const sidebar = this.splitLayout.children[0] as HTMLElement;
    const contentArea = this.splitLayout.children[1] as HTMLElement;
    sidebar.style.flex = '';
    contentArea.style.flex = '';
    sidebar.style.width = sidebarWidthInPx + 'px';
    contentArea.style.width = this.splitLayout.clientWidth - sidebarWidthInPx + 'px';
  }

  updateSplitterPosition() {
    this.setSplitterPosition(this.sidebarCollapsed ? 80 : 230);
  }

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
    this.updateSplitterPosition();
  }
}
