/**
 * Copyright (C) 2020 Vaadin Ltd
 *
 * This program is available under Commercial Vaadin Developer License
 * 4.0 (CVDLv4).
 *
 *
 * For the full License, see <https://vaadin.com/license/cvdl-4.0>.
 */
package com.vaadin.mpr.documentation.spring;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.support.SpringBootServletInitializer;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.mpr.core.HasLegacyComponents;
import com.vaadin.mpr.documentation.annotations.CodeFor;
import com.vaadin.ui.HorizontalLayout;

@CodeFor("introduction/step-3-spring-boot.asciidoc")
public class SpringFlow {

    @Route("")
    public class TodoUI extends Div implements HasLegacyComponents {

        private final MainView mainView;

        public TodoUI(@Autowired MainView mainView) {
            this.mainView = mainView;
        }

        @PostConstruct
        private void buildLayouts() {
            setSizeFull();
            add(new HorizontalLayout());
        }
    }

    // Assuming that Application is in a different package than the classes
    // annotated with @Route
    @SpringBootApplication
    @EnableVaadin("com.mycompany.views")
    public class Application extends SpringBootServletInitializer {
    }

    // Copied here because the old Vaadin Spring add-on doesn't support
    // @EnableVaadin with parameters
    @interface EnableVaadin {
        String[] value() default {};
    }
}
