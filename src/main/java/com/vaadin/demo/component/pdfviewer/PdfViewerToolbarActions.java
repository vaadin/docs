package com.vaadin.demo.component.pdfviewer;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.pdfviewer.PdfViewer;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.streams.DownloadHandler;

@Route("pdf-viewer-toolbar-actions")
public class PdfViewerToolbarActions extends Div {

    public PdfViewerToolbarActions() {
        PdfViewer viewer = new PdfViewer(DownloadHandler.forClassResource(
                getClass(), "/documents/invoice.pdf", "invoice.pdf"));
        viewer.setHeight("500px");
        // tag::snippet[]
        Button approve = new Button("Approve",
                event -> Notification.show("Invoice approved"));
        approve.addThemeVariants(ButtonVariant.TERTIARY);

        viewer.getToolbarActions().add(approve);
        // end::snippet[]

        add(viewer);
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<PdfViewerToolbarActions> { // hidden-source-line
    } // hidden-source-line
}
