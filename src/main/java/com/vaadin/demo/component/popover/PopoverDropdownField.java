package com.vaadin.demo.component.popover;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.TemporalAdjusters;

import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.popover.Popover;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.theme.lumo.LumoIcon;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("popover-dropdown-field")
public class PopoverDropdownField extends Div {

    private LocalDate from;
    private LocalDate to;

    private Select<String> rangeSelector;
    private DatePicker fromPicker;
    private DatePicker toPicker;
    private Popover popover;

    public PopoverDropdownField() {
        // tag::snippet[]
        TextField field = new TextField("Search date range");
        field.setWidth("340px");
        Icon icon = LumoIcon.DROPDOWN.create();
        field.setSuffixComponent(icon);

        popover = new Popover();
        popover.setModal(true);
        popover.setWidth("325px");
        popover.setAriaLabel("Select a date range");
        popover.setOpenOnFocus(true);
        popover.setFocusDelay(0);
        popover.setTarget(field);
        // end::snippet[]

        rangeSelector = new Select<>();
        rangeSelector.setLabel("Common ranges");
        rangeSelector.setPlaceholder("Select preset");
        rangeSelector.setWidth("100%");
        rangeSelector.setItems("Today", "Last week", "Last month",
                "Year to date", "Last year", "Past 5 years");
        rangeSelector.addValueChangeListener((e) -> {
            if (e.isFromClient()) {
                updateRange(e.getValue());
            }
        });

        fromPicker = new DatePicker("From");
        fromPicker.setWidth("150px");
        fromPicker.addValueChangeListener((e) -> {
            from = e.getValue();
            updateValue(field);
            if (e.isFromClient()) {
                rangeSelector.setValue("");
            }
        });

        toPicker = new DatePicker("To");
        toPicker.setWidth("150px");
        toPicker.addValueChangeListener((e) -> {
            to = e.getValue();
            updateValue(field);
            if (e.isFromClient()) {
                rangeSelector.setValue("");
            }
        });

        HorizontalLayout layout = new HorizontalLayout(fromPicker, new Div("−"),
                toPicker);
        layout.setSpacing(false);
        layout.getThemeList().add("spacing-s");
        layout.setAlignItems(FlexComponent.Alignment.BASELINE);

        popover.add(rangeSelector, layout);

        add(field, popover);
    }

    private void updateValue(TextField field) {
        field.setValue(from != null && to != null
                ? from.toString() + " - " + to.toString()
                : "");
    }

    private void updateRange(String value) {
        LocalDate today = LocalDate.now(ZoneId.systemDefault());
        to = today;
        toPicker.setValue(to);

        switch (value) {
        case "Today":
            from = today;
            break;
        case "Last week":
            from = today.minusWeeks(1);
            break;
        case "Last month":
            from = today.minusMonths(1);
            break;
        case "Year to date":
            from = today.with(TemporalAdjusters.firstDayOfYear());
            break;
        case "Last year":
            from = today.minusYears(1);
            break;
        case "Past 5 years":
            from = today.minusYears(5);
            break;
        }

        fromPicker.setValue(from);
        popover.setOpened(false);
    }

    public static class Exporter extends DemoExporter<PopoverDropdownField> { // hidden-source-line
    } // hidden-source-line
}
