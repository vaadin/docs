package com.vaadin.flow.tutorial.lit.binder.ui;

import java.util.Optional;

import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.littemplate.LitTemplate;
import com.vaadin.flow.component.polymertemplate.Id;
import com.vaadin.flow.component.textfield.TextArea;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.binder.Binder;
import com.vaadin.flow.data.validator.EmailValidator;
import com.vaadin.flow.templatemodel.TemplateModel;
import com.vaadin.flow.tutorial.annotations.CodeFor;
import com.vaadin.flow.tutorial.lit.binder.data.User;

@CodeFor("polymer-templates/tutorial-template-and-binder.asciidoc")
/**
 * Example of how to combine Templates(recommended way of building UIs) with
 * Binder(recommended way of building forms).
 */
@Tag("user-form")
@JsModule("./src/user-form.ts")
public class UserForm extends LitTemplate {

    @Id("email")
    private TextField email;

    @Id("first-name")
    private TextField firstName;

    @Id("last-name")
    private TextField lastName;

    @Id("comments")
    private TextArea comment;

    @Id("action-buttons")
    private FormButtonsBar actionButtons;

    private Binder<User> binder;

    /**
     * Creates a new UserForm.
     */
    public UserForm() {
        initBinder();
    }

    /**
     * Initializes the binder and associates the validator to each field form's field.
     */
    private void initBinder() {
        binder = new Binder<>();

        // email
        binder.forField(email).withValidator(
                new EmailValidator("This doesn't look like a valid email address")
        ).bind(User::getEmail, User::setEmail);

        // firstName
        binder.forField(firstName).withValidator(firstName -> firstName.length() > 1,
                "The first name must contains at least 2 characters").asRequired()
                .bind(User::getFirstName, User::setFirstName);

        // lastName
        binder.forField(lastName).asRequired("Last name can't be empty")
                .bind(User::getLastName, User::setLastName);

        // comment
        binder.forField(comment).bind(User::getComment, User::setComment);
    }

    /**
     * Connects the bean to the binder.
     *
     * @param user bean
     */
    public void setBean(User user) {
        binder.setBean(user);
    }

    /**
     * Clears the form and disconnnect any bean.
     */
    public void removeBean() {
        binder.removeBean();
    }

    /**
     * Enables or disables the user form fields.
     *
     * @param enabled true or false
     */
    public void setEnabled(boolean enabled) {
        email.setEnabled(enabled);
        firstName.setEnabled(enabled);
        lastName.setEnabled(enabled);
        comment.setEnabled(enabled);

        actionButtons.setCancelDisabled(!enabled);
        actionButtons.setSaveDisabled(!enabled);
        actionButtons.setDeleteDisabled(!enabled);
    }

    /**
     * It returns the actions buttons(save,cancel,delete).
     *
     * @return actionButtons formButtons
     */
    public FormButtonsBar getActionButtons() {
        return actionButtons;
    }

    /**
     * Gets the bean(user) from the binder.
     *
     * @return bean an optional object that represents the bean
     */
    public Optional<User> getBean() {
        return Optional.of(binder.getBean());
    }

    /**
     * Gets the binder of the UserForm
     *
     * @return binder it binds the fields of an object to the fields shown
     */
    public Binder<User> getBinder() {
        return binder;
    }

    /**
     * This model binds properties between FormComponent and user-form.js
     */
    public interface FormComponentModel extends TemplateModel {
        // Add setters and getters for template properties here.
    }
}
