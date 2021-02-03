package com.vaadin.flow.tutorial.webcomponent;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.HtmlImport;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("web-components/creating-an-in-project-web-component.asciidoc")
public class InProject {
    @Tag("my-test-element")
    @HtmlImport("bower_components/my-test-element/my-test-element.html")
    public class MyTest extends Component {

        public MyTest(String prop1) {
            getElement().setProperty("prop1", prop1);
        }
    }

    public class MainView extends VerticalLayout {
        public MainView() {
            add(new MyTest("World"));
        }
    }

}
