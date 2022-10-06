package com.vaadin.demo.collaboration.hazelcast;

interface ItemListener<E> {

    void itemAdded(ItemEvent<E> item);

    void itemRemoved(ItemEvent<E> item);
}
