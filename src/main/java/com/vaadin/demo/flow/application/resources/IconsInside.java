package com.vaadin.demo.flow.application.resources;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Label;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;

@Route("application-icons-inside")
public class IconsInside extends Div {
    private static final long serialVersionUID = 1L;

    public IconsInside() {
        // tag::snippet[]
        TextField field = new TextField("Street Address");
        field.setPrefixComponent(new Icon("vaadin:map-marker"));
        field.setSuffixComponent(new Icon("vaadin:building"));

        // Wrap the icon inside a composition
        HorizontalLayout helper = new HorizontalLayout();
        helper.add(new Icon("vaadin:info-circle-o"));
        helper.add(new Label("Here be help"));
        field.setHelperComponent(helper);

        add(field);
        // end::snippet[]
    }

    public static class IconsInsideExporter extends DemoExporter<IconsInside> { // hidden-source-line
    } // hidden-source-line    
}
