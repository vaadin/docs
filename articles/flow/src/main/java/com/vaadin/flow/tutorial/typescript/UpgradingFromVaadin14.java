/*
 * Copyright 2000-2018 Vaadin Ltd.
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
package com.vaadin.flow.tutorial.typescript;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouteAlias;
import com.vaadin.flow.tutorial.annotations.CodeFor;


@CodeFor("v15-migration/prepare-to-add-ts-views.asciidoc")
public class UpgradingFromVaadin14 {
    @Route(value = "dashboard"/*, layout = MainView.class <-- remove this */)
    @RouteAlias(value = ""/*, layout = MainView.class <-- and this */)
    public class DashboardView extends Div {

    }
}
