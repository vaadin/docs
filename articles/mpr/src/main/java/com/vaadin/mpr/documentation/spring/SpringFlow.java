/**
 * Copyright (C) 2018 Vaadin Ltd
 *
 * This program is available under Commercial Vaadin Add-On License 3.0
 * (CVALv3).
 *
 * See the file licensing.txt distributed with this software for more
 * information about licensing.
 *
 * You should have received a copy of the license along with this program.
 * If not, see <http://vaadin.com/license/cval-3>.
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
