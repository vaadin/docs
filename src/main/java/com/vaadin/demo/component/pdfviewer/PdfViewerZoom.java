package com.vaadin.demo.component.pdfviewer;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.pdfviewer.PdfViewer;
import com.vaadin.flow.component.pdfviewer.Zoom;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.streams.DownloadHandler;

@Route("pdf-viewer-zoom")
public class PdfViewerZoom extends Div {

    public PdfViewerZoom() {
        PdfViewer viewer = new PdfViewer(DownloadHandler.forClassResource(
                getClass(), "/documents/user-guide.pdf", "user-guide.pdf"));
        viewer.setHeight("500px");
        // tag::snippet[]
        viewer.setZoom(Zoom.PAGE_FIT);
        // end::snippet[]

        add(viewer);
    }

    public static class Exporter extends DemoExporter<PdfViewerZoom> { // hidden-source-line
    } // hidden-source-line
}
