package com.vaadin.demo.component.progressbar;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.NativeLabel;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.progressbar.ProgressBar;
import com.vaadin.flow.router.Route;

@Route("progress-bar-completion-time")
public class ProgressBarCompletionTime extends Div {

    public ProgressBarCompletionTime() {
        // tag::snippet[]
        ProgressBar progressBar = new ProgressBar();
        progressBar.setIndeterminate(true);

        NativeLabel progressBarLabel = new NativeLabel("Generating report...");
        progressBarLabel.setId("pblbl");

        Span progressBarSubLabel = new Span(
                "Process can take upwards of 10 minutes");
        progressBarSubLabel.setId("sublbl");
        progressBarSubLabel.getStyle().set("font-size", "0.8125rem");

        // Associates the labels with the bar programmatically, for screen
        // readers:
        progressBar.getElement().setAttribute("aria-labelledby", "pblbl");
        progressBar.getElement().setAttribute("aria-describedby", "sublbl");

        add(progressBarLabel, progressBar, progressBarSubLabel);
        // end::snippet[]
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<ProgressBarCompletionTime> { // hidden-source-line
    } // hidden-source-line
}
