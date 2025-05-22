import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/message-list';
import '@vaadin/message-input';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { MessageInputSubmitEvent } from '@vaadin/message-input';
import type { MessageListItem } from '@vaadin/message-list';
import LLMChatService from 'Frontend/demo/services/LLMChatService.js';
import { applyTheme } from 'Frontend/generated/theme';

function createItem(text: string, assistant = false): MessageListItem {
  return {
    text,
    userName: assistant ? 'Assistant' : 'User',
    userColorIndex: assistant ? 2 : 1,
  };
}

@customElement('message-list-ai-chat')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private chatDisabled = true;

  @state()
  private messageListItems: MessageListItem[] = [];

  private chatId = '1234'; // Placeholder chat identifier

  protected override async firstUpdated() {
    const messages = await LLMChatService.getHistory(this.chatId);
    this.messageListItems = messages.map((message) => createItem(message.text, message.assistant));
    this.chatDisabled = false;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-message-list .items="${this.messageListItems}" markdown></vaadin-message-list>
      <!-- end::snippet[] -->
      <vaadin-message-input
        ?disabled="${this.chatDisabled}"
        @submit="${this.handleChatSubmit}"
      ></vaadin-message-input>
    `;
  }

  private handleChatSubmit(e: MessageInputSubmitEvent) {
    const userInput = e.detail.value;

    // Disable the input field while waiting for the Assistant response
    this.chatDisabled = true;

    // Add the user message to the list
    this.messageListItems = [...this.messageListItems, createItem(userInput)];

    // Add the Assistant message to the list
    const newAssistantItem = createItem('', true);
    this.messageListItems = [...this.messageListItems, newAssistantItem];

    LLMChatService.stream(this.chatId, userInput)
      .onNext((token) => {
        // Append the token to the Assistant message
        newAssistantItem.text += token;
        // Force the MessageList to re-render
        this.messageListItems = [...this.messageListItems];
      })
      .onComplete(() => {
        // Re-enable the input field when streaming is complete
        this.chatDisabled = false;
      });
  }
}
