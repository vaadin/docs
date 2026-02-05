package com.vaadin.demo.buildingapps.uistatemanagement;

import java.util.List;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.binder.HasValidator;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.signals.Signal;
import com.vaadin.signals.function.SignalMapper;
import com.vaadin.signals.local.ValueSignal;

@Route("building-apps/ui-state-management/multi-step-wizard")
@PageTitle("Multi-Step Wizard")
public class MultiStepWizardView extends VerticalLayout {

    public MultiStepWizardView() {
        setSpacing(true);
        setPadding(true);

        add(new H2("Multi-Step Wizard with Validation"));
        add(new Paragraph("This example demonstrates a multi-step form where each step must be valid before proceeding."));

        // State signals
        var currentStep = new ValueSignal<>(WizardStep.PERSONAL_INFO);
        var firstName = new ValueSignal<>("");
        var lastName = new ValueSignal<>("");
        var email = new ValueSignal<>("");
        var companyName = new ValueSignal<>("");
        var companySize = new ValueSignal<>("");
        var plan = new ValueSignal<>(SubscriptionPlan.STARTER);

        // --- Step 1: Personal Information ---
        VerticalLayout step1 = new VerticalLayout(new H3("Step 1: Personal Info"));
        TextField firstNameField = new TextField("First Name");
        firstNameField.bindValue(firstName);
        firstNameField.setRequired(true);

        TextField lastNameField = new TextField("Last Name");
        lastNameField.bindValue(lastName);
        lastNameField.setRequired(true);

        EmailField emailField = new EmailField("Email");
        emailField.bindValue(email);
        emailField.setRequired(true);

        step1.add(firstNameField, lastNameField, emailField);
        step1.bindVisible(currentStep.map(s -> s == WizardStep.PERSONAL_INFO));

        // --- Step 2: Company Information ---
        VerticalLayout step2 = new VerticalLayout(new H3("Step 2: Company Info"));
        TextField companyField = new TextField("Company Name");
        companyField.bindValue(companyName);
        companyField.setRequired(true);

        ComboBox<String> sizeField = new ComboBox<>("Company Size", List.of("1-10", "11-50", "50+"));
        sizeField.bindValue(companySize);
        sizeField.setRequired(true);

        step2.add(companyField, sizeField);
        step2.bindVisible(currentStep.map(s -> s == WizardStep.COMPANY_INFO));

        // --- Step 3: Plan Selection ---
        VerticalLayout step3 = new VerticalLayout(new H3("Step 3: Select Plan"));
        ComboBox<SubscriptionPlan> planField = new ComboBox<>("Plan", SubscriptionPlan.values());
        planField.bindValue(plan);

        Span planInfo = new Span();
        planInfo.bindText(plan.map(p -> switch (p) {
            case STARTER -> "Free for individuals";
            case PROFESSIONAL -> "$29/month for teams";
            case ENTERPRISE -> "Custom pricing";
        }));

        step3.add(planField, planInfo);
        step3.bindVisible(currentStep.map(s -> s == WizardStep.PLAN_SELECTION));

        // --- Step 4: Review ---
        VerticalLayout step4 = new VerticalLayout(new H3("Step 4: Review"));
        Div summary = new Div();
        summary.bindText(Signal.computed(() -> String.format(
                "Name: %s %s, Email: %s, Company: %s (%s), Plan: %s",
                firstName.value(), lastName.value(), email.value(),
                companyName.value(), companySize.value(), plan.value())));

        step4.add(summary);
        step4.bindVisible(currentStep.map(s -> s == WizardStep.REVIEW));

        // --- Validation Logic ---
        Signal<Boolean> step1Valid = Signal.computed(() -> 
            firstName.map(isValid(firstNameField)).value() &&
            lastName.map(isValid(lastNameField)).value() &&
            email.map(isValid(emailField)).value()
        );

        Signal<Boolean> step2Valid = Signal.computed(() -> 
            companyName.map(isValid(companyField)).value() &&
            companySize.map(isValid(sizeField)).value()
        );

        // --- Navigation ---
        HorizontalLayout nav = new HorizontalLayout();
        Button prev = new Button("Previous", e -> {
            var s = currentStep.value();
            if (s == WizardStep.COMPANY_INFO) currentStep.value(WizardStep.PERSONAL_INFO);
            if (s == WizardStep.PLAN_SELECTION) currentStep.value(WizardStep.COMPANY_INFO);
            if (s == WizardStep.REVIEW) currentStep.value(WizardStep.PLAN_SELECTION);
        });
        prev.bindVisible(currentStep.map(s -> s != WizardStep.PERSONAL_INFO));

        Button next = new Button("Next", e -> {
            var s = currentStep.value();
            if (s == WizardStep.PERSONAL_INFO) currentStep.value(WizardStep.COMPANY_INFO);
            else if (s == WizardStep.COMPANY_INFO) currentStep.value(WizardStep.PLAN_SELECTION);
            else if (s == WizardStep.PLAN_SELECTION) currentStep.value(WizardStep.REVIEW);
        });
        next.bindVisible(currentStep.map(s -> s != WizardStep.REVIEW));
        next.bindEnabled(Signal.computed(() -> switch (currentStep.value()) {
            case PERSONAL_INFO -> step1Valid.value();
            case COMPANY_INFO -> step2Valid.value();
            case PLAN_SELECTION -> true;
            case REVIEW -> false;
        }));

        Button submit = new Button("Submit", e -> System.out.println("Submitted"));
        submit.bindVisible(currentStep.map(s -> s == WizardStep.REVIEW));

        nav.add(prev, next, submit);

        add(step1, step2, step3, step4, nav);
    }

    private <T> SignalMapper<T, Boolean> isValid(HasValidator<T> field) {
        return value -> !field.getDefaultValidator().apply(value, null).isError();
    }
}
