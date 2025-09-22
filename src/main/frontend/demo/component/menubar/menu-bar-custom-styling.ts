import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/menu-bar';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('menu-bar-custom-styling')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  @state()
  private items = [
    { text: 'View', className: 'bg-primary text-primary-contrast' },
    { text: 'Edit' },
    {
      text: 'Share',
      children: [
        { text: 'By email', className: 'bg-primary text-primary-contrast' },
        { text: 'Get link' },
      ],
    },
  ];

  protected override render() {
    return html`<vaadin-menu-bar .items="${this.items}"></vaadin-menu-bar>`;
  }
  // end::snippet[]
}
