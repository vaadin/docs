package com.vaadin.demo.fusion.forms.fieldstrategy;

import com.vaadin.flow.server.connect.Endpoint;

@Endpoint
public class SamplePersonEndpoint {
  // other endpoint methods: read, delete, ...

  public void savePerson(SamplePerson person) {
    // persistently store the contact
  }
}
