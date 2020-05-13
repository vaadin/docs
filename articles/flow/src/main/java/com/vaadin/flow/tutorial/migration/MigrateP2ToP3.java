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
package com.vaadin.flow.tutorial.migration;

import com.vaadin.flow.component.dependency.CssImport;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("v14-migration/v14-theming-migration.asciidoc")
public class MigrateP2ToP3 {
    @Route(value = "")
    // will be imported as a <dom-module> tag for theming components
    @CssImport(value = "./styles/my-app-layout-theme.css", themeFor = "vaadin-app-layout")
    // will be imported as a <custom-style> tag
    @CssImport(value = "./styles/my-custom-styles.css")
    public class MyApplication extends Div {
    }
}
