import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/message-list';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { MessageListItem } from '@vaadin/message-list';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('message-list-markdown')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  @state()
  private items: MessageListItem[] = [
    {
      text: '**Hello team!** Did everyone review the *design document* for the new project?',
      userName: 'Alex Johnson',
    },
    {
      text: `## Project Update
I've completed the initial research phase and documented my findings.

* UI mockups ✅
* Market analysis ✅
* [See detailed report](https://vaadin.com)

Let me know your thoughts!`,
      userName: 'Sam Rivera',
    },
  ];

  protected override render() {
    return html`<vaadin-message-list .items="${this.items}" markdown></vaadin-message-list>`;
  }
  // end::snippet[]
}
