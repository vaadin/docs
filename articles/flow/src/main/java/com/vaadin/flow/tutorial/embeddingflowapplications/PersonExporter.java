package com.vaadin.flow.tutorial.embeddingflowapplications;

import com.vaadin.flow.component.WebComponentExporter;
import com.vaadin.flow.component.webcomponent.PropertyConfiguration;
import com.vaadin.flow.component.webcomponent.WebComponent;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("embedding-flow-applications/tutorial-webcomponent-properties"
        + ".asciidoc")
public class PersonExporter
        extends WebComponentExporter<PersonComponent> {
    private PropertyConfiguration<PersonComponent,
            Boolean> isAdultProperty;

    public PersonExporter() {
        super("person-display");
        addProperty("name", "John Doe")
                .onChange(PersonComponent::setName);
        addProperty("age", 0)
                .onChange(PersonComponent::setAge);

        isAdultProperty = addProperty("is-adult",
                false);
    }

    @Override
    protected void configureInstance(
            WebComponent<PersonComponent> webComponent,
            PersonComponent component) {
        component.setAdultAge(18); // initialization

        component.addAgeChangedListener(event -> {
            webComponent.setProperty(isAdultProperty,
                    component.isAdult());
        });
        component.addAgeChangedListener(event -> {
            if (event.getAge() > 65) {
                webComponent.fireEvent(
                        "retirement-age-reached");
            }
        });
    }
}
