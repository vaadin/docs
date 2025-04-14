package com.vaadin.demo.component.card;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.card.Card;
import com.vaadin.flow.component.card.CardVariant;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

@Route("card-outlined")
public class CardOutlined extends Div {
    public CardOutlined() {
        // tag::snippet[]
        Card card = new Card();
        card.addThemeVariants(CardVariant.LUMO_OUTLINED);

        card.setTitle(new Div("Lapland"));
        card.setSubtitle(new Div("The Exotic North"));
        card.add("Lapland is the northern-most region of Finland and an active outdoor destination.");
        // end::snippet[]

        card.setMaxWidth("300px");
        add(card);
    }

    public static class Exporter extends DemoExporter<CardOutlined> { // hidden-source-line
    } // hidden-source-line
}
