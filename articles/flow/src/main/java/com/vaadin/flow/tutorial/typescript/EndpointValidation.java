package com.vaadin.flow.tutorial.typescript;

import com.vaadin.flow.tutorial.annotations.CodeFor;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.executable.ExecutableValidator;
import java.lang.reflect.Method;
import java.util.Set;

@CodeFor("typescript/endpoint-methods-validation.asciidoc")
public class EndpointValidation {

    private Object bean = null;
    private Object object = null;
    private Method method = null;
    private Object returnValue = null;

    public class Account {

        @Positive
        private Long id;

        @NotEmpty(message = "Each account must have a non-empty username")
        private String username;

        private void sendAccountData(@NotNull String destination) {
            // ...
        }
    }

    public void CustomValidationForBean() {
        // A validator for validating beans
        Validator validator = Validation.buildDefaultValidatorFactory().getValidator();
        // non-empty set if there are any constraint validation errors
        Set<ConstraintViolation<Object>> violations = validator.validate(bean);
    }

    public void CustomValidationForMethodAndConstructor() {
        // A validator for validating beans
        Validator validator = Validation.buildDefaultValidatorFactory().getValidator();
        // A validator for validating methods and constructors (return values, parameters)
        ExecutableValidator executableValidator = validator.forExecutables();
        // non-empty set if there are any constraint validation errors
        Set<ConstraintViolation<Object>> violations = executableValidator.validateReturnValue(object, method, returnValue);
    }
}
