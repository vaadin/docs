package com.vaadin.demo.component.details;

import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.details.Details;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-full-source-line

@Route("details-basic")
public class DetailsBasic extends Div {

  public DetailsBasic() {
    // tag::snippet[]
    Details details = new Details("Expandable Details",
        new Text("Toggle using mouse, Enter and Space keys."));
    add(details);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<DetailsBasic> { // hidden-full-source-line
  } // hidden-full-source-line
}
