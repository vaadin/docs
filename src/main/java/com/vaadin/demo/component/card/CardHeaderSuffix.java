package com.vaadin.demo.component.card;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.badge.Badge;
import com.vaadin.flow.component.badge.BadgeVariant;
import com.vaadin.flow.component.card.Card;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

@Route("card-header-suffix")
public class CardHeaderSuffix extends Div {
    public CardHeaderSuffix() {
        // tag::snippet[]
        Card card = new Card();

        card.setTitle(new Div("Lapland"));
        card.setSubtitle(new Div("The Exotic North"));

        Badge badge = new Badge("Arctic");
        badge.addThemeVariants(BadgeVariant.SUCCESS);
        card.setHeaderSuffix(badge);

        card.add(new Div(
                "Lapland is the northern-most region of Finland and an active outdoor destination."));
        // end::snippet[]

        card.setMaxWidth("300px");
        add(card);
    }

    public static class Exporter extends DemoExporter<CardHeaderSuffix> { // hidden-source-line
    } // hidden-source-line
}
