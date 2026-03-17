package com.vaadin.demo.component.tooltip;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.shared.Tooltip;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("tooltip-manual")
public class TooltipManual extends Div {

    public TooltipManual() {
        TextField textField = new TextField();
        textField.setPlaceholder("Search");
        textField.setPrefixComponent(new Icon("lumo", "search"));
        Button button = new Button(new Icon(VaadinIcon.INFO_CIRCLE));
        button.addThemeVariants(ButtonVariant.TERTIARY);
        button.getStyle().set("padding", "0").set("border", "0")
                .set("min-width", "0").set("height", "1.25rem");
        textField.setSuffixComponent(button);
        // tag::snippet[]
        textField.setTooltipText("Wrap in “quotes” for exact phrase");
        Tooltip tooltip = textField.getTooltip().withManual(true);
        button.addClickListener(event -> {
            tooltip.setOpened(!tooltip.isOpened());
        });
        // end::snippet[]
        add(textField);
    }

    public static class Exporter extends DemoExporter<TooltipManual> { // hidden-source-line
    } // hidden-source-line
}
