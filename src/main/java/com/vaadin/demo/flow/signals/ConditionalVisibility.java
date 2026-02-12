package com.vaadin.demo.flow.signals;

import com.vaadin.flow.component.checkbox.Checkbox;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.binder.Binder;
import com.vaadin.flow.signals.local.ValueSignal;

public class ConditionalVisibility extends VerticalLayout {

    enum VisaType {
        H1B, L1, O1
    }

    static class VisaApplicationData {
        private Boolean needsVisa;
        private VisaType visaType;
        private String currentVisaStatus;
        private Boolean hasH1BPreviously;
        private String previousEmployer;

        // getters and setters omitted for brevity
        public Boolean getNeedsVisa() { return needsVisa; }
        public void setNeedsVisa(Boolean needsVisa) { this.needsVisa = needsVisa; }
        public VisaType getVisaType() { return visaType; }
        public void setVisaType(VisaType visaType) { this.visaType = visaType; }
        public String getCurrentVisaStatus() { return currentVisaStatus; }
        public void setCurrentVisaStatus(String currentVisaStatus) { this.currentVisaStatus = currentVisaStatus; }
        public Boolean getHasH1BPreviously() { return hasH1BPreviously; }
        public void setHasH1BPreviously(Boolean hasH1BPreviously) { this.hasH1BPreviously = hasH1BPreviously; }
        public String getPreviousEmployer() { return previousEmployer; }
        public void setPreviousEmployer(String previousEmployer) { this.previousEmployer = previousEmployer; }
    }

    public ConditionalVisibility() {
        // tag::setup[]
        // Create binder and data bean
        Binder<VisaApplicationData> binder = new Binder<>(VisaApplicationData.class);
        VisaApplicationData data = new VisaApplicationData();
        binder.setBean(data);

        // Create signals for conditional visibility
        ValueSignal<Boolean> needsVisaSignal = new ValueSignal<>(false);
        ValueSignal<VisaType> visaTypeSignal = new ValueSignal<>(VisaType.H1B);
        ValueSignal<Boolean> hasH1BPreviouslySignal = new ValueSignal<>(false);
        // end::setup[]

        // tag::level0[]
        // Base question: needs visa sponsorship
        Checkbox needsVisaCheckbox = new Checkbox("Do you require visa sponsorship?");
        binder.forField(needsVisaCheckbox)
            .bind(VisaApplicationData::getNeedsVisa, VisaApplicationData::setNeedsVisa);
        needsVisaCheckbox.bindValue(needsVisaSignal);
        // end::level0[]

        // tag::level1[]
        // Level 1: Visa-related fields (shown when needsVisa is true)
        VerticalLayout visaSection = new VerticalLayout();

        ComboBox<VisaType> visaTypeSelect = new ComboBox<>("Visa Type", VisaType.values());
        visaTypeSelect.setValue(VisaType.H1B);
        binder.forField(visaTypeSelect)
            .bind(VisaApplicationData::getVisaType, VisaApplicationData::setVisaType);
        visaTypeSelect.bindValue(visaTypeSignal);

        TextField currentVisaStatus = new TextField("Current Visa Status");
        binder.forField(currentVisaStatus)
            .bind(VisaApplicationData::getCurrentVisaStatus, VisaApplicationData::setCurrentVisaStatus);

        visaSection.add(visaTypeSelect, currentVisaStatus);
        visaSection.bindVisible(needsVisaSignal);
        // end::level1[]

        // tag::level2[]
        // Level 2: H1-B specific fields (shown when visa type is H1B)
        VerticalLayout h1bSection = new VerticalLayout();

        Checkbox hasH1BPreviouslyCheckbox = new Checkbox("Have you held an H1-B visa before?");
        binder.forField(hasH1BPreviouslyCheckbox)
            .bind(VisaApplicationData::getHasH1BPreviously, VisaApplicationData::setHasH1BPreviously);
        hasH1BPreviouslyCheckbox.bindValue(hasH1BPreviouslySignal);

        TextField h1bSpecialtyOccupation = new TextField("Specialty Occupation");
        // Binder binding omitted for brevity

        h1bSection.add(hasH1BPreviouslyCheckbox, h1bSpecialtyOccupation);
        h1bSection.bindVisible(() -> needsVisaSignal.value()
                && visaTypeSignal.value() == VisaType.H1B);
        // end::level2[]

        // tag::level3[]
        // Level 3: Previous H1-B details (shown when has H1-B previously)
        VerticalLayout previousH1BSection = new VerticalLayout();

        TextField previousEmployer = new TextField("Previous Employer");
        binder.forField(previousEmployer)
            .bind(VisaApplicationData::getPreviousEmployer, VisaApplicationData::setPreviousEmployer);

        TextField previousPetitionNumber = new TextField("Previous Petition Number");
        // Additional fields omitted for brevity

        previousH1BSection.add(previousEmployer, previousPetitionNumber);
        previousH1BSection.bindVisible(() -> needsVisaSignal.value()
                && visaTypeSignal.value() == VisaType.H1B
                && hasH1BPreviouslySignal.value());
        // end::level3[]

        add(needsVisaCheckbox, visaSection, h1bSection, previousH1BSection);
    }
}
