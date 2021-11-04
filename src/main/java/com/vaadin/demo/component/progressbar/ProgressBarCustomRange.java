package com.vaadin.demo.component.progressbar;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.progressbar.ProgressBar;
import com.vaadin.flow.router.Route;

@Route("progress-bar-custom-range")
public class ProgressBarCustomRange extends Div {

    public ProgressBarCustomRange() {
        getStyle().set("font-family", "var(--lumo-font-family)").set("color", "var(--lumo-secondary-text-color)");

        // tag::snippet[]
        ProgressBar progressBar = new ProgressBar();
        progressBar.setMin(0);
        progressBar.setMax(100);
        progressBar.setValue(50);

        Div progressBarLabel = new Div();
        progressBarLabel.setText("Processing files (50/100)");

        add(progressBarLabel, progressBar);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<ProgressBarCustomRange> { // hidden-source-line
    } // hidden-source-line
}
