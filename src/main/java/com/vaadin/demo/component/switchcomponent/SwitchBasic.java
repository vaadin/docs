package com.vaadin.demo.component.switchcomponent;

import com.vaadin.flow.component.checkbox.Switch;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("switch-basic")
public class SwitchBasic extends Div {

    public SwitchBasic() {
        // tag::snippet[]
        Switch notifications = new Switch("Notifications");

        add(notifications);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<SwitchBasic> { // hidden-source-line
    } // hidden-source-line
}
