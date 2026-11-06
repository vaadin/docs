package com.vaadin.demo.component.switchcomponent;

import com.vaadin.flow.component.checkbox.Switch;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("switch-readonly-and-disabled")
public class SwitchReadonlyAndDisabled extends VerticalLayout {

    public SwitchReadonlyAndDisabled() {
        setPadding(false); // hidden-source-line

        // tag::snippet[]
        Switch auditLog = new Switch("Audit log retention (90 days)");
        auditLog.setValue(true);
        auditLog.setReadOnly(true);
        auditLog.setHelperText("Included on the Business plan");

        Switch dailyDigest = new Switch("Daily digest");
        dailyDigest.setEnabled(false);

        add(auditLog, dailyDigest);
        // end::snippet[]
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<SwitchReadonlyAndDisabled> { // hidden-source-line
    } // hidden-source-line
}
