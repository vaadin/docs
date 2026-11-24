package com.vaadin.demo.component.pdfviewer;

import java.util.LinkedHashMap;
import java.util.Map;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.FlexComponent.Alignment;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.pdfviewer.PdfViewer;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.streams.DownloadHandler;

@Route("pdf-viewer-navigation")
public class PdfViewerNavigation extends VerticalLayout {

    public PdfViewerNavigation() {
        setPadding(false);

        PdfViewer viewer = new PdfViewer(DownloadHandler.forClassResource(
                getClass(), "/documents/user-guide.pdf", "user-guide.pdf"));
        viewer.setHeight("500px");
        viewer.setWidthFull();

        // tag::snippet[]
        Map<String, Integer> chapters = new LinkedHashMap<>();
        chapters.put("Getting started", 2);
        chapters.put("Recording time", 4);
        chapters.put("Submitting a timesheet", 6);
        chapters.put("Reports", 8);
        chapters.put("Troubleshooting", 12);

        Select<String> chapter = new Select<>();
        chapter.setPlaceholder("Go to chapter");
        chapter.setItems(chapters.keySet());
        chapter.addValueChangeListener(event -> {
            if (event.getValue() != null) {
                viewer.scrollToPage(chapters.get(event.getValue()));
            }
        });

        Span position = new Span();
        position.bindText(() -> {
            int pageCount = viewer.pageCountSignal().get();
            return pageCount == 0 ? ""
                    : "Page " + viewer.pageSignal().get() + " of " + pageCount;
        });
        // end::snippet[]

        HorizontalLayout controls = new HorizontalLayout(chapter, position);
        controls.setAlignItems(Alignment.BASELINE);

        add(controls, viewer);
    }

    public static class Exporter extends DemoExporter<PdfViewerNavigation> { // hidden-source-line
    } // hidden-source-line
}
