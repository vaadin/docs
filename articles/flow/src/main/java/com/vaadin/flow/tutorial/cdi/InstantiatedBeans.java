/*
 * Copyright 2000-2020 Vaadin Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
package com.vaadin.flow.tutorial.cdi;

import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.html.Label;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.polymertemplate.PolymerTemplate;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.templatemodel.TemplateModel;
import com.vaadin.flow.tutorial.annotations.CodeFor;
import com.vaadin.flow.tutorial.polymer.Id;

import javax.annotation.PostConstruct;
import javax.enterprise.context.Dependent;
import javax.inject.Inject;

@CodeFor("cdi/tutorial-cdi-instantiated-beans.asciidoc")
public class InstantiatedBeans {

    @Route
    public class MainView extends VerticalLayout {

        @Inject
        public MainView(Greeter greeter) {
            add(new Span(greeter.sayHello()));
        }

    }

    public class TestTemplate
            extends PolymerTemplate<TemplateModel> {

        @Id
        private DependentLabel label;

    }

    @Dependent
    @Tag("dependent-label")
    public class DependentLabel extends Label {

        @Inject
        private Greeter greeter;

        @PostConstruct
        private void init() {
            setText(greeter.sayHello());
        }

    }

}
