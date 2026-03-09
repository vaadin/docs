import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/menu-bar';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('menu-bar-class-name')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  @state()
  private items = [
    { text: 'View', className: 'custom' },
    { text: 'Edit' },
    {
      text: 'Share',
      children: [{ text: 'By email', className: 'custom' }, { text: 'Get link' }],
    },
  ];

  protected override render() {
    return html`<vaadin-menu-bar .items="${this.items}"></vaadin-menu-bar>`;
  }
  // end::snippet[]
}
