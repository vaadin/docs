/*
 * Copyright 2000-2017 Vaadin Ltd.
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
package com.vaadin.flow.tutorial.polymer;

import java.util.Optional;

import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.polymertemplate.EventHandler;
import com.vaadin.flow.component.polymertemplate.PolymerTemplate;
import com.vaadin.flow.templatemodel.TemplateModel;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("polymer-templates/tutorial-template-basic.asciidoc")
public class HelloWorldTutorial {

    /**
     * Model for the template.
     */
    public interface HelloWorldModel extends TemplateModel {
        /**
         * Gets user input from corresponding template page.
         *
         * @return user input string
         */
        String getUserInput();

        /**
         * Sets greeting that is displayed in corresponding template page.
         *
         * @param greeting
         *            greeting string
         */
        void setGreeting(String greeting);
    }

    @Tag("hello-world")
    @NpmPackage(value = "@polymer/paper-input", version = "3.0.2")
    @JsModule("./src/hello-world.js")
    public class HelloWorld extends PolymerTemplate<HelloWorldModel> {
        private static final String EMPTY_NAME_GREETING = "Please enter your name";

        /**
         * Creates the hello world template.
         */
        public HelloWorld() {
            setId("template");
            getModel().setGreeting(EMPTY_NAME_GREETING);
        }

        @EventHandler
        private void sayHello() {
            // Called from the template click handler
            // @formatter:off
            String userInput = getModel().getUserInput();
            if (userInput == null || userInput.isEmpty()) {
                getModel().setGreeting(EMPTY_NAME_GREETING);
            } else {
                getModel().setGreeting(String.format("Hello %s!", userInput));
            }
            // @formatter:on
        }
    }

    public void useTemplate() {
        HelloWorld hello = new HelloWorld();

        Div layout = new Div();
        layout.add(hello);
    }
}
