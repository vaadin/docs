package com.vaadin.demo.component.progressbar;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.progressbar.ProgressBar;
import com.vaadin.flow.router.Route;

@Route("progress-bar-determinate")
public class ProgressBarDeterminate extends Div {

    public ProgressBarDeterminate() {
        // tag::snippet[]
        ProgressBar progressBar = new ProgressBar();
        progressBar.setValue(0.5);
        // end::snippet[]
        add(progressBar);
    }

    public static class Exporter extends DemoExporter<ProgressBarDeterminate> { // hidden-source-line
    } // hidden-source-line
}
