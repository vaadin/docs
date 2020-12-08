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
package com.vaadin.flow.tutorial.cdi;

import com.vaadin.flow.server.BootstrapPageResponse;
import com.vaadin.flow.server.ServiceInitEvent;
import com.vaadin.flow.tutorial.annotations.CodeFor;

import javax.enterprise.event.Observes;

@CodeFor("cdi/tutorial-cdi-events.asciidoc")
public class Events {

    public class BootstrapCustomizer {

        private void onServiceInit(@Observes
                ServiceInitEvent serviceInitEvent) {
            serviceInitEvent.addBootstrapListener(
                    this::modifyBootstrapPage);
        }

        private void modifyBootstrapPage(
                BootstrapPageResponse response) {
            response.getDocument().body().append(
                    "<p>By CDI add-on</p>");
        }

    }

}
