package com.vaadin.demo.component.messages;

import java.time.Instant;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Map;

import com.vaadin.demo.DemoExporter; // hidden-source-line
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

@Route("message-input-upload")
public class MessageInputUpload extends Div {

    // Pending files, keyed by file name
    private final Map<String, byte[]> pendingFiles = new LinkedHashMap<>();

    public MessageInputUpload() {
        // tag::snippet[]
        var handler = UploadHandler.inMemory((metadata, data) -> {
            pendingFiles.put(metadata.fileName(), data);
        });

        var manager = new UploadManager(this, handler);
        manager.setMaxFiles(5);
        manager.setMaxFileSize(10L * 1024 * 1024); // 10 MB

        // Remove files from the pending map when the user removes them
        manager.addFileRemovedListener(event -> {
            pendingFiles.remove(event.getFileName());
        });

        var uploadButton = new UploadButton(manager);

        var fileList = new UploadFileList(manager);
        fileList.addThemeVariants(UploadFileListVariant.THUMBNAILS);
        fileList.setWidthFull();

        var messageInput = new MessageInput();
        var messageList = new MessageList();

        messageInput.addSubmitListener(event -> {
            var message = new MessageListItem(event.getValue(),
                    Instant.now(), "You");
            message.setUserColorIndex(1);

            // Add pending files as attachments
            for (var entry : pendingFiles.entrySet()) {
                message.addAttachment(new MessageListItem.Attachment(
                        entry.getKey(), "#", "application/octet-stream"));
            }

            var items = new ArrayList<>(messageList.getItems());
            items.add(message);
            messageList.setItems(items);

            // Clear pending attachments
            pendingFiles.clear();
            manager.clearFileList();
        });

        var inputLayout = new HorizontalLayout(uploadButton, messageInput);
        inputLayout.setWidthFull();
        inputLayout.expand(messageInput);
        inputLayout.setAlignItems(FlexComponent.Alignment.END);

        var layout = new VerticalLayout(messageList, fileList, inputLayout);
        layout.expand(messageList);
        layout.setSizeFull();
        // end::snippet[]

        setSizeFull(); // hidden-source-line
        add(layout);
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<MessageInputUpload> { // hidden-source-line
    } // hidden-source-line
}
