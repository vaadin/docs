package com.vaadin.demo.buildingapps.uistatemanagement;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.checkbox.Checkbox;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;
import com.vaadin.signals.WritableSignal;
import com.vaadin.signals.local.ValueSignal;

@Route("progressive-disclosure")
public class ProgressiveDisclosureView extends VerticalLayout {

    public enum VisaType {
        H1B, L1, O1
    }

    public ProgressiveDisclosureView() {
        // tag::signals[]
        // Signals track the state that drives visibility
        WritableSignal<Boolean> needsVisa = new ValueSignal<>(false);
        WritableSignal<VisaType> visaType = new ValueSignal<>(VisaType.H1B);
        // end::signals[]

        // tag::inputs[]
        Checkbox needsVisaCheckbox = new Checkbox("Do you require visa sponsorship?");
        // Bind the checkbox value to the signal
        needsVisaCheckbox.bindValue(needsVisa);

        ComboBox<VisaType> visaTypeSelect = new ComboBox<>("Visa Type", VisaType.values());
        // Bind the combobox value to the signal
        visaTypeSelect.bindValue(visaType);
        // end::inputs[]

        // tag::visibility[]
        VerticalLayout visaSection = new VerticalLayout(
                visaTypeSelect,
                new TextField("Current Visa Status")
        );
        // The section is automatically shown/hidden when the signal changes
        visaSection.bindVisible(needsVisa);

        VerticalLayout h1bSection = new VerticalLayout(
                new Checkbox("Have you held an H1-B visa before?"),
                new TextField("Specialty Occupation")
        );
        // You can use a lambda for complex or nested conditions
        h1bSection.bindVisible(() -> needsVisa.value() && visaType.value() == VisaType.H1B);
        // end::visibility[]

        add(needsVisaCheckbox, visaSection, h1bSection);

        // tag::results[]
        // Signals can also drive the visibility of result areas
        WritableSignal<Boolean> resultsVisible = new ValueSignal<>(false);

        VerticalLayout resultsArea = new VerticalLayout(new H3("Application Summary"));
        resultsArea.bindVisible(resultsVisible);

        Button showSummary = new Button("Show Summary", e -> resultsVisible.value(true));
        // end::results[]
        add(showSummary, resultsArea);
    }
}
