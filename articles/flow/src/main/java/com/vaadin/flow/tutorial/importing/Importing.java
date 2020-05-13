/*
 * Copyright 2000-2016 Vaadin Ltd.
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
package com.vaadin.flow.tutorial.importing;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.HasText;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.dependency.JavaScript;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("importing-dependencies/tutorial-importing.asciidoc")
public class Importing {

    //@formatter:off - custom line wrapping
    @Tag("div")
    @JsModule("./src/my-module.js")
    @JavaScript("/js/script.js")
    static class CustomComponent extends Component
            implements HasText {
        // implementation omitted
    }
    //@formatter:on

    private void addDependencies() {
        UI.getCurrent().getPage().addJavaScript("/js/script.js");
        // external JavaScript module
        UI.getCurrent().getPage()
                .addJsModule("https://unpkg.com/lodash@4.17.15");
    }

}
