package com.vaadin.flow.tutorial.advanced;

import com.vaadin.flow.component.Direction;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.i18n.LocaleChangeEvent;
import com.vaadin.flow.i18n.LocaleChangeObserver;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("advanced/tutorial-i18n-localization.asciidoc")
public class RTLWithLocaleObserverSources {

    public class MainLayout extends VerticalLayout implements LocaleChangeObserver {

        @Override
        public void localeChange(LocaleChangeEvent event) {
            if (event.getLocale().getLanguage() == "ar") {
                event.getUI().setDirection(Direction.RIGHT_TO_LEFT);
            } else {
                event.getUI().setDirection(Direction.LEFT_TO_RIGHT);
            }
        }
    }

}