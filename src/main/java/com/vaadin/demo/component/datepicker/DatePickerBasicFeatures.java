package com.vaadin.demo.component.datepicker;

import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("date-picker-basic-features")
public class DatePickerBasicFeatures extends HorizontalLayout {

    public DatePickerBasicFeatures() {
        setPadding(false);

        // tag::snippet[]
        DatePicker field = new DatePicker();
        field.setLabel("Label");
        field.setHelperText("Helper text");
        field.setPlaceholder("Placeholder");
        field.setTooltipText("Tooltip text");
        field.setClearButtonVisible(true);
        field.setPrefixComponent(VaadinIcon.CALENDAR.create());
        // end::snippet[]

        add(field);
    }

    public static class Exporter extends DemoExporter<DatePickerBasicFeatures> { // hidden-source-line
    } // hidden-source-line
}
