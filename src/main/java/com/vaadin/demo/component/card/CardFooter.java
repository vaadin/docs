package com.vaadin.demo.component.card;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.card.Card;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

@Route("card-footer")
public class CardFooter extends Div {
    public CardFooter() {
        // tag::snippet[]
        Card card = new Card();
        card.setTitle(new Div("Lapland"));
        card.add("Lapland is the northern-most region of Finland and an active outdoor destination.");

        Button bookVacationButton = new Button("Book Vacation");
        Button learnMoreButton = new Button("Learn More");
        card.addToFooter(bookVacationButton, learnMoreButton);

        // end::snippet[]

        card.setHeight("240px");
        card.setMaxWidth("300px");
        add(card);
    }

    public static class Exporter extends DemoExporter<CardFooter> { // hidden-source-line
    } // hidden-source-line
}
