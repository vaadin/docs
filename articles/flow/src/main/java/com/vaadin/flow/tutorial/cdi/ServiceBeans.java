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
package com.vaadin.flow.tutorial.cdi;

import com.vaadin.cdi.annotation.VaadinServiceEnabled;
import com.vaadin.cdi.annotation.VaadinServiceScoped;
import com.vaadin.flow.server.CustomizedSystemMessages;
import com.vaadin.flow.server.SystemMessages;
import com.vaadin.flow.server.SystemMessagesInfo;
import com.vaadin.flow.server.SystemMessagesProvider;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("cdi/tutorial-cdi-service-beans.asciidoc")
public class ServiceBeans {

    @VaadinServiceEnabled
    @VaadinServiceScoped
    public class TestSystemMessagesProvider
            implements SystemMessagesProvider {

        @Override
        public SystemMessages getSystemMessages(
                SystemMessagesInfo systemMessagesInfo) {
            CustomizedSystemMessages messages =
                    new CustomizedSystemMessages();
            messages.setInternalErrorMessage(
                    "Sorry, something went wrong :(");
            return messages;
        }

    }

}
