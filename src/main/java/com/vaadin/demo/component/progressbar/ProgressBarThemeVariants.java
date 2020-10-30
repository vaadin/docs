package com.vaadin.demo.component.progressbar;

import com.vaadin.demo.DemoExporter; // hidden-full-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.progressbar.ProgressBar;
import com.vaadin.flow.router.Route;

@Route("progress-bar-theme-variants")
public class ProgressBarThemeVariants extends Div {

    public ProgressBarThemeVariants() {
        // tag::snippet[]
        ProgressBar progressBar = new ProgressBar();
        progressBar.setValue(0.5);
        add(progressBar);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<ProgressBarThemeVariants> { // hidden-full-source-line
    } // hidden-full-source-line
}
