package com.vaadin.flow.tutorial.webcomponent;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.HasComponents;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("web-components/creating-java-api-for-a-web-component.asciidoc")
@Tag(Tag.DIV)
public class Div extends Component implements HasComponents {

    public class Test {
        {
            Div root = new Div();
            root.add(new Span("Hello"));
            root.add(new Span("World"));
            add(root);

        }
    }
}
