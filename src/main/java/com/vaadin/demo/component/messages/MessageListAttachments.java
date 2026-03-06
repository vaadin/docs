package com.vaadin.demo.component.messages;

import java.awt.RenderingHints;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UncheckedIOException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Arrays;
import java.util.Base64;

import javax.imageio.ImageIO;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.messages.MessageList;
import com.vaadin.flow.component.messages.MessageListItem;
import com.vaadin.flow.router.Route;

@Route("message-list-attachments")
public class MessageListAttachments extends Div {

    public MessageListAttachments() {

        MessageList list = new MessageList();

        Instant yesterday = LocalDateTime.now().minusDays(1)
                .toInstant(ZoneOffset.UTC);
        Instant fiftyMinsAgo = LocalDateTime.now().minusMinutes(50)
                .toInstant(ZoneOffset.UTC);

        // tag::snippet[]
        MessageListItem message1 = new MessageListItem(
                "Here are the documents for the project.", yesterday,
                "Matt Mambo");
        message1.setUserColorIndex(1);

        message1.addAttachment(new MessageListItem.Attachment(
                "project-proposal.pdf",
                "https://example.com/files/proposal.pdf", "application/pdf"));
        // end::snippet[]
        message1.addAttachment(new MessageListItem.Attachment(
                "budget-overview.xlsx", "https://example.com/files/budget.xlsx",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));

        MessageListItem message2 = new MessageListItem(
                "Thanks! Here's a photo from the offsite.", fiftyMinsAgo,
                "Linsey Listy");
        message2.setUserColorIndex(2);

        String imageDataUrl = toThumbnailDataUrl(
                getClass().getResourceAsStream("/images/reindeer.jpg"));
        message2.addAttachment(new MessageListItem.Attachment("landscape.jpg",
                imageDataUrl, "image/jpeg"));

        // tag::snippet[]
        list.setItems(Arrays.asList(message1, message2));

        var status = new Span("Click an attachment to see its name here.");
        list.addAttachmentClickListener(event -> {
            status.setText("Clicked: " + event.getAttachment().name());
        });
        // end::snippet[]

        add(list, status);
    }

    private static final int THUMBNAIL_MAX_SIZE = 200;

    private static String toThumbnailDataUrl(InputStream imageStream) {
        try {
            var originalImage = ImageIO.read(imageStream);
            var originalWidth = originalImage.getWidth();
            var originalHeight = originalImage.getHeight();

            var scale = Math.min((double) THUMBNAIL_MAX_SIZE / originalWidth,
                    (double) THUMBNAIL_MAX_SIZE / originalHeight);
            var scaledWidth = (int) (originalWidth * scale);
            var scaledHeight = (int) (originalHeight * scale);

            var scaledImage = new BufferedImage(scaledWidth, scaledHeight,
                    BufferedImage.TYPE_INT_RGB);
            var g2d = scaledImage.createGraphics();
            g2d.setRenderingHint(RenderingHints.KEY_INTERPOLATION,
                    RenderingHints.VALUE_INTERPOLATION_BILINEAR);
            g2d.drawImage(originalImage, 0, 0, scaledWidth, scaledHeight, null);
            g2d.dispose();

            var outputStream = new ByteArrayOutputStream();
            ImageIO.write(scaledImage, "jpg", outputStream);
            return "data:image/jpeg;base64," + Base64.getEncoder()
                    .encodeToString(outputStream.toByteArray());
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }

    public static class Exporter extends DemoExporter<MessageListAttachments> { // hidden-source-line
    } // hidden-source-line
}
