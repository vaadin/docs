package com.vaadin.demo.collaboration.hazelcast;

import java.util.concurrent.ConcurrentMap;

interface IMap<K, V> extends ConcurrentMap<K, V> {
}
