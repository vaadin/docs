import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/menu-bar';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('menu-bar-drop-down')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  @state()
  private items = [
    {
      text: 'John Smith',
      children: [
        { text: 'Profile' },
        { text: 'Account' },
        { text: 'Preferences' },
        { component: 'hr' },
        { text: 'Sign out' },
      ],
    },
  ];
  // end::snippet[]

  protected override render() {
    return html`
      <!-- tag::snippethtml[] -->
      <vaadin-menu-bar .items="${this.items}"></vaadin-menu-bar>
      <!-- end::snippethtml[] -->
    `;
  }
}
