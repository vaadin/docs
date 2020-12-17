package com.vaadin.demo.component.details;

import com.vaadin.flow.component.details.Details;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.ListItem;
import com.vaadin.flow.component.html.UnorderedList;
import com.vaadin.flow.router.Route;

import com.vaadin.demo.DemoExporter; // hidden-full-source-line

@Route("details-filled")
public class DetailsFilled extends Div {

  public DetailsFilled() {
    // tag::snippet[]
    UnorderedList content = new UnorderedList(
      new ListItem("Blake Martin"),
      new ListItem("Caroline Clark"),
      new ListItem("Avery Torres"),
      new ListItem("Khloe Scott"),
      new ListItem("Camila Fisher"),
      new ListItem("Gavin Lewis"),
      new ListItem("Isabella Powell"),
      new ListItem("Zoe Wilson")
    );

    Details details = new Details("Members (8)",
        content);
    details.setOpened(true);
    details.setThemeName("filled");

    add(details);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<DetailsFilled> { // hidden-full-source-line
  } // hidden-full-source-line
}
