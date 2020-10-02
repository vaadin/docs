package com.vaadin.flow.tutorial.lit.binder.ui;

import java.util.Comparator;

import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.data.provider.DataProvider;
import com.vaadin.flow.data.provider.ListDataProvider;
import com.vaadin.flow.tutorial.annotations.CodeFor;
import com.vaadin.flow.tutorial.lit.binder.data.User;
import com.vaadin.flow.tutorial.lit.binder.data.UsersRepository;

@CodeFor("polymer-templates/tutorial-template-and-binder.asciidoc")
/**
 * UsersGrid is used to display users in the system.
 */
public class UsersGrid extends Grid<User> {

    /**
     * DataProvider of the UsersGrid.
     */
    private ListDataProvider<User> dataProvider;

    /**
     * Initializes the UsersGrid.
     */
    public UsersGrid() {
        addColumn(User::getEmail).setHeader("email")
                .setComparator(Comparator.comparing(User::getEmail)).setSortable(true);
        addColumn(User::getFirstName).setHeader("first name")
                .setComparator(Comparator.comparing(User::getFirstName)).setSortable(true);
        addColumn(User::getLastName).setHeader("last name")
                .setComparator(Comparator.comparing(User::getLastName)).setSortable(true);

        setSelectionMode(SelectionMode.SINGLE);

        initDataProvider();
    }

    /**
     * Initializes the UsersGrid.
     */
    private void initDataProvider() {
        dataProvider = DataProvider.ofCollection(UsersRepository.getUsers());
        setDataProvider(dataProvider);
    }

    /**
     * Refreshes the elements of the data provider.
     */
    public void refreshAll() {
        dataProvider.refreshAll();
    }

    /**
     * Refreshes a user in the UsersGrid.
     *
     * @param user user
     */
    public void refresh(User user) {
        dataProvider.refreshItem(user);
    }
}
