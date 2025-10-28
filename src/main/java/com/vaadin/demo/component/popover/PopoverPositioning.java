package com.vaadin.demo.component.popover;

import java.util.Arrays;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.popover.Popover;
import com.vaadin.flow.component.popover.PopoverPosition;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("popover-positioning")
public class PopoverPositioning extends VerticalLayout {

    public PopoverPositioning() {
        setPadding(true);
        setSpacing(true);
        setAlignItems(Alignment.CENTER);

        Button button = new Button("Open");
        button.getStyle().set("--vaadin-button-height", "3rem");
        button.getStyle().set("margin-top", "2rem");

        Select<PopoverPosition> select = new Select<>();
        select.setLabel("Position");
        select.setItems(Arrays.asList(PopoverPosition.values()));
        select.setValue(PopoverPosition.BOTTOM);

        select.setItemLabelGenerator((item) -> {
            String label = "";
            String[] parts = item.toString().split("_");
            for (String p : parts) {
                label += p.substring(0, 1) + p.substring(1).toLowerCase() + " ";
            }
            return label.trim();
        });

        Popover popover = new Popover();
        popover.setTarget(button);
        Div content = new Div("Popover content");
        popover.add(content);

        // tag::snippet[]
        select.addValueChangeListener(event -> {
            PopoverPosition position = event.getValue();
            popover.setPosition(position);
        });
        // end::snippet[]

        add(button, select, popover);
    }

    public static class Exporter extends DemoExporter<PopoverPositioning> { // hidden-source-line
    } // hidden-source-line
}
