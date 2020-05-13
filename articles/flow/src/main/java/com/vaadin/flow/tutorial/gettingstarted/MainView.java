package com.vaadin.flow.tutorial.gettingstarted;

import java.util.List;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Label;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("introduction/tutorial-get-started.asciidoc")
@JsModule("./styles/shared-styles.js")
@Route("")
public class MainView extends VerticalLayout {

    public MainView() {
        ExampleTemplate template = new ExampleTemplate();

        Button button = new Button("Click me",
                event -> template.setValue("Clicked!"));

        add(button, template);
        setClassName("main-layout");

        Grid<String> grid = new Grid<>();
        add(grid);

        Service service = new Service();
        grid.setItems(service.findAll());

        Label filtering = new Label();
        Label main = new Label();
        add(filtering, grid);
        add(filtering, main);
    }

    private class ExampleTemplate extends Component {
        public void setValue(String string) {
        }
    }
    private class Service {
        List<String> findAll() { return null;}
    }
    // Add the next two lines:
    // The rest is already there...
}
