package com.vaadin.demo.component.progressbar;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.NativeLabel;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.FlexComponent.JustifyContentMode;
import com.vaadin.flow.component.progressbar.ProgressBar;
import com.vaadin.flow.router.Route;

@Route("progress-bar-label")
public class ProgressBarLabel extends Div {

    public ProgressBarLabel() {
        getStyle().set("color", "var(--lumo-secondary-text-color)");

        // tag::snippet[]
        ProgressBar progressBar = new ProgressBar();
        progressBar.setValue(0.5);

        NativeLabel progressBarLabelText = new NativeLabel("Processing Financials.xlsx");
        progressBarLabelText.setId("pblabel");
        // Associates the label with the progressbar for screen readers:
        progressBar.getElement().setAttribute("aria-labelledby", "pblabel");

        Span progressBarLabelValue = new Span("50%");
        HorizontalLayout progressBarLabel = new HorizontalLayout(progressBarLabelText, progressBarLabelValue);
        progressBarLabel.setJustifyContentMode(JustifyContentMode.BETWEEN);

        add(progressBarLabel, progressBar);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<ProgressBarLabel> { // hidden-source-line
    } // hidden-source-line
}
