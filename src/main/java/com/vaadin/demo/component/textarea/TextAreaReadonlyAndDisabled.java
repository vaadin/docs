package com.vaadin.demo.component.textarea;

import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.textfield.TextArea;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("text-area-readonly-and-disabled")
public class TextAreaReadonlyAndDisabled extends FormLayout {

    public TextAreaReadonlyAndDisabled() {
        setAutoResponsive(true);
        setAutoRows(true);

        // tag::snippet[]
        TextArea readonlyArea = new TextArea();
        readonlyArea.setReadOnly(true);
        readonlyArea.setLabel("Read-only");
        readonlyArea.setValue("Value");

        TextArea disabledArea = new TextArea();
        disabledArea.setEnabled(false);
        disabledArea.setLabel("Disabled");
        // end::snippet[]
        add(readonlyArea, disabledArea);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<TextAreaReadonlyAndDisabled> { // hidden-source-line
    } // hidden-source-line
}
