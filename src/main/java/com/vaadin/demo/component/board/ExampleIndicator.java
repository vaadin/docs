package com.vaadin.demo.component.board;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;

@Tag("example-indicator")
public class ExampleIndicator extends Component {
    public ExampleIndicator(String title, String current, String change) {
        this.getElement()
                .setAttribute("title", title)
                .setAttribute("current", current)
                .setAttribute("change", change);
    }

    public ExampleIndicator(String title, String current) {
        this.getElement()
                .setAttribute("title", title)
                .setAttribute("current", current);
    }
}