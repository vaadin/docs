package com.vaadin.demo.component.datepicker;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

import java.time.LocalDate;
import java.time.ZoneId;

@Route("date-picker-custom-format")
public class DatePickerCustomFormat extends VerticalLayout {
    public DatePickerCustomFormat() {
        // tag::snippet[]
        // Setup date picker with a single custom format `yyyy-MM-dd` for
        // displaying dates and parsing user input
        // Custom date formats are specified using the date pickers internationalization API
        DatePicker.DatePickerI18n singleFormatI18n = new DatePicker.DatePickerI18n();
        singleFormatI18n.setDateFormat("yyyy-MM-dd");

        DatePicker singleFormatDatePicker = new DatePicker("Select a date:");
        singleFormatDatePicker.setI18n(singleFormatI18n);

        // Setup date picker with a primary format and additional parsing formats
        // Date is always displayed using the primary format `yyyy-MM-dd`
        // When parsing user input, the date picker first attempts to match the
        // input with the primary format `yyyy-MM-dd`, then `MM/dd/yyyy`, and
        // finally `dd.MM.yyyy`
        DatePicker.DatePickerI18n multiFormatI18n = new DatePicker.DatePickerI18n();
        multiFormatI18n.setDateFormats("yyyy-MM-dd", "MM/dd/yyyy", "dd.MM.yyyy");

        DatePicker multiFormatDatePicker = new DatePicker("Select a date:");
        multiFormatDatePicker.setI18n(multiFormatI18n);
        // end::snippet[]

        singleFormatDatePicker.setValue(LocalDate.now(ZoneId.systemDefault()));
        multiFormatDatePicker.setValue(LocalDate.now(ZoneId.systemDefault()));

        Div headline1 = new Div(new Text("Single custom format"));
        headline1.getStyle().set("font-weight", "600");
        Div helpText1 = new Div(new Text("Displays and parses dates in ISO 8601 format \"yyyy-MM-dd\"."));
        helpText1.getStyle()
                .set("color", "var(--lumo-secondary-text-color)")
                .set("font-size", "var(--lumo-font-size-s)");
        add(new Div(headline1, helpText1, singleFormatDatePicker));

        Div headline2 = new Div(new Text("Primary custom format with additional parsing formats"));
        headline2.getStyle().set("font-weight", "600");
        Div helpText2 = new Div(new Text("Displays and parses dates in ISO 8601 format \"yyyy-MM-dd\". Also allows entering dates in the formats: \"MM/dd/yyyy\", \"dd.MM.yyyy\""));
        helpText2.getStyle()
                .set("color", "var(--lumo-secondary-text-color)")
                .set("font-size", "var(--lumo-font-size-s)");
        add(new Div(headline2, helpText2, multiFormatDatePicker));

        setPadding(false);
    }

    public static class Exporter extends DemoExporter<DatePickerCustomFormat> { // hidden-source-line
    } // hidden-source-line
}
