package com.vaadin.demo.buildingapps.passdata;

import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.BeforeEnterEvent;
import com.vaadin.flow.router.BeforeEnterObserver;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouteParam;
import com.vaadin.flow.router.RouteParameters;

// tag::snippet[]
@Route("building-apps/pass-data/route-template/:id([0-9]{1,9})/:action?(view|edit)")
public class RouteTemplateView extends VerticalLayout
        implements BeforeEnterObserver {

    public enum Action {
        VIEW, EDIT
    }

    private final Paragraph parameterValues;

    RouteTemplateView() {
        parameterValues = new Paragraph();
        add(parameterValues);
        add(new Button("Set Parameter Values",
                e -> showView((int) (Math.random() * 1000),
                        Math.random() < 0.5 ? Action.VIEW : Action.EDIT)));
    }

    @Override
    public void beforeEnter(BeforeEnterEvent event) {
        var id = event.getRouteParameters().getInteger("id").orElseThrow();
        var action = event.getRouteParameters().get("action")
                .map(a -> Action.valueOf(a.toUpperCase())).orElse(Action.VIEW);
        parameterValues.setText(
                "Parameter values: id = " + id + ", action = " + action);
    }

    public static void showView(int id, Action action) {
        var parameters = new RouteParameters(new RouteParam("id", id),
                new RouteParam("action", action.name()));
        UI.getCurrent().navigate(RouteTemplateView.class, parameters);
    }
}
// end::snippet[]