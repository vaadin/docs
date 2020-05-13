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

import javax.annotation.Nullable;

import java.util.Optional;

import com.vaadin.flow.server.connect.Endpoint;
import com.vaadin.flow.tutorial.annotations.CodeFor;


@CodeFor("typescript/typescript-endpoints-generator.asciidoc")
public class TypeScriptEndpointsGenerator {
    /**
    * User endpoints.
    */
    @Endpoint
    public class UserEndpoints {
        /**
        * Check if a user is admin or not.
        *
        * @param id
        *            User id to be checked
        * @return Return true if the given user is an admin, otherwise false.
        */
        public boolean isAdmin(long id) {
            return id == 0;
        }

        public void setName(String firstName, String lastName, @Nullable String middleName) {
            // omitted code
        }

        public void setNameOptional(String firstName, String lastName, Optional<String> middleName) {
            // omitted code
        }

        @Nullable
        public String getPhoneNumber() {
            // omitted code
            return "";
        }

        public Optional<String> getPhoneNumberOptional() {
            // omitted code
            return Optional.empty();
        }
    }

    public class MyBean {
        private long id;
        private String value;
        @Nullable
        private String description;
        private Optional<String> optionalDescription;
    }
}
