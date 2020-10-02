package com.vaadin.flow.tutorial.lit.binder;

import java.util.Optional;

import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.littemplate.LitTemplate;
import com.vaadin.flow.component.polymertemplate.Id;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.tutorial.annotations.CodeFor;
import com.vaadin.flow.tutorial.lit.binder.data.User;
import com.vaadin.flow.tutorial.lit.binder.data.UsersRepository;
import com.vaadin.flow.tutorial.lit.binder.ui.FormButtonsBar;
import com.vaadin.flow.tutorial.lit.binder.ui.UserForm;
import com.vaadin.flow.tutorial.lit.binder.ui.UsersGrid;

@CodeFor("polymer-templates/tutorial-template-and-binder.asciidoc")
/**
 * The main view of the application.
 */
@Tag("main-view")
@JsModule("./src/main-view.ts")
@Route("")
public class MainView extends LitTemplate {


    @Id("user-form")
    private UserForm userForm;

    @Id("users-grid")
    private UsersGrid usersGrid;

    /**
     * Initializes the Main view and the listeners of its components.
     */
    public MainView() {

        // selection listener on the rows of the grid.
        usersGrid.addSelectionListener(selectionEvent -> {
            Optional<User> optionalUser = usersGrid.getSelectedItems().stream().findAny();

            if (optionalUser.isPresent()) {
                userForm.setBean(optionalUser.get());
                setEditionEnabled(true);
            } else {
                userForm.removeBean();
                setEditionEnabled(false);
            }
        });

        initFormListeners();
    }

    /**
     * Initialization of the listeners of the UserForm
     */
    private void initFormListeners() {
        FormButtonsBar formButtonsBar = userForm.getActionButtons();

        // SAVE
        formButtonsBar.addSaveListener(saveEvent -> {
            // it checks that all validators defined in the form pass without error.
            if (!userForm.getBinder().validate().isOk()) {
                return;
            }

            Optional<User> optionalUser = userForm.getBean();

            if (optionalUser.isPresent()) {
                User user = optionalUser.get();

                user = UsersRepository.save(user);

                usersGrid.refresh(user);
                userForm.setBean(user); // update the data in the form
            }
        });

        // CANCEL
        formButtonsBar.addCancelListener(cancelEvent -> {
            usersGrid.deselectAll();
        });

        // DELETE
        formButtonsBar.addDeleteListener(deleteEvent -> {
            Optional<User> optionalUser = usersGrid.getSelectedItems().stream().findAny();

            if (optionalUser.isPresent()) {
                UsersRepository.delete(optionalUser.get());
                usersGrid.deselectAll();
                usersGrid.refreshAll();
            }
        });
    }

    /**
     * Enables or disables the UserForm.
     *
     * @param enabled true or false
     */
    public void setEditionEnabled(boolean enabled) {
        userForm.setEnabled(enabled);
    }
}