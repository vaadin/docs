package com.vaadin.demo.ce.hazelcast;

interface ItemListener<E> {

    void itemAdded(ItemEvent<E> item);

    void itemRemoved(ItemEvent<E> item);
}
