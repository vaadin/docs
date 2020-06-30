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
package com.vaadin.flow.tutorial.clientsideforms;

import com.vaadin.flow.server.connect.Endpoint;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("client-side-forms/tutorial-binder.asciidoc")
public class BindingDataToClientSideForms {
    /**
     * A Vaadin endpoint for the person-view.ts form view.
     */
    @Endpoint
    public class PersonEndpoint {
        /**
         * Loads a Person to edit into the view.
         * @return default form data
         */
        public Person loadPerson() {
            return new Person();
        }

        /**
         * Saves the edited Person from the view.
         * @param person form data to save
         */
        public void savePerson(Person person) {
            // ...
        }
    }

    class Person {
        // ...
    }
}
