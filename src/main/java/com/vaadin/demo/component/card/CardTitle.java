package com.vaadin.demo.component.card;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.card.Card;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

@Route("card-title")
public class CardTitle extends Div {
    public CardTitle() {
        // tag::snippet[]
        Card card = new Card();

        card.setTitle(new Div("Lapland"));

        card.add("Lapland is the northern-most region of Finland and an active outdoor destination.");
        // end::snippet[]

        card.setMaxWidth("300px");
        add(card);
    }

    public static class Exporter extends DemoExporter<CardTitle> { // hidden-source-line
    } // hidden-source-line
}
