package com.vaadin.demo.component.progressbar;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.progressbar.ProgressBar;
import com.vaadin.flow.router.Route;

@Route("progress-bar-indeterminate")
public class ProgressBarIndeterminate extends Div {

    public ProgressBarIndeterminate() {
        // tag::snippet[]
        ProgressBar progressBar = new ProgressBar();
        progressBar.setIndeterminate(true);
        // end::snippet[]
        add(progressBar);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<ProgressBarIndeterminate> { // hidden-source-line
    } // hidden-source-line
}
