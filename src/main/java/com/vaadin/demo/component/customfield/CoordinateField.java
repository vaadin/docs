package com.vaadin.demo.component.customfield;

import com.vaadin.flow.component.customfield.CustomField;
import com.vaadin.flow.component.html.Input;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;

// tag::snippet[]
public class CoordinateField extends CustomField<String> {

  private Input longitude;
  private Input latitude;
  private HorizontalLayout layout;

  public CoordinateField() {
    longitude = new Input();
    longitude.setPlaceholder("Longitude");

    latitude = new Input();
    latitude.setPlaceholder("Latitude");

    layout = new HorizontalLayout();

    layout.add(longitude, latitude);

    setLabel("Coordinate");

    add(layout);
  }

  @Override
  protected String generateModelValue() {
    return longitude.getValue() + "," + latitude.getValue();
  }

  @Override
  protected void setPresentationValue(String coordinate) {
    String[] parts = coordinate.split(",");
    longitude.setValue(parts[0]);
    latitude.setValue(parts[1]);
  }
}
// end::snippet[]
