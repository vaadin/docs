package com.vaadin.demo.component.popover;

import com.vaadin.flow.component.html.Anchor;
import com.vaadin.flow.component.html.AnchorTarget;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.popover.Popover;
import com.vaadin.flow.component.popover.PopoverPosition;
import com.vaadin.flow.component.popover.PopoverVariant;
import com.vaadin.flow.component.textfield.IntegerField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("popover-interactive-tooltip")
public class PopoverInteractiveTooltip extends Div {

    public PopoverInteractiveTooltip() {
        // tag::snippet[]
        IntegerField cvv = new IntegerField("CVV");
        cvv.setWidth("60px");

        Popover popover = new Popover();
        popover.addThemeVariants(PopoverVariant.ARROW);
        popover.setPosition(PopoverPosition.TOP);
        popover.setOpenOnClick(false);
        popover.setOpenOnHover(true);
        popover.setOpenOnFocus(true);

        H3 header = new H3("Card Verification Value");
        header.setId("cvv-heading");
        header.getStyle().set("margin", "0");
        header.getStyle().set("font-size", "1rem");

        Div content = new Div(
                "A three or four digit code, usually printed on the back of the card, "
                        + "next to, or at the end of, the signature strip.");
        content.getStyle().set("max-width", "300px");

        Anchor link = new Anchor("https://www.cvvnumber.com/cvv.html",
                "See where to find CVV on different cards", AnchorTarget.BLANK);

        popover.add(header, content, link);
        popover.setAriaLabelledBy("cvv-heading");
        popover.setTarget(cvv);

        add(cvv, popover);
        // end::snippet[]
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<PopoverInteractiveTooltip> { // hidden-source-line
    } // hidden-source-line
}
