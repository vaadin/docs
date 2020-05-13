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
package com.vaadin.flow.tutorial.importing;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.dependency.CssImport;
import com.vaadin.flow.component.dependency.JavaScript;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.StyleSheet;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.shared.ui.LoadMode;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("importing-dependencies/tutorial-ways-of-importing.asciidoc")
public class LazyImporting {

    //@formatter:off - custom line wrapping
    @Tag("div")
    @StyleSheet(value = "/css/big_style_file.css",
            loadMode = LoadMode.INLINE)
    @JavaScript(value = "/js/animation.js",
            loadMode = LoadMode.LAZY)
    public class MainLayout extends Component {
        // implementation omitted

        public MainLayout() {
            UI.getCurrent().getPage().addStyleSheet(
                    "/css/big_style_file.css", LoadMode.INLINE);
            UI.getCurrent().getPage().addJavaScript(
                    "/js/animation.js", LoadMode.LAZY);
        }
    }
    //@formatter:on

    @JavaScript("1.js")
    @JsModule("a.js")
    @CssImport("1.css")
    @JavaScript("2.js")
    @JsModule("b.js")
    @CssImport("2.css")
    static class OrderedDependencies extends Div {
    }

}
