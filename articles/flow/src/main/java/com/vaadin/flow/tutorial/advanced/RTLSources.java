package com.vaadin.flow.tutorial.advanced;

import com.vaadin.flow.component.Direction;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("advanced/tutorial-i18n-localization.asciidoc")
public class RTLSources {

    public class MainLayout extends VerticalLayout {

        public MainLayout() {
            // ...
            final UI ui = UI.getCurrent();
            if (ui.getLocale().getLanguage() == "ar") {
                ui.setDirection(Direction.RIGHT_TO_LEFT);
            }
        }
    }

}