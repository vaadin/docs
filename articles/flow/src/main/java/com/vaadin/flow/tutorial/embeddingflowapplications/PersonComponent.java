package com.vaadin.flow.tutorial.embeddingflowapplications;

import com.vaadin.flow.component.ComponentEvent;
import com.vaadin.flow.component.ComponentEventListener;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.tutorial.annotations.CodeFor;
import com.vaadin.flow.tutorial.webcomponent.Div;

@CodeFor("embedding-flow-applications/tutorial-webcomponent-properties" +
        ".asciidoc")
public class PersonComponent extends Div {
    private static final String INFO = "This is %s and they are %d years old.";

    public void setAdultAge(int age) {

    }

    public static class AgeChangedEvent extends ComponentEvent<PersonComponent> {
        private int age;
        public AgeChangedEvent(PersonComponent source, int age) {
            super(source, false);
            this.age = age;
        }

        public int getAge() {
            return age;
        }
    }

    private String name = "";
    private int age = 0;

    private Paragraph personInfo;

    public PersonComponent() {
        personInfo = new Paragraph();
        add(personInfo);
        updateInfo();
    }

    public void setName(String name) {
        this.name = name;
        updateInfo();
    }

    public void setAge(int age) {
        this.age = age;
        updateInfo();

        fireEvent(new AgeChangedEvent(this, age));
    }

    private void updateInfo() {
        personInfo.setText(String.format(INFO, name, age));
    }

    public boolean isAdult() {
        return this.age > 18;
    }

    public void addAgeChangedListener(ComponentEventListener<AgeChangedEvent> listener) {
        addListener(AgeChangedEvent.class, listener);
    }
}
