package com.vaadin.demo.flow.binding;

import com.vaadin.flow.data.binder.Binder;

import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.textfield.TextField;

// tag::snippet[]
public class PersonEditor extends FormLayout {
    private Binder<BusinessPerson> binder;

    public PersonEditor(boolean readOnly) {
        // For binding the form to the data model
        binder = new Binder<>(BusinessPerson.class);

        TextField nameField = new TextField();
        addFormItem(nameField, "Name");
        binder.bind(nameField, BusinessPerson::getName,
            BusinessPerson::setName);
        nameField.setReadOnly(readOnly);

        TextField titleField = new TextField();
        addFormItem(titleField, "Title");
        binder.forField(titleField)
              .bind(BusinessPerson::getTitle,
                    BusinessPerson::setTitle);
        titleField.setReadOnly(readOnly);
    }

    public Binder<BusinessPerson> getBinder() {return binder;}
}
// end::snippet[]
