package com.vaadin.demo.buildingapps.passdata;

import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouteParam;
import com.vaadin.flow.router.RouteParameters;
import com.vaadin.flow.signals.Signal;

// tag::snippet[]
@Route("building-apps/pass-data/route-template/:id([0-9]{1,9})/:action?(view|edit)")
public class RouteTemplateView extends VerticalLayout {

    public enum Action {
        VIEW, EDIT
    }

    private static final String PARAM_ID = "id";
    private static final String PARAM_ACTION = "action";

    // Read each parameter reactively from the router state signal
    private final Signal<String> idParam = () -> UI.getCurrentOrThrow()
            .routerStateSignal().get().routeParameters().get(PARAM_ID)
            .orElse(null);

    private final Signal<Action> actionParam = () -> UI.getCurrentOrThrow()
            .routerStateSignal().get().routeParameters().get(PARAM_ACTION)
            .map(value -> Action.valueOf(value.toUpperCase()))
            .orElse(Action.VIEW);

    RouteTemplateView() {
        Paragraph idParagraph = new Paragraph();
        Paragraph actionParagraph = new Paragraph();
        add(idParagraph, actionParagraph);

        add(new Button("Set Parameter Values",
                e -> showView((int) (Math.random() * 1000),
                        Math.random() < 0.5 ? Action.VIEW : Action.EDIT)));

        // Bind the paragraphs to the parameter signals
        idParagraph.bindText(() -> "ID: " + idParam.get());
        actionParagraph.bindText(() -> "Action: " + actionParam.get());
    }

    // For use by other views navigating to this view
    public static void showView(int id, Action action) {
        var parameters = new RouteParameters(new RouteParam(PARAM_ID, id),
                new RouteParam(PARAM_ACTION, action.name().toLowerCase()));
        UI.getCurrentOrThrow().navigate(RouteTemplateView.class, parameters);
    }
}
// end::snippet[]
