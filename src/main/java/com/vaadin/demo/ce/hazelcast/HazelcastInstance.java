package com.vaadin.demo.ce.hazelcast;

interface HazelcastInstance {

    Cluster getCluster();

    <T> IMap<String, T> getMap(String string);

    <T> IList<T> getList(String topicId);
}
