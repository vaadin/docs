package com.vaadin.demo.component.progressbar;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.progressbar.ProgressBar;
import com.vaadin.flow.router.Route;

@Route("progress-bar-completion-time")
public class ProgressBarCompletionTime extends Div {

    public ProgressBarCompletionTime() {
        getStyle().set("font-family", "var(--lumo-font-family)").set("color", "var(--lumo-secondary-text-color)");

        // tag::snippet[]
        ProgressBar progressBar = new ProgressBar();
        progressBar.setIndeterminate(true);

        Div progressBarLabel = new Div();
        progressBarLabel.setText("Generating report, please wait...");

        Div progressBarSubLabel = new Div();
        progressBarSubLabel.getStyle().set("font-size", "var(--lumo-font-size-xs)");
        progressBarSubLabel.setText("Process can take upwards of 10 minutes");

        add(progressBarLabel, progressBar, progressBarSubLabel);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<ProgressBarCompletionTime> { // hidden-source-line
    } // hidden-source-line
}
