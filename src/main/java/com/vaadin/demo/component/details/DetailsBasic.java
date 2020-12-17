package com.vaadin.demo.component.details;

import com.vaadin.flow.component.details.Details;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-full-source-line

@Route("details-basic")
public class DetailsBasic extends Div {

  public DetailsBasic() {
    // tag::snippet[]
    VerticalLayout content = new VerticalLayout(
      new Span("Sophia Williams"),
      new Span("sophia.williams@company.com"),
      new Span("(501) 555-9128")
    );
    content.setSpacing(false);
    content.setPadding(false);

    Details details = new Details("Contact Information",
        content);
    details.setOpened(true);

    add(details);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<DetailsBasic> { // hidden-full-source-line
  } // hidden-full-source-line
}
