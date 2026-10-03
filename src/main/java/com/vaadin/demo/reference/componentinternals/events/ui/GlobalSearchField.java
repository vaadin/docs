package com.vaadin.demo.reference.componentinternals.events.ui;

import com.vaadin.flow.component.ComponentUtil;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.value.ValueChangeMode;

public class GlobalSearchField extends TextField {

    public GlobalSearchField() {
        setPlaceholder("Search");
        setValueChangeMode(ValueChangeMode.LAZY);
        addValueChangeListener(event -> getUI().ifPresent(
                ui -> ComponentUtil.fireEvent(ui,
                        new SearchEvent(this, event.getValue()))));
    }
}
