package com.vaadin.demo.component.card;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.card.Card;
import com.vaadin.flow.component.card.CardVariant;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.streams.DownloadHandler;

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

        DownloadHandler imageHandler = DownloadHandler.forClassResource(
                getClass(), "/images/lapland.avif", "lapland.avif");
        Image image = new Image(imageHandler, "");
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
