package com.vaadin.demo.component.combobox;

import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.combobox.ComboBox.ItemFilter;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.data.renderer.TemplateRenderer;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-full-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;

@Route("combo-box-presentation")
public class ComboBoxPresentation extends Div {

  // tag::snippet[]
  public ComboBoxPresentation() {

    ItemFilter<Person> filter = (person, filterString) -> (person
        .getFirstName() + " " + person.getLastName() + " " + person.getProfession()).toLowerCase().indexOf(filterString.toLowerCase()) > -1;

    ComboBox<Person> comboBox = new ComboBox<>("Choose doctor");
    comboBox.setItems(filter, DataService.getPeople());
    comboBox.setItemLabelGenerator(person -> person.getFirstName() + " " + person.getLastName());
    comboBox.setRenderer(getRenderer());
    comboBox.getStyle().set("--vaadin-combo-box-overlay-width", "250px");
    add(comboBox);
  }

  private TemplateRenderer<Person> getRenderer() {
    StringBuilder tpl = new StringBuilder();
    tpl.append("<div style=\"display: flex;\">");
    tpl.append("  <img style=\"height: 2em\" src=\"[[item.pictureUrl]]\" alt=\"User avatar\" />");
    tpl.append("  <div>");
    tpl.append("    [[item.firstName]] [[item.lastName]]");
    tpl.append("    <div>[[item.profession]]</div>");
    tpl.append("  </div>");
    tpl.append("</div>");

    return TemplateRenderer.<Person>of(tpl.toString()).withProperty("pictureUrl", Person::getPictureUrl)
        .withProperty("firstName", Person::getFirstName).withProperty("lastName", Person::getLastName)
        .withProperty("profession", Person::getProfession);
  }
  // end::snippet[]

  public static class Exporter extends DemoExporter<ComboBoxPresentation> { // hidden-full-source-line
  } // hidden-full-source-line
}
