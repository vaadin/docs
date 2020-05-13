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

import javax.annotation.security.DenyAll;
import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;

import com.vaadin.flow.server.VaadinRequest;
import com.vaadin.flow.server.connect.Endpoint;
import com.vaadin.flow.server.connect.auth.AnonymousAllowed;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("typescript/configuring-security.asciidoc")
public class ConfiguringSecurity {

    @Endpoint
    public class CounterEndpoint {
        public int addOne(int number) {
            return number + 1;
        }
    }

    @Endpoint
    @DenyAll
    public class MyEndpoint {

    public void deniedMethod() {
        // Not possible to call by any request due to class-level annotation
    }

    @AnonymousAllowed
    public void anonymousMethod() {
        // Possible to call by any request (even without
        // authorization) since method level annotation
        // overrides class-level one
    }

    @PermitAll
    public void permittedToAllMethod() {
        // Permitted to all authenticated users, same as if
        // there were no security annotations on the class
        // and the methods.
        // Since there's a `@DenyAll` annotation is on the
        // class, we specify this one on a method to override
        // the class one.
    }

    @RolesAllowed("ROLE_ADMIN")
    public void permittedToRoleMethod() {
        // Permited to all authenticated users belonging
        // to the ROLE_ADMIN
    }
    }

    @Endpoint
    public class EchoEndpoint {
        public String saySomething(String message) {
            return VaadinRequest.getCurrent().getUserPrincipal().getName() + " says: " + message;
        }
    }

}

