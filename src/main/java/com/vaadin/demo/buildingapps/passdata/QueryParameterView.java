package com.vaadin.demo.buildingapps.passdata;

import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.BeforeEnterEvent;
import com.vaadin.flow.router.BeforeEnterObserver;
import com.vaadin.flow.router.Route;

// tag::snippet[]
@Route("building-apps/pass-data/query-parameter")
public class QueryParameterView extends VerticalLayout
        implements BeforeEnterObserver {

    private final TextField filterField;

    QueryParameterView() {
        filterField = new TextField("Filter");
        add(filterField);

        filterField.addValueChangeListener(event -> {
            // @formatter:off hidden-source-line
            var queryParameters = UI.getCurrent()
                    .getActiveViewLocation()
                    .getQueryParameters()
                    .merging("filter", event.getValue());
            UI.getCurrent().navigate(
                    QueryParameterView.class,
                    queryParameters);
            // @formatter:on hidden-source-line
        });
    }

    @Override
    public void beforeEnter(BeforeEnterEvent event) {
        // @formatter:off hidden-source-line
        event.getLocation()
                .getQueryParameters()
                .getSingleParameter("filter")
                .ifPresent(filterField::setValue);
        // @formatter:on hidden-source-line
    }
}
// end::snippet[]
