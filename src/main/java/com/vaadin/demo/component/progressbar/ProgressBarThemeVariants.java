package com.vaadin.demo.component.progressbar;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.progressbar.ProgressBar;
import com.vaadin.flow.component.progressbar.ProgressBarVariant;
import com.vaadin.flow.router.Route;

@Route("progress-bar-theme-variants")
public class ProgressBarThemeVariants extends VerticalLayout {

    public ProgressBarThemeVariants() {
        setPadding(false);

        // tag::snippet[]
        // Contrast
        ProgressBar progressBarContrast = new ProgressBar();
        progressBarContrast.addThemeVariants(ProgressBarVariant.LUMO_CONTRAST);
        progressBarContrast.setValue(0.5);

        // Success
        ProgressBar progressBarSuccess = new ProgressBar();
        progressBarSuccess.addThemeVariants(ProgressBarVariant.LUMO_SUCCESS);
        progressBarSuccess.setValue(0.75);

        // Error
        ProgressBar progressBarError = new ProgressBar();
        progressBarError.addThemeVariants(ProgressBarVariant.LUMO_ERROR);
        progressBarError.setValue(0.2);
        // end::snippet[]

        add(progressBarContrast, progressBarSuccess, progressBarError);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<ProgressBarThemeVariants> { // hidden-source-line
    } // hidden-source-line
}
