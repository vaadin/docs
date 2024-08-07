package com.vaadin.demo.component.popover;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.popover.Popover;
import com.vaadin.flow.theme.lumo.LumoIcon;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("popover-arrow")
public class PopoverArrow extends Div {

    public PopoverArrow() {
        Icon icon = LumoIcon.BELL.create();
        Button button = new Button(icon);
        button.addThemeVariants(ButtonVariant.LUMO_ICON);
        button.setAriaLabel("Notifications");

        // tag::snippet[]
        Popover popover = new Popover();
        popover.getElement().setAttribute("theme", "arrow");
        // end::snippet[]

        popover.setTarget(button);
        Div content = new Div("No new notifications");
        popover.add(content);

        add(button, popover);
    }

    public static class Exporter extends DemoExporter<PopoverArrow> { // hidden-source-line
    } // hidden-source-line
}
