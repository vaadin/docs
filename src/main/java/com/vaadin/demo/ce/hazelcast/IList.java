package com.vaadin.demo.ce.hazelcast;

import java.util.List;
import java.util.UUID;

interface IList<E> extends List<E> {

    UUID addItemListener(ItemListener<E> listener, boolean includeValue);

    boolean removeItemListener(UUID registrationId);
}
