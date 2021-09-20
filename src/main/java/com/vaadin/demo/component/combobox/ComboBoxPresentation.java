package com.vaadin.demo.component.combobox;

import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.combobox.ComboBox.ItemFilter;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.data.renderer.LitRenderer;
import com.vaadin.flow.data.renderer.Renderer;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;

@Route("combo-box-presentation")
public class ComboBoxPresentation extends Div {

  public ComboBoxPresentation() {
    ItemFilter<Person> filter = (person, filterString) -> (person
        .getFirstName() + " " + person.getLastName() + " " + person.getProfession()).toLowerCase().indexOf(filterString.toLowerCase()) > -1;

    // tag::combobox[]
    ComboBox<Person> comboBox = new ComboBox<>("Choose doctor");
    comboBox.setItems(filter, DataService.getPeople());
    comboBox.setItemLabelGenerator(person -> person.getFirstName() + " " + person.getLastName());
    comboBox.setRenderer(createRenderer());
    comboBox.getStyle().set("--vaadin-combo-box-overlay-width", "16em");
    add(comboBox);
    // end::combobox[]
  }

  // tag::renderer[]
  // NOTE
  // We are using inline styles here to keep the example simple.
  // We recommend placing CSS in a separate style sheet and to
  // encapsulating the styling in a new component.

  private Renderer<Person> createRenderer() {
    StringBuilder tpl = new StringBuilder();
    tpl.append("<div style=\"display: flex;\">");
    tpl.append("  <img style=\"height: var(--lumo-size-m); margin-right: var(--lumo-space-s);\" src=\"${item.pictureUrl}\" alt=\"Portrait of ${item.firstName} ${item.lastName}\" />");
    tpl.append("  <div>");
    tpl.append("    ${item.firstName} ${item.lastName}");
    tpl.append("    <div style=\"font-size: var(--lumo-font-size-s); color: var(--lumo-secondary-text-color);\">${item.profession}</div>");
    tpl.append("  </div>");
    tpl.append("</div>");

    return LitRenderer.<Person>of(tpl.toString()).withProperty("pictureUrl", Person::getPictureUrl)
        .withProperty("firstName", Person::getFirstName).withProperty("lastName", Person::getLastName)
        .withProperty("profession", Person::getProfession);
  }
  // end::renderer[]

  public static class Exporter extends DemoExporter<ComboBoxPresentation> { // hidden-source-line
  } // hidden-source-line
}
