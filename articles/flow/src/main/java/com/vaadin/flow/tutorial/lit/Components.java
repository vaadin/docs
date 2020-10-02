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

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Label;
import com.vaadin.flow.component.html.NativeButton;
import com.vaadin.flow.component.littemplate.LitTemplate;
import com.vaadin.flow.component.polymertemplate.Id;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("polymer-templates/tutorial-template-components.asciidoc")
public class Components {

    @Tag("main-page")
    @JsModule("./com/example/main-page.ts")
    public class MainPage extends LitTemplate {

        @Id("content")
        private Div content;

        @Id("helloButton")
        private NativeButton helloButton;

        public MainPage() {
            helloButton.addClickListener(event -> {
                System.out.println("Clicked!");
            });
        }

        public void setContent(Component content) {
            this.content.removeAll();
            this.content.add(content);
        }
    }

    private void snippets() {
        MainPage page = new MainPage();
        page.setContent(new Label("Hello!"));
    }
}
