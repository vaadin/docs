package com.vaadin.demo.component.progressbar;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.NativeLabel;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.progressbar.ProgressBar;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.theme.lumo.LumoUtility;

@Route("progress-bar-completion-time")
public class ProgressBarCompletionTime extends Div {

    public ProgressBarCompletionTime() {
        // tag::snippet[]
        ProgressBar progressBar = new ProgressBar();
        progressBar.setIndeterminate(true);

        NativeLabel progressBarLabel = new NativeLabel("Generating report...");
        progressBarLabel.setId("pblbl");
        progressBarLabel.addClassName(LumoUtility.TextColor.SECONDARY);

        Span progressBarSubLabel = new Span("Process can take upwards of 10 minutes");
        progressBarSubLabel.setId("sublbl");
        progressBarSubLabel.addClassNames(LumoUtility.TextColor.SECONDARY, LumoUtility.FontSize.XSMALL);

        // Associates the labels with the bar programmatically, for screen readers:
        progressBar.getElement().setAttribute("aria-labelledby", "pblbl");
        progressBar.getElement().setAttribute("aria-describedby", "sublbl");

        add(progressBarLabel, progressBar, progressBarSubLabel);
        // end::snippet[]
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<ProgressBarCompletionTime> { // hidden-source-line
    } // hidden-source-line
}
