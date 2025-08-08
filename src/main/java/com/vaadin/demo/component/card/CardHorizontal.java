package com.vaadin.demo.component.card;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.avatar.Avatar;
import com.vaadin.flow.component.card.Card; // hidden-source-line
import com.vaadin.flow.component.card.CardVariant;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

@Route("card-horizontal")
public class CardHorizontal extends Div {
    public CardHorizontal() {
        // tag::snippet[]
        Card card = new Card();
        card.addThemeVariants(CardVariant.LUMO_HORIZONTAL);

        card.setMedia(new Avatar("Lapland"));
        card.setTitle(new Div("Lapland"));
        card.setSubtitle(new Div("The Exotic North"));
        card.add("Lapland is the northern-most region of Finland and an active outdoor destination.");
        // end::snippet[]

        card.setMaxWidth("300px");
        add(card);
    }

    public static class Exporter extends DemoExporter<CardHorizontal> { // hidden-source-line
    } // hidden-source-line
}
