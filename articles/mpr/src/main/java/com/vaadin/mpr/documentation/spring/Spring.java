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

import org.springframework.beans.factory.annotation.Autowired;

import com.vaadin.annotations.Theme;
import com.vaadin.mpr.documentation.annotations.CodeFor;
import com.vaadin.server.VaadinRequest;
import com.vaadin.spring.annotation.SpringUI;
import com.vaadin.ui.HorizontalLayout;
import com.vaadin.ui.UI;

@CodeFor("introduction/step-3-spring-boot.asciidoc")
public class Spring {

    @SpringUI
    @Theme("valo")
    public class TodoUI extends UI {

        private final MainView mainView;

        @Autowired
        public TodoUI(MainView mainView) {
            this.mainView = mainView;
        }

        @Override
        protected void init(VaadinRequest vaadinRequest) {
            setContent(new HorizontalLayout());
        }
    }
}
