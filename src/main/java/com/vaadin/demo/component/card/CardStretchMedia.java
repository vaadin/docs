package com.vaadin.demo.component.card;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.card.Card;
import com.vaadin.flow.component.card.CardVariant;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.streams.DownloadHandler;
import com.vaadin.flow.theme.lumo.LumoIcon;

@Route("card-stretch-media")
public class CardStretchMedia extends Div {
    public CardStretchMedia() {
        Div layout = new Div();
        layout.getStyle().set("display", "grid")
                .set("grid-template-columns",
                        "repeat(auto-fill, minmax(200px, 1fr))")
                .set("gap", "1em");

        // tag::snippet[]
        // Card with stretched image
        Card imageCard = new Card();
        imageCard.addThemeVariants(CardVariant.LUMO_STRETCH_MEDIA);

        DownloadHandler imageHandler = DownloadHandler.forClassResource(
                getClass(), "/images/lapland.avif", "lapland.avif");
        Image image = new Image(imageHandler, "");
        imageCard.setMedia(image);

        imageCard.setTitle(new Div("Lapland"));
        imageCard.setSubtitle(new Div("The Exotic North"));
        imageCard.add(
                "Lapland is the northern-most region of Finland and an active outdoor destination.");

        // Card with stretched icon
        Card iconCard = new Card();
        iconCard.addThemeVariants(CardVariant.LUMO_STRETCH_MEDIA);

        Icon icon = LumoIcon.PHOTO.create();
        icon.getStyle().setBackgroundColor("rgba(0, 0, 0, 0.2)");
        iconCard.setMedia(icon);

        iconCard.setTitle(new Div("Lapland"));
        iconCard.setSubtitle(new Div("The Exotic North"));
        iconCard.add(
                "Lapland is the northern-most region of Finland and an active outdoor destination.");
        // end::snippet[]

        layout.add(imageCard, iconCard);
        add(layout);
    }

    public static class Exporter extends DemoExporter<CardStretchMedia> { // hidden-source-line
    } // hidden-source-line
}
