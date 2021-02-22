package com.vaadin.demo.flow.application.mainview;

import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.PageTitle;

@com.vaadin.flow.router.Route(value = "card-list", layout = MainView.class)
@PageTitle("Card List")
@JsModule("@vaadin/vaadin-lumo-styles/badge.js")
public class CardListView extends Div {

    public CardListView() {
        setId("card-list-view");
        addClassName("card-list-view");
        setSizeFull();
    }

    // NOTE This file is a stub!
    // It is currently only needed to have an item in a list, not for
    // anything functional.
}
