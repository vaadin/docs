package com.vaadin.demo.component.datepicker;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.Unit;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;

import java.time.ZoneId;
import java.time.format.TextStyle;
import java.util.List;
import java.util.Locale;

import java.time.LocalDate;
import java.time.Month;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Route("date-picker-individual-input-fields")
public class DatePickerIndividualInputFields extends Div {

    private final ComboBox<Integer> yearPicker;
    private final ComboBox<Month> monthPicker;
    private final ComboBox<Integer> dayPicker;

    // tag::snippet[]
    public DatePickerIndividualInputFields() {
        LocalDate now = LocalDate.now(ZoneId.systemDefault());

        List<Integer> selectableYears = IntStream.range(
                now.getYear() - 99,
                now.getYear() + 1)
                .boxed().collect(Collectors.toList());

        yearPicker = new ComboBox<>("Year", selectableYears);
        yearPicker.setWidth(6, Unit.EM);
        yearPicker.addValueChangeListener(e -> {
            updateMonthPicker();
            updateDayPicker();
        });

        monthPicker = new ComboBox<>("Month", Month.values());
        monthPicker.setItemLabelGenerator(m -> m.getDisplayName(
                TextStyle.FULL,
                Locale.getDefault()
        ));
        monthPicker.setWidth(9, Unit.EM);
        monthPicker.addValueChangeListener(e -> {
            updateDayPicker();
        });
        monthPicker.setEnabled(false);

        dayPicker = new ComboBox<>("Day");
        dayPicker.setWidth(5, Unit.EM);
        dayPicker.setEnabled(false);

        add(new HorizontalLayout(yearPicker, monthPicker, dayPicker));
    }

    private void updateMonthPicker() {
        if (yearPicker.getValue() == null) {
            monthPicker.setValue(null);
            monthPicker.setEnabled(false);
            return;
        }

        monthPicker.setValue(null);
        monthPicker.setEnabled(true);
    }

    private void updateDayPicker() {
        if (yearPicker.getValue() == null || monthPicker.getValue() == null) {
            dayPicker.setValue(null);
            dayPicker.setEnabled(false);
            return;
        }

        dayPicker.setValue(null);
        dayPicker.setEnabled(true);

        LocalDate startOfMonth = LocalDate.of(
                yearPicker.getValue(),
                monthPicker.getValue(),
                1
        );
        int lengthOfMonth = startOfMonth.lengthOfMonth();

        dayPicker.setItems(IntStream.range(1, lengthOfMonth + 1)
                                   .boxed()
                                   .collect(Collectors.toList()));
    }
    // end::snippet[]

    public static class Exporter extends DemoExporter<DatePickerIndividualInputFields> { // hidden-source-line
    } // hidden-source-line
}
