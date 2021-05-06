package com.vaadin.demo.component.datepicker;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.data.renderer.ComponentRenderer;
import com.vaadin.flow.data.renderer.Renderer;
import com.vaadin.flow.data.renderer.TemplateRenderer;
import com.vaadin.flow.router.Route;

import java.time.*;
import java.time.format.TextStyle;
import java.time.temporal.TemporalField;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Locale;

@Route("date-picker-individual-input-fields")
public class DatePickerIndividualInputFields extends Div {

  private ComboBox<Integer> day;
  private ComboBox<Month> month;
  private ComboBox<Year> year;

  public DatePickerIndividualInputFields() {
    // tag::snippet[]
    LocalDate now = LocalDate.now();

    month = new ComboBox("Month");
    month.setItems(Month.values());
    month.setValue(now.getMonth());
    month.addValueChangeListener(event -> day.setItems(getDays()));
    month.setWidth("9em");

    // Use component or template renderer
    month.setRenderer(new ComponentRenderer<>(item ->
      new Text(item.getDisplayName(TextStyle.FULL, Locale.ENGLISH)))
    );
    // end::snippet[]
    /*
    month.setRenderer(TemplateRenderer.<Month>of(
      "[[item.displayName]]")
      .withProperty("displayName", item -> item.getDisplayName(TextStyle.FULL, Locale.ENGLISH))
    );
    */
    // tag::snippet[]

    year = new ComboBox("Year");
    year.setItems(getYears());
    year.setValue(Year.of(now.getYear()));
    year.setWidth("6em");

    day = new ComboBox("Day");
    day.setItems(getDays());
    day.setValue(now.getDayOfMonth());
    day.setWidth("5em");
    // end::snippet[]

    HorizontalLayout layout = new HorizontalLayout(day, month, year);
    // Removes default spacing
    layout.setSpacing(false);
    // Adds small amount of space between the components
    layout.getThemeList().add("spacing-s");

    add(layout);
  }

  private Collection<Integer> getDays() {
    int max = YearMonth.of(year.getValue().getValue(), month.getValue().getValue() + 1).lengthOfMonth();

    ArrayList<Integer> days = new ArrayList<>();
    for (int i = 0; i < max; i++) {
      days.add(i);
    }
    return days;
  }

  private Collection<Year> getYears() {
    ArrayList<Year> years = new ArrayList<>();
    for (Year year = Year.now().minusYears(100); year.isBefore(Year.now()); year = year.plusYears(1)) {
      years.add(year);
    }
    return years;
  }
  public static class Exporter extends DemoExporter<DatePickerIndividualInputFields> {} // hidden-source-line
}
