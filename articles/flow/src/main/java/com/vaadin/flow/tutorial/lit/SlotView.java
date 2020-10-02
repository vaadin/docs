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
package com.vaadin.flow.tutorial.lit;

import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.littemplate.LitTemplate;
import com.vaadin.flow.dom.Element;
import com.vaadin.flow.dom.ElementFactory;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("polymer-templates/tutorial-template-components-in-slot.asciidoc")
public class SlotView {

    @Tag("component-container")
    @JsModule("./com/example/component-container.ts")
    public class ComponentContainer extends LitTemplate {

        public ComponentContainer() {
            Element label = ElementFactory.createLabel("Main layout header");
            Element button = ElementFactory.createButton("Click me");

            getElement().appendChild(label, button);
        }
    }

    @Tag("name-element")
    @JsModule("./com/example/name-element.ts")
    public class NameElement extends LitTemplate {
        public NameElement() {
            Element firstName = ElementFactory.createSpan("Jack");
            Element middleName = ElementFactory.createSpan(" James");
            Element surName = ElementFactory.createSpan("Christobald");

            firstName.setAttribute("slot", "firstName");
            middleName.setAttribute("slot", "middleName");
            surName.setAttribute("slot", "lastName");

            getElement().appendChild(firstName, middleName, surName);
        }
    }
}
