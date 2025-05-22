import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { useCallback, useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { MessageInput, type MessageInputSubmitEvent } from '@vaadin/react-components';
import { MessageList, type MessageListItem } from '@vaadin/react-components/MessageList.js';
import LLMChatService from 'Frontend/demo/services/LLMChatService.js';

function createItem(text: string, assistant = false): MessageListItem {
  return {
    text,
    userName: assistant ? 'Assistant' : 'User',
    userColorIndex: assistant ? 2 : 1,
  };
}

function Example() {
  useSignals(); // hidden-source-line
  const chatDisabled = useSignal(true);
  const messageListItems = useSignal<MessageListItem[]>([]);
  const chatId = '1234'; // Placeholder chat identifier

  useEffect(() => {
    LLMChatService.getHistory(chatId).then((messages) => {
      messageListItems.value = messages.map((message) =>
        createItem(message.text, message.assistant)
      );
      chatDisabled.value = false;
    });
  }, []);

  const handleChatSubmit = useCallback((e: MessageInputSubmitEvent) => {
    const userInput = e.detail.value;

    // Disable the input field while waiting for the Assistant response
    chatDisabled.value = true;

    // Add the user message to the list
    messageListItems.value = [...messageListItems.value, createItem(userInput)];

    // Add the Assistant message to the list
    const newAssistantItem = createItem('', true);
    messageListItems.value = [...messageListItems.value, newAssistantItem];

    LLMChatService.stream(chatId, userInput)
      .onNext((token) => {
        // Append the token to the Assistant message
        newAssistantItem.text += token;
        // Force the MessageList to re-render
        messageListItems.value = [...messageListItems.value];
      })
      .onComplete(() => {
        // Re-enable the input field when streaming is complete
        chatDisabled.value = false;
      });
  }, []);

  return (
    <div>
      {/* tag::snippet[] */}
      <MessageList items={messageListItems.value} markdown />
      {/* end::snippet[] */}
      <MessageInput disabled={chatDisabled.value} onSubmit={handleChatSubmit} />
    </div>
  );
}

export default reactExample(Example); // hidden-source-line
