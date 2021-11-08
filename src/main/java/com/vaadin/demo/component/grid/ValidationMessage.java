package com.vaadin.demo.component.grid;

import com.vaadin.flow.component.HasText;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;

class ValidationMessage extends HorizontalLayout implements HasText {

    private final Span span = new Span();

    public ValidationMessage() {
        setVisible(false);
        setAlignItems(Alignment.CENTER);
        getStyle().set("color", "var(--lumo-error-text-color)");
        getThemeList().clear();
        getThemeList().add("spacing-s");

        Icon icon = VaadinIcon.EXCLAMATION_CIRCLE_O.create();
        icon.setSize("16px");
        add(icon, span);
    }

    @Override
    public String getText() {
        return span.getText();
    }

    @Override
    public void setText(String text) {
        span.setText(text);
        this.setVisible(text != null && !text.isEmpty());
    }
}
