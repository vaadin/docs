package com.vaadin.demo.component.progressbar;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.progressbar.ProgressBar;
import com.vaadin.flow.router.Route;

@Route("progress-bar-indeterminate")
public class ProgressBarIndeterminate extends Div {

    public ProgressBarIndeterminate() {
        getStyle().set("font-family", "var(--lumo-font-family)").set("color", "var(--lumo-secondary-text-color)");

        // tag::snippet[]
        ProgressBar progressBar = new ProgressBar();
        progressBar.setIndeterminate(true);

        Div progressBarLabel = new Div();
        progressBarLabel.setText("Generating report...");

        add(progressBarLabel, progressBar);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<ProgressBarIndeterminate> { // hidden-source-line
    } // hidden-source-line
}
