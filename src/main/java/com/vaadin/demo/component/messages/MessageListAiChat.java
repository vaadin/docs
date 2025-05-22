package com.vaadin.demo.component.messages;

import java.util.List;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.component.messages.LLMClient.Message;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.messages.MessageInput;
import com.vaadin.flow.component.messages.MessageList;
import com.vaadin.flow.component.messages.MessageListItem;
import com.vaadin.flow.router.Route;

@Route("message-list-ai-chat")
public class MessageListAiChat extends Div {

    private MessageListItem createItem(String text, boolean assistant) {
        MessageListItem item = new MessageListItem(text, null,
                assistant ? "Assistant" : "User");
        item.setUserColorIndex(assistant ? 2 : 1);
        return item;
    }

    public MessageListAiChat() {

        String chatId = "1234"; // Placeholder chat identifier
        // tag::snippet[]
        MessageList list = new MessageList();
        list.setMarkdown(true);
        // end::snippet[]
        MessageInput input = new MessageInput();

        List<Message> history = LLMClient.getHistory(chatId);

        list.setItems(history.stream()
                .map(message -> createItem(message.text(), message.assistant()))
                .toList());

        input.addSubmitListener(e -> {
            // Prefer using push instead of polling
            getUI().get().setPollInterval(300);
            String userInput = e.getValue();

            // Disable the input field while waiting for the Assistant response
            input.setEnabled(false);

            // Add the user message to the list
            list.addItem(createItem(userInput, false));

            // Add the Assistant message to the list
            MessageListItem newAssistantMessage = createItem("", true);
            list.addItem(newAssistantMessage);

            LLMClient.stream(chatId, userInput).subscribe(token -> {
                getUI().get().access(() -> {
                    // Update the Assistant message with the response
                    newAssistantMessage.appendText(token);
                });
            }, error -> {
                getUI().get().access(() -> {
                    getUI().get().setPollInterval(-1);
                });
                // Handle error
            }, () -> {
                getUI().get().access(() -> {
                    getUI().get().setPollInterval(-1);
                    // Re-enable the input field when streaming is complete
                    input.setEnabled(true);
                });

            });
        });

        add(list, input);
    }

    public static class Exporter extends DemoExporter<MessageListAiChat> { // hidden-source-line
    } // hidden-source-line
}
