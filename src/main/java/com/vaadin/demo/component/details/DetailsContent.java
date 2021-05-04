package com.vaadin.demo.component.details;

import com.vaadin.flow.component.details.Details;
import com.vaadin.flow.component.html.Anchor;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.dom.ElementConstants;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("details-content")
public class DetailsContent extends Div {

  public DetailsContent() {
    // tag::snippet[]

    Details analyticsDetails = createDetails("Analytics",
      createStyledAnchor("#", "Dashboard"),
      createStyledAnchor("#", "Reports"),
      createStyledAnchor("#", "Data sources")
    );

    Details customersDetails = createDetails("Customers",
      createStyledAnchor("#", "Accounts"),
      createStyledAnchor("#", "Contacts")
    );

    Details financesDetails = createDetails("Finances",
      createStyledAnchor("#", "Invoices"),
      createStyledAnchor("#", "Transactions"),
      createStyledAnchor("#", "Statements")
    );

    add(analyticsDetails, customersDetails, financesDetails);
    // end::snippet[]
  }

  private Details createDetails(String summary, Anchor ...anchors) {
    Details details = new Details(summary, createContent(anchors));
    details.setOpened(true);

    return details;
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

  public static class Exporter extends DemoExporter<DetailsContent> { // hidden-source-line
  } // hidden-source-line
}
