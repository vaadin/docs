package com.vaadin.demo.component.card;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.avatar.Avatar;
import com.vaadin.flow.component.card.Card;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.streams.DownloadHandler;
import com.vaadin.flow.theme.lumo.LumoIcon;

@Route("card-media")
public class CardMedia extends Div {
    public CardMedia() {
        Div layout = new Div();
        layout.getStyle().set("display", "grid")
                .set("grid-template-columns", "repeat(auto-fill, minmax(190px, 1fr))")
                .set("gap", "1em");

        // tag::snippet[]
        // Card with image media
        Card imageCard = new Card();
        DownloadHandler imageHandler = DownloadHandler.forClassResource(
                getClass(), "/images/lapland.avif", "lapland.avif");
        Image image = new Image(imageHandler, "");
        image.setWidth("100px");
        imageCard.setMedia(image);
        imageCard.add("Lapland is the northern-most region of Finland and an active outdoor destination.");

        // Card with icon media
        Card iconCard = new Card();
        Icon icon = LumoIcon.PHOTO.create();
        iconCard.setMedia(icon);
        iconCard.add("Lapland is the northern-most region of Finland and an active outdoor destination.");

        // Card with avatar media
        Card avatarCard = new Card();
        Avatar avatar = new Avatar("Lapland");
        avatarCard.setMedia(avatar);
        avatarCard.add("Lapland is the northern-most region of Finland and an active outdoor destination.");
        // end::snippet[]

        layout.add(imageCard, iconCard, avatarCard);
        add(layout);
    }

    public static class Exporter extends DemoExporter<CardMedia> { // hidden-source-line
    } // hidden-source-line
}
