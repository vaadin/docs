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
        // Icon button using an aria-label to provide textual alternative
        // to screen readers
        Button plusButton = new Button(new Icon(VaadinIcon.PLUS));
        plusButton.addThemeVariants(ButtonVariant.LUMO_ICON);
        plusButton.getElement().setAttribute("aria-label", "Add item");

        // Icon button using a tooltip to provide textual alternative
        // to screen readers, as well as when hovering the button with
        // a pointing device, or focusing the button using keyboard
        Button closeButton = new Button(new Icon(VaadinIcon.CLOSE_SMALL));
        closeButton.addThemeVariants(ButtonVariant.LUMO_ICON);
        closeButton.setTooltipText("Close");

        Button arrowLeftButton = new Button("Left",
                new Icon(VaadinIcon.ARROW_LEFT));

        Button arrowRightButton = new Button("Right",
                new Icon(VaadinIcon.ARROW_RIGHT));
        arrowRightButton.setIconAfterText(true);
        // end::snippet[]

        HorizontalLayout horizontalLayout = new HorizontalLayout(plusButton,
                closeButton, arrowLeftButton, arrowRightButton);
        add(horizontalLayout);
    }

    public static class Exporter extends DemoExporter<ButtonIcons> { // hidden-source-line
    } // hidden-source-line
}
