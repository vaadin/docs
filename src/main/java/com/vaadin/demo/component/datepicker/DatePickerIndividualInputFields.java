package com.vaadin.demo.component.datepicker;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.Unit;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;

import java.time.format.TextStyle;
import java.util.Locale;

import java.time.LocalDate;
import java.time.Month;
import java.util.stream.IntStream;

@Route("date-picker-individual-input-fields")
public class DatePickerIndividualInputFields extends Div {

    public DatePickerIndividualInputFields() {
        // tag::snippet[]
        ComboBox day = new ComboBox("Day");
        day.setItems(IntStream.range(1, 31).boxed());
        day.setWidth(5, Unit.EM);

        ComboBox<Month> month = new ComboBox("Month");
        month.setItems(Month.values());
        month.setItemLabelGenerator(m -> m.getDisplayName(TextStyle.FULL, Locale.getDefault()));
        month.setWidth(9, Unit.EM);

        ComboBox year = new ComboBox("Year");
        year.setItems(IntStream.range(LocalDate.now().getYear() - 99, LocalDate.now().getYear() + 1).boxed());
        year.setWidth(6, Unit.EM);

        add(new HorizontalLayout(day, month, year));
        // end::snippet[]
    }
    public static class Exporter extends DemoExporter<DatePickerIndividualInputFields> { // hidden-source-line
    } // hidden-source-line
}
