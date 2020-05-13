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

import javax.annotation.security.RolesAllowed;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.vaadin.flow.server.connect.Endpoint;
import com.vaadin.flow.server.connect.auth.AnonymousAllowed;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("typescript/check-user-login.asciidoc")
public class CheckUserLogin {

    @Endpoint
    public class DrawEndpoint {
        public String checkWinner() {
            Authentication auth =
               SecurityContextHolder.getContext() .getAuthentication();
            if (auth != null && "peter".equals(auth.getName())) {
                return "Congrats! you are the winner.";
            }
            return "Sorry, keep looking";
        }
    }

    @Endpoint
    public class MyAppEndpoint {
        @AnonymousAllowed
        public String checkUser() {
            Authentication auth = 
               SecurityContextHolder.getContext().getAuthentication();
            return auth == null ? null : auth.getName();
        }
        
        @RolesAllowed("ROLE_ADMIN")
        public boolean isAdmin() {
            return true;
        }
    }
}
