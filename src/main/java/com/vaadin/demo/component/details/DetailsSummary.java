package com.vaadin.demo.component.details;

import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.details.Details;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.dom.ElementConstants;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.domain.Country;
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("details-summary")
public class DetailsSummary extends Div {

  public DetailsSummary() {
    // tag::snippet[]
    HorizontalLayout summary = new HorizontalLayout();
    summary.setSpacing(false);
    
    Icon icon = VaadinIcon.EXCLAMATION_CIRCLE.create();
    icon.getStyle().set(ElementConstants.STYLE_WIDTH, "var(--lumo-icon-size-s)");
    icon.getStyle().set(ElementConstants.STYLE_HEIGHT, "var(--lumo-icon-size-s)");
    
    HorizontalLayout errorBadge = new HorizontalLayout(
      icon,
      new Span(" 2 errors")
    );
    errorBadge.setSpacing(false);
    errorBadge.getStyle().set(ElementConstants.STYLE_COLOR, "var(--lumo-error-text-color)");
    errorBadge.getStyle().set("margin-left", "var(--lumo-space-s)");

    summary.add(new Text("Contact information"), errorBadge);

    FormLayout content = new FormLayout();
    content.setResponsiveSteps(
      new FormLayout.ResponsiveStep("0", 1),
      new FormLayout.ResponsiveStep("20em", 2)
    );

    TextField address = new TextField("Address");
    address.setValue("4027 Amber Lake Canyon");
    content.add(address, 2);

    TextField zipCode = new TextField("ZIP code");
    zipCode.setRequired(true);
    content.add(zipCode);
    
    TextField city = new TextField("City");
    city.setRequired(true);
    content.add(city);
    
    ComboBox<Country> countries = new ComboBox<>("Country");
    countries.setItems(DataService.getCountries());
    countries.setItemLabelGenerator(Country::getName);
    content.add(countries);
    

    Details details = new Details(summary, content);
    details.setOpened(true);

    add(details);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<DetailsSummary> { // hidden-source-line
  } // hidden-source-line
}
