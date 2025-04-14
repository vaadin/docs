package com.vaadin.demo.component.card;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.card.Card;
import com.vaadin.flow.component.card.CardVariant;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.StreamResource;

@Route("card-combine-variants")
public class CardCombineVariants extends Div {
    public CardCombineVariants() {
        // tag::snippet[]
        Card card = new Card();
        card.addThemeVariants(
                CardVariant.LUMO_OUTLINED,
                CardVariant.LUMO_ELEVATED,
                CardVariant.LUMO_HORIZONTAL,
                CardVariant.LUMO_COVER_MEDIA
        );

        StreamResource imageResource = new StreamResource("lapland.avif",
                () -> getClass().getResourceAsStream("/images/lapland.avif"));
        Image image = new Image(imageResource, "");
        image.setWidth("200px");
        card.setMedia(image);

        card.setTitle(new Div("Lapland"));
        card.setSubtitle(new Div("The Exotic North"));
        card.add(new Div("Lapland is the northern-most region of Finland and an active outdoor destination."));
        // end::snippet[]

        add(card);
    }

    public static class Exporter extends DemoExporter<CardCombineVariants> { // hidden-source-line
    } // hidden-source-line
}
