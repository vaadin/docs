package com.vaadin.demo.component.progressbar;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.FlexLayout;
import com.vaadin.flow.component.orderedlayout.FlexComponent.JustifyContentMode;
import com.vaadin.flow.component.progressbar.ProgressBar;
import com.vaadin.flow.router.Route;

@Route("progress-bar-label")
public class ProgressBarLabel extends Div {

    public ProgressBarLabel() {
        getStyle().set("font-family", "var(--lumo-font-family)").set("color",
                "var(--lumo-secondary-text-color)");

        // tag::snippet[]
        ProgressBar progressBar = new ProgressBar();
        progressBar.setValue(0.5);

        Div progressBarLabelText = new Div();
        progressBarLabelText.setText("Processing Financials.xlsx");
        Div progressBarLabelValue = new Div();
        progressBarLabelValue.setText("50%");
        FlexLayout progressBarLabel = new FlexLayout();
        progressBarLabel.setJustifyContentMode(JustifyContentMode.BETWEEN);
        progressBarLabel.add(progressBarLabelText, progressBarLabelValue);

        add(progressBarLabel, progressBar);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<ProgressBarLabel> { // hidden-source-line
    } // hidden-source-line
}
