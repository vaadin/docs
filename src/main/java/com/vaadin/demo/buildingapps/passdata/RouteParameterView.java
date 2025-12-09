package com.vaadin.demo.buildingapps.passdata;

import org.jspecify.annotations.Nullable;

import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.BeforeEvent;
import com.vaadin.flow.router.HasUrlParameter;
import com.vaadin.flow.router.OptionalParameter;
import com.vaadin.flow.router.Route;

// tag::snippet[]
@Route("building-apps/pass-data/route-parameter")
public class RouteParameterView extends VerticalLayout
        implements HasUrlParameter<String> {

    private final Paragraph parameterValue;

    RouteParameterView() {
        parameterValue = new Paragraph();
        add(parameterValue);
        add(new Button("Set Parameter Value", e -> showView("Hello"
                + System.currentTimeMillis())));
    }

    @Override
    public void setParameter(BeforeEvent event,
            @OptionalParameter String parameter) {
        if (parameter == null) {
            parameterValue.setText("No parameter value provided.");
        } else {
            parameterValue.setText("Parameter value: " + parameter);
        }
    }

    public static void showView(@Nullable String parameterValue) {
        UI.getCurrent().navigate(RouteParameterView.class, parameterValue);
    }
}
// end::snippet[]