package com.vaadin.demo.component.pdfviewer;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.pdfviewer.PdfViewer;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.streams.DownloadHandler;

@Route("pdf-viewer-basic")
public class PdfViewerBasic extends Div {

    public PdfViewerBasic() {
        // tag::snippet[]
        PdfViewer viewer = new PdfViewer(DownloadHandler.forClassResource(
                getClass(), "/documents/user-guide.pdf", "user-guide.pdf"));
        viewer.setHeight("500px");

        add(viewer);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<PdfViewerBasic> { // hidden-source-line
    } // hidden-source-line
}
