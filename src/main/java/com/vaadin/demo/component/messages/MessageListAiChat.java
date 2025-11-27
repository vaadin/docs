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
        MessageListItem item = new MessageListItem(text,
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

        // Live region for screen reader announcements
        Div liveRegion = new Div();
        liveRegion.getElement().setAttribute("aria-live", "polite");
        liveRegion.addClassName("screen-reader-only");
        add(liveRegion);

        List<Message> history = LLMClient.getHistory(chatId);

        list.setItems(history.stream()
                .map(message -> createItem(message.text(), message.assistant()))
                .toList());

        input.addSubmitListener(e -> {
            String userInput = e.getValue();

            // Add the user message to the list
            list.addItem(createItem(userInput, false));

            // Add the Assistant message to the list
            MessageListItem newAssistantMessage = createItem("", true);
            list.addItem(newAssistantMessage);

            // Announce that AI is processing
            liveRegion.setText("AI is processing the prompt");

            int messageListItemCount = list.getItems().size();
            LLMClient.stream(chatId, userInput).subscribe(token -> {
                getUI().get().access(() -> {
                    // Update the Assistant message with the response
                    // Make sure to have server push enabled!
                    // See
                    // https://vaadin.com/docs/latest/flow/advanced/server-push
                    newAssistantMessage.appendText(token);
                });
            }, error -> {
                // Handle error
            }, () -> {
                getUI().get().access(() -> {
                    if (messageListItemCount != list.getItems().size()) {
                        // Another message is still being processed
                        return;
                    }

                    // Announce that a new message is available
                    liveRegion.setText("New message available");
                });

            });
        });

        add(list, input);

        com.vaadin.demo.component.messages.LLMClient.initPolling(list); // hidden-source-line
    }

    public static class Exporter extends DemoExporter<MessageListAiChat> { // hidden-source-line
    } // hidden-source-line
}
