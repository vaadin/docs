package com.vaadin.demo.component.popover;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.popover.Popover;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("popover-modal")
public class PopoverModal extends Div {

    public PopoverModal() {
        // tag::snippet[]
        Popover popover = new Popover();
        popover.setModal(true);
        popover.setBackdropVisible(true);
        // end::snippet[]
        TextField code = new TextField("Discount code");
        Button apply = new Button("Apply");
        popover.add(code, apply);

        Button button = new Button("Discount");
        popover.setTarget(button);

        add(button, popover);
    }

    public static class Exporter extends DemoExporter<PopoverModal> { // hidden-source-line
    } // hidden-source-line
}
