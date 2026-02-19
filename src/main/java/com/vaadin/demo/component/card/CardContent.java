package com.vaadin.demo.component.card;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.card.Card;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.router.Route;

@Route("card-content")
public class CardContent extends Div {
    public CardContent() {
        // tag::snippet[]
        Card card = new Card();

        Paragraph p1 = new Paragraph(
                """
                        Lapland is the northern-most region of Finland and an active outdoor destination that's \
                        known for its incredible, year-round light phenomena, vast arctic nature, and Santa Claus.
                        """);

        Paragraph p2 = new Paragraph(
                """
                        The land of the indigenous Sámi people, known as Sámi homeland or Sápmi, also crosses the \
                        northern part of the region.
                        """);

        card.add(p1, p2);
        // end::snippet[]

        card.setMaxWidth("300px");
        add(card);
    }

    public static class Exporter extends DemoExporter<CardContent> { // hidden-source-line
    } // hidden-source-line
}
