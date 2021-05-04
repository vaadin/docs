package com.vaadin.demo.flow.application.resources;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;


@Route("application-icons-basic")
public class IconsBasic extends Div {
    private static final long serialVersionUID = 1L;

    public IconsBasic() {
        // tag::snippet[]
        Icon icon = new Icon("vaadin:moon");
        add(icon);
        // end::snippet[]
    }

    public static class IconsBasicExporter extends DemoExporter<IconsBasic> { // hidden-source-line
    } // hidden-source-line    
}
