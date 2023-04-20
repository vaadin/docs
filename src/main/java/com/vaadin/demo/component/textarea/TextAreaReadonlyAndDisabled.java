package com.vaadin.demo.component.textarea;

import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.TextArea;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("text-area-readonly-and-disabled")
public class TextAreaReadonlyAndDisabled extends HorizontalLayout {

    public TextAreaReadonlyAndDisabled() {
        setPadding(false);

        // tag::snippet[]
        TextArea readonlyArea = new TextArea();
        readonlyArea.setReadOnly(true);
        readonlyArea.setLabel("Read-only");
        readonlyArea.setValue("Value");

        TextArea disabledArea = new TextArea();
        disabledArea.setEnabled(false);
        disabledArea.setLabel("Disabled");
        // end::snippet[]
        readonlyArea.setWidthFull();
        disabledArea.setWidthFull();
        add(readonlyArea, disabledArea);
    }

    public static class Exporter extends DemoExporter<TextAreaReadonlyAndDisabled> { // hidden-source-line
    } // hidden-source-line
}
