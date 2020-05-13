package com.vaadin.flow.tutorial.portletsupport;

import javax.portlet.PortletMode;
import javax.portlet.WindowState;
import java.util.Collections;
import java.util.Map;
import java.util.Optional;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.grid.ItemClickEvent;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.data.binder.Binder;
import com.vaadin.flow.data.provider.ListDataProvider;
import com.vaadin.flow.portal.VaadinPortlet;
import com.vaadin.flow.portal.lifecycle.PortletEvent;
import com.vaadin.flow.portal.lifecycle.PortletModeEvent;
import com.vaadin.flow.portal.PortletView;
import com.vaadin.flow.portal.PortletViewContext;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("portlet-support/portlet-demo-01-address-book.asciidoc")
public class DemoAddressBook {
    public class ContactListView extends VerticalLayout implements PortletView {
        private ListDataProvider<Contact> dataProvider;

        private Grid<Contact> grid = new Grid<>(Contact.class);

        private PortletViewContext portletViewContext;

        @Override
        public void onPortletViewContextInit(PortletViewContext context) {
            // save context for sending events
            portletViewContext = context;

            // add event listeners for both "contact-updated" custom event
            // and window state change event
            context.addEventChangeListener("contact-updated",
                    this::onContactUpdated);
            context.addWindowStateChangeListener(
                    event -> handleWindowStateChanged(event.getWindowState()));
            init();
        }

        private void onContactUpdated(PortletEvent event) {
            int contactId = Integer
                    .parseInt(event.getParameters().get("contactId")[0]);
            // retrieve the contact information from contact service
            Optional<Contact> contact = getService()
                    .findById(contactId);
            // update grid's data provider with the updated contact
            contact.ifPresent(value -> dataProvider.refreshItem(value));
        }

        private ContactService getService() {
            // returns ContactService instance
            return null;
        }

        private void handleWindowStateChanged(WindowState windowState) {
            if (WindowState.MAXIMIZED.equals(windowState)) {
                grid.setColumns("firstName", "lastName", "phoneNumber", "email",
                        "birthDate");
                grid.setMinWidth("700px");
                // ... rest of the configuration
            } else if (WindowState.NORMAL.equals(windowState)) {
                grid.setColumns("firstName", "lastName", "phoneNumber");
                grid.setMinWidth("450px");
                // ... rest of the configuration
            }
        }

        private void fireSelectionEvent(
                ItemClickEvent<Contact> contactItemClickEvent) {
            // get contact id
            Integer contactId = contactItemClickEvent.getItem().getId();

            // save the id into a string-to-string map
            Map<String, String> param = Collections.singletonMap(
                    "contactId", contactId.toString());

            // send the event with name "contact-selected"
            portletViewContext.fireEvent("contact-selected", param);
        }

        private void init() {
            // ... grid initialization

            // add item click listener which fires our contact-selected event
            grid.addItemClickListener(this::fireSelectionEvent);

            // ... rest of the configuration
        }
    }

    public class ContactFormView extends VerticalLayout implements PortletView {
        private static final String ACTION_EDIT = "Edit";
        private static final String ACTION_CREATE = "Create new";
        private static final String ACTION_SAVE = "Save";

        private PortletViewContext portletViewContext;

        private Binder<Contact> binder;
        private Contact contact;

        private Button action;
        // ... other components

        @Override
        public void onPortletViewContextInit(PortletViewContext context) {
            // save context for sending events
            this.portletViewContext = context;
            // add event listeners for both "contact-selected" custom event
            // and portlet mode change event
            context.addEventChangeListener("contact-selected",
                    this::onContactSelected);
            context.addPortletModeChangeListener(this::handlePortletModeChange);
            init();
        }

        // handles "contact-selected" event from PortletListView.
        // we check that the event name is correct and that the contact exists.
        // then we display the contact information on the form.
        private void onContactSelected(PortletEvent event) {
            int contactId = Integer
                    .parseInt(event.getParameters().get("contactId")[0]);
            Optional<Contact> contact = getService().findById(contactId);
            if (contact.isPresent()) {
                // ... set active contact
                this.contact = contact.get();
                // ... update the form
            } else {
                // ... empty the form
                clear();
            }
        }

        // called when the portlet mode changes
        // FormPortlet supports two modes: 'view' and 'edit'
        private void handlePortletModeChange(PortletModeEvent event) {
            // set fields to read-only mode when portlet mode is 'view'
            binder.setReadOnly(event.isViewMode());

            // set the button's text based on the portlet mode
            if (event.isViewMode()) {
                action.setText(ACTION_EDIT);
            } else {
                action.setText(ACTION_SAVE);
            }
        }

        private void fireUpdateEvent(Contact contact) {
            Map<String, String> param = Collections
                    .singletonMap("contactId", contact.getId().toString());

            portletViewContext.fireEvent("contact-updated", param);
        }

        private PortletMode getPortletMode() {
            return portletViewContext.getPortletMode();
        }

        private void init() {
            // ... create the form layout
            setupButtons();

            // ... add components to form
        }

        private ContactService getService() {
            // returns ContactService instance
            return null;
        }

        private void setupButtons() {
            action = new Button("action", event -> {
                if (PortletMode.EDIT.equals(getPortletMode())) {
                    save();
                } else {
                    portletViewContext.setPortletMode(PortletMode.EDIT);
                }
            });

            // ... setup rest of the buttons
        }

        private void clear() {
            // ... reset contact and clear form
        }

        private void save() {
            if (contact != null) {
                // ... save contact
            } else {
                // ... create new contact
            }
            // send custom portlet event
            fireUpdateEvent(contact);

            // ... update form

            // sent portlet mode back to view
            portletViewContext.setPortletMode(PortletMode.VIEW);
        }
    }

    private class Contact {
        private Integer id;
        private String firstName;
        private String image;

        public Integer getId() {
            return id;
        }

        public void setId(Integer id) {
            this.id = id;
        }

        public String getFirstName() {
            return firstName;
        }

        public void setFirstName(String firstName) {
            this.firstName = firstName;
        }

        public String getImage() {
            return image;
        }

        public void setImage(String image) {
            this.image = image;
        }
    }

    private static class ContactService {
        public static ContactService getInstance() {
            return null;
        }

        public Optional<Contact> findById(int contactId) {
            return null;
        }

        public void save(Contact contact) {

        }
    }

    private static class FormPortlet {
        public static VaadinPortlet<Component> getCurrent() {
            return null;
        }
    }
}
