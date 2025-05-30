package com.vaadin.demo.component.card;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.card.Card;
import com.vaadin.flow.component.card.CardVariant;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.dom.Style.Display;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.theme.lumo.LumoUtility;

@Route("card-variants")
public class CardVariants extends Div {
    public CardVariants() {
        // tag::snippet[]
        Card cardDefault = new Card();

        Card cardOutlined = new Card();
        cardOutlined.addThemeVariants(CardVariant.LUMO_OUTLINED);        

        Card cardElevated = new Card();
        cardElevated.addThemeVariants(CardVariant.LUMO_ELEVATED);
        
        // end::snippet[]

        cardDefault.setTitle("Default");
        cardDefault.add("This is the default card style.");
        
        cardOutlined.setTitle("Outlined");
        cardOutlined.add("Adds a solid outline around the card.");
        
        cardElevated.setTitle("Elevated");
        cardElevated.add("This variant works better on a shaded background.");

        Div cardVariantsLayout = new Div(cardDefault, cardOutlined, cardElevated);
        cardVariantsLayout.addClassNames(LumoUtility.Gap.MEDIUM, LumoUtility.Display.GRID);
        cardVariantsLayout.getStyle().set("grid-template-columns", "repeat(auto-fit, minmax(12ch, 1fr))");
        
        add(cardVariantsLayout);
    }

    public static class Exporter extends DemoExporter<CardVariants> { // hidden-source-line
    } // hidden-source-line
}
