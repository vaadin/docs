package com.vaadin.demo.fusion.forms.fieldstrategy;

import dev.hilla.Endpoint;

@Endpoint
public class SamplePersonEndpoint {
  // other endpoint methods: read, delete, ...

  public void savePerson(SamplePerson person) {
    // persistently store the contact
  }
}
