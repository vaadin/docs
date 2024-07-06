package com.vaadin.demo.fusion.forms;

import com.vaadin.hilla.Endpoint;

@Endpoint
public class ContactEndpoint {
  // other endpoint methods: read, delete, ...

  public void saveContact(Contact contact) {
    // persistently store the contact
  }
}
