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
package com.vaadin.flow.tutorial.polymer;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Label;
import com.vaadin.flow.component.littemplate.LitTemplate;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.component.polymertemplate.Id;
import com.vaadin.flow.component.polymertemplate.PolymerTemplate;
import com.vaadin.flow.templatemodel.TemplateModel;
import com.vaadin.flow.tutorial.annotations.CodeFor;
import com.vaadin.flow.tutorial.webcomponent.Div;

@CodeFor("polymer-templates/tutorial-template-mapped-components-limitations.asciidoc")
public class MappedComponentsLimitations {

    @Tag("main-page")
    @JsModule("./com/example/main-page.js")
    public class MainPage extends LitTemplate {

        @Id("content")
        private Div content;

        public void setContent(Component content) {
            this.content.removeAll();
            this.content.add(content);
        }
    }

    @Tag("main-layout")
    @JsModule("./com/example/main-layout.js")
    public class MainLayout extends LitTemplate {

        @Id("layout")
        private VerticalLayout layout;
        @Id("textfield")
        private TextField textField;
        @Id("button")
        private Button button;

        public void onSomeAction() {
            layout.setEnabled(false);

            System.out.println(textField.isEnabled()); // prints "true"
            System.out.println(button.isEnabled()); // prints "true"
            // call explicitly setEnabled(false) to disable a component
            button.setEnabled(false);
            System.out.println(button.isEnabled()); // prints "false"
        }
    }

    private void snippets() {
        MainPage page = new MainPage();
        page.setContent(new Label("Hello!"));
    }
}
