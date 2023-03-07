package com.vaadin.demo.component.formlayout;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.joda.time.LocalDate;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.customfield.CustomField;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.router.Route;

@Route("form-layout-custom-field")
public class FormLayoutCustomField extends Div {
    // tag::snippet[]
    public class ExpirationField extends CustomField<String> {
        private final List<String> MONTHS = IntStream.range(1, 13)
                .mapToObj(month -> String.format("%02d", month))
                .collect(Collectors.toList());
        private final List<String> YEARS = IntStream
                .range(LocalDate.now().getYear(),
                        LocalDate.now().getYear() + 11)
                .mapToObj(year -> Integer.toString(year))
                .collect(Collectors.toList());

        private final Select<String> month = new Select<String>();
        private final Select<String> year = new Select<String>();

        public ExpirationField() {
            HorizontalLayout layout = new HorizontalLayout();
            layout.setPadding(false);
            layout.setSpacing(false);
            layout.getThemeList().add("spacing-xs");

            month.setItems(MONTHS);
            month.setPlaceholder("Month");
            // Set title for screen readers
            month.getElement().executeJs(
                    "this.focusElement.setAttribute('title', 'Month');");
            layout.add(month);

            year.setItems(YEARS);
            year.setPlaceholder("Year");
            year.getElement().executeJs(
                    "this.focusElement.setAttribute('title', 'Year');");
            layout.add(year);

            add(layout);
        }

        @Override
        protected String generateModelValue() {
            String monthValue = month.getValue();
            String yearValue = year.getValue();

            if (monthValue == month.getEmptyValue()
                    || yearValue == year.getEmptyValue()) {
                return null;
            }

            return String.join("/", monthValue.toString(),
                    yearValue.toString());
        }

        @Override
        protected void setPresentationValue(String expiration) {
            if (expiration == null) {
                month.setValue(null);
                year.setValue(null);
            } else {
                String[] expirationParts = expiration.split("/");
                month.setValue(expirationParts[0]);
                year.setValue(expirationParts[1]);
            }

        }
    }

    public FormLayoutCustomField() {
        FormLayout formLayout = new FormLayout();
        formLayout.addFormItem(new ExpirationField(), "Expiration");
        add(formLayout);
    }
    // end::snippet[]

    public static class Exporter extends DemoExporter<FormLayoutCustomField> { // hidden-source-line
    } // hidden-source-line
}
