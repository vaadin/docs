package com.vaadin.demo.component.card;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.avatar.Avatar;
import com.vaadin.flow.component.card.Card;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

@Route("card-header-prefix")
public class CardHeaderPrefix extends Div {
    public CardHeaderPrefix() {
        // tag::snippet[]
        Card card = new Card();

        card.setHeaderPrefix(new Avatar("Lapland"));

        card.setTitle(new Div("Lapland"));
        card.setSubtitle(new Div("The Exotic North"));

        card.add(
                "Lapland is the northern-most region of Finland and an active outdoor destination.");
        // end::snippet[]

        card.setMaxWidth("300px");
        add(card);
    }

    public static class Exporter extends DemoExporter<CardHeaderPrefix> { // hidden-source-line
    } // hidden-source-line
}
