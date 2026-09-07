package com.vaadin.demo.fusion.forms;

import com.vaadin.hilla.BrowserCallable;

@BrowserCallable
public class ContactService {
    // other endpoint methods: read, delete, ...

    public void saveContact(Contact contact) {
        // persistently store the contact
    }
}
