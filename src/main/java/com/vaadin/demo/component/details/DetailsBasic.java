package com.vaadin.demo.component.details;

import com.vaadin.flow.component.details.Details;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("details-basic")
public class DetailsBasic extends Div {

  public DetailsBasic() {
    // tag::snippet[]
    Span name = new Span("Sophia Williams");
    Span email = new Span("sophia.williams@company.com");
    Span phone = new Span("(501) 555-9128");
    
    VerticalLayout content = new VerticalLayout(name, email, phone);
    content.setSpacing(false);
    content.setPadding(false);

    Details details = new Details("Contact information", content);
    details.setOpened(true);

    add(details);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<DetailsBasic> { // hidden-source-line
  } // hidden-source-line
}
