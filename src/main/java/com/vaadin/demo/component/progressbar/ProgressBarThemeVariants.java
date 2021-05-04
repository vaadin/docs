package com.vaadin.demo.component.progressbar;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.progressbar.ProgressBar;
import com.vaadin.flow.component.progressbar.ProgressBarVariant;
import com.vaadin.flow.router.Route;

@Route("progress-bar-theme-variants")
public class ProgressBarThemeVariants extends VerticalLayout {

    public ProgressBarThemeVariants() {
        setPadding(false);
        getStyle().set("font-family", "var(--lumo-font-family)").set("color", "var(--lumo-secondary-text-color)");

        // Contrast
        // tag::snippet[]
        ProgressBar progressBarContrast = new ProgressBar();
        progressBarContrast.addThemeVariants(ProgressBarVariant.LUMO_CONTRAST);
        // end::snippet[]
        progressBarContrast.setValue(0.5);

        Div progressBarContrastLabel = new Div();
        progressBarContrastLabel.setText("Transferring files... (60/120)");
        Div progressBarContrastWrapper = new Div(progressBarContrastLabel, progressBarContrast);
        progressBarContrastWrapper.setWidthFull();
        add(progressBarContrastWrapper);

        // Success
        ProgressBar progressBarSuccess = new ProgressBar();
        progressBarSuccess.addThemeVariants(ProgressBarVariant.LUMO_SUCCESS);
        progressBarSuccess.setValue(0.75);

        Div progressBarSuccessLabel = new Div();
        progressBarSuccessLabel.setText("Tasks (15/20)");
        Div progressBarSuccessWrapper = new Div(progressBarSuccessLabel,progressBarSuccess);
        progressBarSuccessWrapper.setWidthFull();
        add(progressBarSuccessWrapper);

        // Error
        ProgressBar progressBarError = new ProgressBar();
        progressBarError.addThemeVariants(ProgressBarVariant.LUMO_ERROR);
        progressBarError.setValue(0.2);

        Div progressBarErrorLabel = new Div();
        progressBarErrorLabel.setText("Tasks (4/20)");
        Div progressBarErrorWrapper = new Div(progressBarErrorLabel, progressBarError);
        progressBarErrorWrapper.setWidthFull();
        add(progressBarErrorWrapper);
    }

    public static class Exporter extends DemoExporter<ProgressBarThemeVariants> { // hidden-source-line
    } // hidden-source-line
}
