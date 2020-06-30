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
package com.vaadin.flow.tutorial.clientsideforms;

import com.vaadin.flow.tutorial.annotations.CodeFor;

import javax.validation.constraints.Max;
import javax.validation.constraints.NotEmpty;

@CodeFor("client-side-forms/tutorial-validation-java.asciidoc")
public class TutorialValidationJava {

    public class Person {

        @Max(value = 2000, message =
                "Year of Birth must be less than or equal to 2000")
        private int yearOfBirth;

        @NotEmpty(message = "Name cannot be empty")
        private String name;

        // + other fields, constructors, setters and getters

        public int getYearOfBirth() {
            return yearOfBirth;
        }

        public void setYearOfBirth(int yearOfBirth) {
            this.yearOfBirth = yearOfBirth;
        }
    }
}
