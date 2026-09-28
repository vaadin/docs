package com.vaadin.demo.component.messages;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.component.messages.LLMClient.Message;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.messages.MessageInput;
import com.vaadin.flow.component.messages.MessageList;
import com.vaadin.flow.component.messages.MessageListItem;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.upload.UploadButton;
import com.vaadin.flow.component.upload.UploadFileList;
import com.vaadin.flow.component.upload.UploadFileListVariant;
import com.vaadin.flow.component.upload.UploadManager;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.streams.UploadHandler;

@Route("message-list-ai-chat")
public class MessageListAiChat extends Div {

    private final Map<String, byte[]> pendingFiles = new LinkedHashMap<>();

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

        // Modular upload for file attachments
        var handler = UploadHandler.inMemory((metadata, data) -> {
            pendingFiles.put(metadata.fileName(), data);
        });
        var manager = new UploadManager(this, handler);
        manager.setMaxFiles(5);
        manager.setMaxFileSize(10L * 1024 * 1024); // 10 MB
        manager.addFileRemovedListener(
                event -> pendingFiles.remove(event.getFileName()));

        var uploadButton = new UploadButton(manager);
        var fileList = new UploadFileList(manager);
        fileList.addThemeVariants(UploadFileListVariant.THUMBNAILS);
        fileList.setWidthFull();

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

            // Add the user message with any pending attachments
            MessageListItem userMessage = createItem(userInput, false);
            for (var entry : pendingFiles.entrySet()) {
                userMessage.addAttachment(new MessageListItem.Attachment(
                        entry.getKey(), "#", "application/octet-stream"));
            }
            list.addItem(userMessage);

            // Clear pending attachments
            pendingFiles.clear();
            manager.clearFileList();

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

        var inputLayout = new HorizontalLayout(uploadButton, input);
        inputLayout.setWidthFull();
        inputLayout.expand(input);
        inputLayout.setAlignItems(FlexComponent.Alignment.END);

        var chatLayout = new VerticalLayout(list, fileList, inputLayout);
        chatLayout.expand(list);
        chatLayout.setSizeFull();
        add(chatLayout);

        com.vaadin.demo.component.messages.LLMClient.initPolling(list); // hidden-source-line
    }

    public static class Exporter extends DemoExporter<MessageListAiChat> { // hidden-source-line
    } // hidden-source-line
}
