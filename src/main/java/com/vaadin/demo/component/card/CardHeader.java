package com.vaadin.demo.component.card;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.card.Card;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.router.Route;

@Route("card-header")
public class CardHeader extends Div {
    public CardHeader() {
        // tag::snippet[]
        Card card = new Card();

        Div header = new Div();
        header.getStyle().set("display", "flex")
                .set("flex-direction", "column-reverse")
                .set("line-height", "1.25");

        H2 title = new H2("Lapland");

        Div subtitle = new Div("The Exotic North");
        subtitle.getStyle().set("font-size", "0.8125rem").set("text-transform",
                "uppercase");

        header.add(title, subtitle);
        card.setHeader(header);

        card.add("Lapland is the northern-most region of Finland and an active outdoor destination.");
        // end::snippet[]

        card.setMaxWidth("300px");
        add(card);
    }

    public static class Exporter extends DemoExporter<CardHeader> { // hidden-source-line
    } // hidden-source-line
}
