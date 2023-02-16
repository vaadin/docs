package com.vaadin.demo.component.customfield;

import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.customfield.CustomField;
import com.vaadin.flow.component.datepicker.DatePicker;

// tag::snippet[]
public class DateRangePicker extends CustomField<LocalDateRange> {

    private DatePicker start;
    private DatePicker end;

    public DateRangePicker(String label) {
        this();
        setLabel(label);
    }

    public DateRangePicker() {
        start = new DatePicker();
        start.setPlaceholder("Start date");
        // Sets title for screen readers
        start.getElement().executeJs(
                "this.focusElement.setAttribute('title', 'Start date')");

        end = new DatePicker();
        end.setPlaceholder("End date");
        end.getElement().executeJs(
                "this.focusElement.setAttribute('title', 'End date')");

        add(start, new Text(" – "), end);
    }

    @Override
    protected LocalDateRange generateModelValue() {
        return new LocalDateRange(start.getValue(), end.getValue());
    }

    @Override
    protected void setPresentationValue(LocalDateRange dateRange) {
        start.setValue(dateRange.getStartDate());
        end.setValue(dateRange.getEndDate());
    }
}
// end::snippet[]
