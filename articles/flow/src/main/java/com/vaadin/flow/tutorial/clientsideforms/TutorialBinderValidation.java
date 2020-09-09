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

import com.nulabinc.zxcvbn.Strength;
import com.nulabinc.zxcvbn.Zxcvbn;
import com.vaadin.flow.tutorial.annotations.CodeFor;

import javax.validation.Constraint;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import javax.validation.Payload;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.ANNOTATION_TYPE;
import static java.lang.annotation.ElementType.CONSTRUCTOR;
import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.METHOD;
import static java.lang.annotation.ElementType.PARAMETER;
import static java.lang.annotation.ElementType.TYPE_USE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@CodeFor("client-side-forms/tutorial-binder-validation.asciidoc")
public class TutorialBinderValidation {

    public class Employee {
        @NotBlank
        private String username;

        private String title;

        @Email(message = "Please enter a valid e-mail address")
        private String email;

        @StrongPassword
        private String password;

        // + other fields, constructors, setters and getters
    }

    @Retention(RUNTIME)
    @Target({ METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER, TYPE_USE })
    @Constraint(validatedBy = { StrongPasswordValidator.class })
    public @interface StrongPassword {

        // min required password strength on the scale from 1 to 5
        int minStrength() default 4;

        String message() default "Please enter a strong password";
        Class<?>[] groups() default { };
        Class<? extends Payload>[] payload() default { };
    }

    public class StrongPasswordValidator implements ConstraintValidator<StrongPassword, String> {

        private final Zxcvbn zxcvbn = new Zxcvbn();
        private int minStrength;

        @Override
        public void initialize(StrongPassword constraintAnnotation) {
            this.minStrength = constraintAnnotation.minStrength();
        }

        @Override
        public boolean isValid(String object, ConstraintValidatorContext constraintContext) {
            // Use the zxcvbn library to measure the password strength
            Strength strength = zxcvbn.measure(object);

            // fail the validation if the measured strength is insufficient
            if (strength.getScore() < minStrength) {
                constraintContext
                        .buildConstraintViolationWithTemplate(
                                strength.getFeedback().getWarning())
                        .addConstraintViolation();
                return false;
            }

            return true;
        }
    }
}
