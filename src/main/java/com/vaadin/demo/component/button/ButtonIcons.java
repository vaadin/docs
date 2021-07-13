package com.vaadin.demo.component.button;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("button-icons")
public class ButtonIcons extends Div {
    public ButtonIcons() {
        // tag::snippet[]
        Button plusButton = new Button(new Icon(VaadinIcon.PLUS));
        plusButton.addThemeVariants(ButtonVariant.LUMO_ICON);
        plusButton.getElement().setAttribute("aria-label", "Add item");

        Button closeButton = new Button(new Icon(VaadinIcon.CLOSE_SMALL));
        closeButton.addThemeVariants(ButtonVariant.LUMO_ICON);
        closeButton.getElement().setAttribute("aria-label", "Close");

        Button arrowLeftButton = new Button("Left", new Icon(VaadinIcon.ARROW_LEFT));

        Button arrowRightButton = new Button("Right", new Icon(VaadinIcon.ARROW_RIGHT));
        arrowRightButton.setIconAfterText(true);
        // end::snippet[]

        HorizontalLayout horizontalLayout = new HorizontalLayout(plusButton, closeButton, arrowLeftButton, arrowRightButton);
        add(horizontalLayout);
    }

    public static class Exporter extends DemoExporter<ButtonIcons> { // hidden-source-line
    } // hidden-source-line
}