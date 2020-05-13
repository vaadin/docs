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
import com.vaadin.flow.router.BeforeLeaveEvent;
import com.vaadin.flow.router.BeforeLeaveObserver;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("typescript/creating-routes.asciidoc")
public class CreatingRoutes {
    public class MyView extends Div implements BeforeLeaveObserver {
        @Override
        public void beforeLeave(BeforeLeaveEvent event) {
            if (this.isDirty()) {
                event.postpone();
            }
        }

        private boolean isDirty() {
            return true;
        }
    }
}
