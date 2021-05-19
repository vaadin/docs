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

    end = new DatePicker();
    end.setPlaceholder("End date");

    // aria-label for screen readers
    start.getElement()
      .executeJs("const start = this.shadowRoot.querySelector('[part=\"text-field\"]').shadowRoot.querySelector('[part=\"value\"]');" +
        "start.setAttribute('aria-label', 'Start date');" +
        "start.removeAttribute('aria-labelledby');"
      );
    end.getElement()
      .executeJs("const end = this.shadowRoot.querySelector('[part=\"text-field\"]').shadowRoot.querySelector('[part=\"value\"]');" +
        "end.setAttribute('aria-label', 'End date');" +
        "end.removeAttribute('aria-labelledby');"
      );

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
