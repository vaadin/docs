package com.vaadin.flow.tutorial.advanced;

import com.vaadin.flow.component.orderedlayout.FlexLayout;
import com.vaadin.flow.router.PreserveOnRefresh;
import com.vaadin.flow.router.RouterLayout;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("advanced/tutorial-preserving-state-on-refresh.asciidoc")
@PreserveOnRefresh
public class PreservedLayout extends FlexLayout
        implements RouterLayout {

    public PreservedLayout() {
        // ...
    }
}
