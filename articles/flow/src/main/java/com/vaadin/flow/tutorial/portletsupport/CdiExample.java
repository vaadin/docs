package com.vaadin.flow.tutorial.portletsupport;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.portlet.PortletMode;
import javax.portlet.PortletRequest;
import javax.portlet.WindowState;
import javax.portlet.annotations.Namespace;
import javax.portlet.annotations.WindowId;

import java.util.List;
import java.util.Locale;

import com.vaadin.cdi.annotation.VaadinServiceEnabled;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.i18n.I18NProvider;
import com.vaadin.flow.portal.VaadinPortlet;
import com.vaadin.flow.portal.cdi.CdiVaadinPortlet;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("portlet-support/portlet-07-cdi-support.asciidoc")
public class CdiExample {
    // old, non-CDI portlet:
    public class NormalBookListPortlet extends VaadinPortlet<BookListView> {
        // ... contents
    }

    // new, CDI portlet:
    public class CdiBookListVaadinPortlet extends CdiVaadinPortlet<BookListView> {
        // ... contents
    }

    public class BookListView extends Div {

        @Inject
        private BookGrid bookGrid;
        // ...

        @PostConstruct
        private void init() {
            add(bookGrid);
            // ...
        }
    }

    public class BookGrid extends Grid<Book> {

        @PostConstruct
        private void init() {
            // ...
        }
    }

    private static class Book {};

    public class MyPortletComponent extends Div {

        @Inject
        private PortletRequest portletRequest;

        @Inject
        private WindowState windowState;

        @Inject
        private PortletMode portletMode;

        // ...
    }

    public class MyPortletView extends Div {

        @Inject
        @Namespace
        private String namespace;

        @Inject
        @WindowId
        private String windowId;

        // ...
    }

    @VaadinServiceEnabled
    @ApplicationScoped
    public static class I18N implements I18NProvider {

        @PostConstruct
        public void init() {
            // ...
        }

        @Override
        public List<Locale> getProvidedLocales() {
            // ...
            return null;
        }

        @Override
        public String getTranslation(String key, Locale locale, Object... params) {
            // ...
            return null;
        }
    }
}
