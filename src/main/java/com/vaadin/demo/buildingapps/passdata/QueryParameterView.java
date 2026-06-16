package com.vaadin.demo.buildingapps.passdata;

import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.signals.Signal;

// tag::snippet[]
@Route("building-apps/pass-data/query-parameter")
public class QueryParameterView extends VerticalLayout {

    private static final String QUERY_PARAM_FILTER = "filter";

    // Read the query parameter reactively from the router state signal
    private final Signal<String> filterParam = () -> UI.getCurrentOrThrow()
            .routerStateSignal().get().location().getQueryParameters()
            .getSingleParameter(QUERY_PARAM_FILTER).orElse("");

    QueryParameterView() {
        var filterField = new TextField("Filter");
        add(filterField);

        // Two-way binding: the field shows the current value, and edits
        // update the URL through setFilter()
        filterField.bindValue(filterParam, this::setFilter);
    }

    private void setFilter(String filter) {
        var queryParameters = UI.getCurrentOrThrow().getActiveViewLocation()
                .getQueryParameters().merging(QUERY_PARAM_FILTER, filter);
        UI.getCurrentOrThrow().navigate(QueryParameterView.class,
                queryParameters);
    }
}
// end::snippet[]
