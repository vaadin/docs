package com.vaadin.flow.tutorial.cdi;

public class MessageEvent {
    private final String text;

    public MessageEvent(String text) {
        this.text = text;
    }

    public String getText() {
        return text;
    }
}
