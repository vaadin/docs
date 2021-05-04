package com.vaadin.demo.component.accordion;

import com.vaadin.flow.component.accordion.Accordion;
import com.vaadin.flow.component.accordion.AccordionPanel;
import com.vaadin.flow.component.html.Anchor;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.dom.ElementConstants;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("accordion-content")
public class AccordionContent extends Div {

    public AccordionContent() {
        // tag::snippet[]
        Accordion accordion = new Accordion();

        accordion.add("Analytics", createContent(
            createStyledAnchor("#", "Dashboard"),
            createStyledAnchor("#", "Reports"),
            createStyledAnchor("#", "Data sources")
        ));
        // end::snippet[]

        accordion.add("Customers", createContent(
            createStyledAnchor("#", "Accounts"),
            createStyledAnchor("#", "Contacts")
        ));

        AccordionPanel financesPanel = new AccordionPanel();
        financesPanel.setSummaryText("Finances");
        financesPanel.addContent(createContent(
            createStyledAnchor("#", "Invoices"),
            createStyledAnchor("#", "Transactions"),
            createStyledAnchor("#", "Statements")
        ));
        accordion.add(financesPanel);

        add(accordion);
    }
    
    private VerticalLayout createContent(Anchor ...anchors) {
        VerticalLayout content = new VerticalLayout();
        content.setPadding(false);
        content.setSpacing(false);
        content.add(anchors);

        return content;
    }
    
    private Anchor createStyledAnchor(String href, String text) {
        Anchor anchor = new Anchor(href, text);
        anchor.getStyle().set(ElementConstants.STYLE_COLOR, "var(--lumo-primary-text-color)");
        anchor.getStyle().set("text-decoration", "none");

        return anchor;
    } 

    public static class Exporter extends DemoExporter<AccordionContent> { // hidden-source-line
    } // hidden-source-line
}
