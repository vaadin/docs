package com.vaadin.demo.fusion.forms.fieldstrategy;

import dev.hilla.BrowserCallable;

@BrowserCallable
public class SamplePersonEndpoint {
  // other browser-callable methods: read, delete, ...

  public void savePerson(SamplePerson person) {
    // persistently store the contact
  }
}
