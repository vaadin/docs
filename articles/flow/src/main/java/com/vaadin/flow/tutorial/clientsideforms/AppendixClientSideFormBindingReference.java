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

import com.vaadin.flow.tutorial.annotations.CodeFor;

import javax.validation.constraints.NotEmpty;

@CodeFor("client-side-forms/appendix-client-side-form-binding-reference.asciidoc")
public class AppendixClientSideFormBindingReference {

    public class IdEntity {
        private String idString;

        public String getIdString() {
            return idString;
        }

        public void setIdString(String idString) {
            this.idString = idString;
        }
    }

    public class Person extends IdEntity {
        @NotEmpty(message = "Cannot be empty")
        private String fullName;

        public String getFullName() {
            return fullName;
        }

        public void setFullName(String fullName) {
            this.fullName = fullName;
        }
    }
}
