package com.vaadin.demo.component.card;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.card.Card;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.theme.lumo.LumoUtility;

@Route("card-header")
public class CardHeader extends Div {
    public CardHeader() {
        // tag::snippet[]
        Card card = new Card();

        Div header = new Div();
        header.addClassNames(
                LumoUtility.Display.FLEX,
                LumoUtility.FlexDirection.COLUMN_REVERSE,
                LumoUtility.LineHeight.XSMALL
        );

        H2 title = new H2("Lapland");

        Div subtitle = new Div("The Exotic North");
        subtitle.addClassNames(
                LumoUtility.TextTransform.UPPERCASE,
                LumoUtility.FontSize.XSMALL,
                LumoUtility.TextColor.SECONDARY
        );

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
