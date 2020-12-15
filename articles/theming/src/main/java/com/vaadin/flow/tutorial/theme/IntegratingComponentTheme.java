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
package com.vaadin.flow.tutorial.theme;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.theme.AbstractTheme;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("../../themes/creating-a-custom-theme.asciidoc")
public class IntegratingComponentTheme {

    // tag::getUrls[]
    @JsModule("@vaadin/vaadin-lumo-styles/color.js")
    public class MyTheme implements AbstractTheme {
        @Override
        public String getBaseUrl() {
            return "/src/";
        }

        @Override
        public String getThemeUrl() {
            return "/theme/myTheme/";
        }
        // end::getUrls[]

        // tag::getHeaderInlineContents[]
        @Override
        public List<String> getHeaderInlineContents() {
            return Collections.singletonList("<custom-style>\n"
                    + "<style include=\"lumo-color lumo-typography\">"
                    + "</style>\n"
                    + "</custom-style>");
        }
        // end::getHeaderInlineContents[]

        // tag::getHtmlAttributes[]
        @Override
        public Map<String, String> getHtmlAttributes(
                String variant) {
            if ("dark".equals(variant)) {
                // The <body> element will have the "theme"
                // attribute set to "dark" when the dark variant
                // is used
                return Collections.singletonMap("theme", "dark");
            }
            return Collections.emptyMap();
        }
        // end::getHtmlAttributes[]

    }
}
