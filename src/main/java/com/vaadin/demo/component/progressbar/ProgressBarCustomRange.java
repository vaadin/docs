package com.vaadin.demo.component.progressbar;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.progressbar.ProgressBar;
import com.vaadin.flow.router.Route;

@Route("progress-bar-custom-range")
public class ProgressBarCustomRange extends Div {

    public ProgressBarCustomRange() {
        // tag::snippet[]
        ProgressBar progressBar = new ProgressBar();
        progressBar.setMin(0);
        progressBar.setMax(100);
        progressBar.setValue(50);
        // end::snippet[]
        add(progressBar);
    }

    public static class Exporter extends DemoExporter<ProgressBarCustomRange> { // hidden-source-line
    } // hidden-source-line
}
