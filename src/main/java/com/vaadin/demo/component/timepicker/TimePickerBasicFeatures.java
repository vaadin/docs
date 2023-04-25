package com.vaadin.demo.component.timepicker;

import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.timepicker.TimePicker;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("time-picker-basic-features")
public class TimePickerBasicFeatures extends HorizontalLayout {

    public TimePickerBasicFeatures() {
        setPadding(false);

        // tag::snippet[]
        TimePicker field = new TimePicker();
        field.setLabel("Label");
        field.setHelperText("Helper text");
        field.setPlaceholder("Placeholder");
        field.setTooltipText("Tooltip text");
        field.setClearButtonVisible(true);
        field.setPrefixComponent(VaadinIcon.VAADIN_H.create());
        // end::snippet[]

        add(field);
    }

    public static class Exporter extends DemoExporter<TimePickerBasicFeatures> { // hidden-source-line
    } // hidden-source-line
}
