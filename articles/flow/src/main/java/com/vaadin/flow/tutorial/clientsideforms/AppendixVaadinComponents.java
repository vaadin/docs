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

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;

import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.Email;
import javax.validation.constraints.Future;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;

import com.vaadin.flow.server.connect.Endpoint;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("client-side-forms/appendix-vaadin-components.asciidoc")
public class AppendixVaadinComponents {

    public class MyEntity {
        @AssertTrue(message = "Please agree this")
        Boolean myBooleanField = false;

        @NotEmpty(message = "Select at least one option")
        List<String> myListField = Arrays.asList("item-1");

        @Pattern(regexp = "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}",
                 message = "must be 8+ characters, with uppercase, lowercase, and numbers")
        String myPasswordField = "bar";

        @Email(message = "must be a valid email address")
        String myEmailField = "foo@bar.baz";

        @PositiveOrZero(message = "Should be positive or zero")
        Integer myIntegerField = 12;
        @Positive(message = "Should be positive")
        Double myDoubleField = 12.33d;

        @Future(message = "Should be a date in the future")
        LocalDate myDateField = LocalDate.now().plusDays(1);
        LocalDateTime myDateTimeField = LocalDateTime.now();
        LocalTime myTimeField = LocalTime.now();

        @Min(0) @Max(1)
        Integer mySelectField = 1;
    }

    @Endpoint
    public class MyEndpoint {
        public MyEntity getMyEntity() {
            return new MyEntity();
        }

        public List<String> getMyOptions() {
            return Arrays.asList("item-1", "item-2", "item-3");
        }
    }
}
