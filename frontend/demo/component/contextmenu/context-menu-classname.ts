import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/button';
import '@vaadin/context-menu';
import type { ContextMenuItem } from '@vaadin/context-menu';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('context-menu-classname')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  @state()
  private accessor items: ContextMenuItem[] = [
    { text: 'Share' },
    { text: 'Duplicate' },
    { text: 'Delete', className: 'text-error' },
  ];
  // end::snippet[]

  protected override render() {
    return html`
      <vaadin-context-menu .items="${this.items}" open-on="click">
        <vaadin-button>Actions</vaadin-button>
      </vaadin-context-menu>
    `;
  }
}
