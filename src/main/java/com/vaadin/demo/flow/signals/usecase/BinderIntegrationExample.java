package com.vaadin.demo.flow.signals.usecase;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.component.textfield.IntegerField;
import com.vaadin.flow.component.textfield.PasswordField;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.binder.Binder;
import com.vaadin.flow.data.binder.BinderValidationStatus;
import com.vaadin.flow.signals.Signal;
import com.vaadin.flow.signals.local.ValueSignal;

public class BinderIntegrationExample extends VerticalLayout {

    // tag::snippet[]
    public BinderIntegrationExample() {
        // Create binder for form validation
        Binder<UserRegistration> binder = new Binder<>(UserRegistration.class);

        // Create form fields
        TextField usernameField = new TextField("Username");
        EmailField emailField = new EmailField("Email");
        PasswordField passwordField = new PasswordField("Password");
        PasswordField confirmPasswordField = new PasswordField("Confirm Password");
        ComboBox<AccountType> accountTypeSelect = new ComboBox<>("Account Type",
                AccountType.values());
        IntegerField ageField = new IntegerField("Age");

        // Create signals for dynamic validation
        ValueSignal<AccountType> accountTypeSignal = new ValueSignal<>(
                AccountType.PERSONAL);
        ValueSignal<Integer> ageSignal = new ValueSignal<>(0);

        // Bind signals to form fields for two-way updates
        accountTypeSelect.bindValue(accountTypeSignal);
        ageField.bindValue(ageSignal);

        // Computed signal for age validation that depends on account type
        Signal<Boolean> ageValidSignal = Signal.computed(() -> {
            Integer age = ageSignal.value();
            AccountType accountType = accountTypeSignal.value();
            if (age == null) {
                return false;
            }
            // Business accounts require age >= 18, Personal accounts >= 14
            return accountType == AccountType.BUSINESS ? age >= 18 : age >= 14;
        });

        // Binder field validations
        // username and email validation is skipped for brevity
        binder.forField(usernameField).bind("username");
        binder.forField(emailField).bind("email");

        // Store password binding for cross-field validation
        Binder.Binding<UserRegistration, String> pwBinding = binder
                .forField(passwordField)
                .withValidator(value -> value != null && value.length() >= 8,
                        "Password must be at least 8 characters")
                .bind("password");

        // Cross-field validation using Binder.Binding.value()
        // Runs each time the password field changes
        binder.forField(confirmPasswordField)
                .withValidator(value -> value != null && value.equals(pwBinding.value()),
                        "Passwords do not match")
                .bind("confirmPassword");

        binder.forField(accountTypeSelect).bind("accountType");

        // Cross-field validation using signals for dynamic error messages
        // Runs each time the age or account field changes
        binder.forField(ageField)
                .withValidator(value -> ageValidSignal.value(), value -> {
                    AccountType accountType = accountTypeSignal.value();
                    return accountType == AccountType.BUSINESS
                            ? "Business accounts require age 18 or older"
                            : "Personal accounts require age 14 or older";
                })
                .bind("age");

        // Initialize the binder with an empty bean
        binder.readBean(new UserRegistration("", "", "", "", AccountType.PERSONAL, 0));

        // Submit button enabled only when form is valid
        Button submitButton = new Button("Register", e -> {
            UserRegistration userRegistration = new UserRegistration();
            binder.writeBeanIfValid(userRegistration);
                // Handle registration...
        });
        submitButton.bindEnabled(
                binder.getValidationStatus().map(BinderValidationStatus::isOk));

        // Form status display with reactive styling
        Div statusDiv = new Div();
        Span statusLabel = new Span();
        statusLabel.bindText(binder.getValidationStatus()
                .map(status -> status.isOk() ? "Form is valid - Ready to submit"
                        : "Please complete all required fields correctly"));
        statusLabel.getStyle().bind("color", binder.getValidationStatus()
                .map(status -> status.isOk() ? "green" : "orange"));
        statusDiv.add(statusLabel);

        add(usernameField, emailField, passwordField, confirmPasswordField,
                accountTypeSelect, ageField, statusDiv, submitButton);
    }
    // end::snippet[]

    // Supporting classes
    public static class UserRegistration {
        private String username;
        private String email;
        private String password;
        private String confirmPassword;
        private AccountType accountType;
        private Integer age;

        public UserRegistration() {
        }

        public UserRegistration(String username, String email, String password,
                String confirmPassword, AccountType accountType, Integer age) {
            this.username = username;
            this.email = email;
            this.password = password;
            this.confirmPassword = confirmPassword;
            this.accountType = accountType;
            this.age = age;
        }

        // Getters and setters omitted for brevity
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        public String getConfirmPassword() { return confirmPassword; }
        public void setConfirmPassword(String confirmPassword) {
            this.confirmPassword = confirmPassword;
        }
        public AccountType getAccountType() { return accountType; }
        public void setAccountType(AccountType accountType) {
            this.accountType = accountType;
        }
        public Integer getAge() { return age; }
        public void setAge(Integer age) { this.age = age; }
    }

    public enum AccountType {
        PERSONAL, BUSINESS
    }
}
