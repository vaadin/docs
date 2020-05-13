package com.vaadin.flow.tutorial.advanced;

import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.PreserveOnRefresh;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("advanced/tutorial-preserving-state-on-refresh.asciidoc")
@Route("myview")
@PreserveOnRefresh
public class PreservedView extends VerticalLayout {

    public PreservedView() {
        add(new TextField("Content will be preserved"));
        // ...
    }
}
