package com.vaadin.demo.ce;

import com.vaadin.collaborationengine.CollaborationEngine;
import com.vaadin.collaborationengine.CollaborationList;
import com.vaadin.collaborationengine.ListInsertResult;
import com.vaadin.collaborationengine.ListKey;
import com.vaadin.collaborationengine.UserInfo;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;

public class CollaborationListExample extends VerticalLayout {

    public CollaborationListExample() {
        // tag::snippet[]
        // NOTE: In a real application, use the user id of the logged in user
        // instead
        String userId = System.identityHashCode(UI.getCurrent()) + "";
        UserInfo localUser = new UserInfo(userId, "User " + userId);
        CollaborationEngine.getInstance().openTopicConnection(this, "my-topic",
                localUser, connection -> {
                    CollaborationList list = connection.getNamedList("my-list");
                    // tag::result[]
                    ListInsertResult<Void> result = list.insertLast("foo");
                    // tag::future[]
                    result.getCompletableFuture().thenAccept(v -> {
                        // do something when the insertion completes
                    });
                    // end::future[]
                    // tag::key[]
                    ListKey key = result.getKey();

                    // Replace an item using its key
                    list.set(key, "bar");

                    // Get an item value using its key
                    String bar = list.getItem(key, String.class);

                    // tag::advanced[]
                    // Insert an item at the end of the list
                    // Only succeeds if key is currently last
                    ListInsertOperation operation1 = ListInsertOperation
                            .insertLast("baz")
                            .ifLast(key);
                    ListInsertResult<Boolean> result1 = list.insert(operation1);
                    ListKey key1 = result1.getKey();

                    // Insert an item before key1
                    // Only succeeds if key1 is currently last
                    ListInsertOperation operation2 = ListInsertOperation
                            .insertBefore(key1, "qux")
                            .ifLast(key1);
                    ListInsertResult<Boolean> result2 = list.insert(operation2);
                    ListKey key2 = result2.getKey();

                    // Insert an item between two keys
                    // Only succeeds if the keys are consecutive
                    ListInsertOperation operation3 = ListInsertOperation
                            .insertBetween(key2, key1, "xyz");
                    ListInsertResult<Boolean> result3 = list.insert(operation3);
                    // end::advanced[]

                    // Remove an item using its key
                    list.remove(key);
                    // end::key[]
                    // end::result[]
                    return null;
                });
        // end::snippet[]
    }
}
