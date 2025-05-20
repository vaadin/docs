package com.vaadin.demo.component.card;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.card.Card;
import com.vaadin.flow.component.card.CardVariant;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.StreamResource;
import com.vaadin.flow.theme.lumo.LumoIcon;

@Route("card-cover-media")
public class CardCoverMedia extends Div {
    public CardCoverMedia() {
        Div layout = new Div();
        layout.getStyle().set("display", "grid")
                .set("grid-template-columns", "repeat(auto-fill, minmax(200px, 1fr))")
                .set("gap", "1em");

        // tag::snippet[]
        // Card with cover image
        Card imageCard = new Card();
        imageCard.addThemeVariants(CardVariant.LUMO_COVER_MEDIA);

        StreamResource imageResource = new StreamResource("lapland.avif",
                () -> getClass().getResourceAsStream("/images/lapland.avif"));
        Image image = new Image(imageResource, "");
        imageCard.setMedia(image);

        imageCard.setTitle(new Div("Lapland"));
        imageCard.setSubtitle(new Div("The Exotic North"));
        imageCard.add("Lapland is the northern-most region of Finland and an active outdoor destination.");

        // Card with cover icon
        Card iconCard = new Card();
        iconCard.addThemeVariants(CardVariant.LUMO_COVER_MEDIA);

        Icon icon = LumoIcon.PHOTO.create();
        icon.getStyle()
                .setColor("var(--lumo-primary-color)")
                .setBackgroundColor("var(--lumo-primary-color-10pct)");
        iconCard.setMedia(icon);

        iconCard.setTitle(new Div("Lapland"));
        iconCard.setSubtitle(new Div("The Exotic North"));
        iconCard.add("Lapland is the northern-most region of Finland and an active outdoor destination.");
        // end::snippet[]

        layout.add(imageCard, iconCard);
        add(layout);
    }

    public static class Exporter extends DemoExporter<CardCoverMedia> { // hidden-source-line
    } // hidden-source-line
}
