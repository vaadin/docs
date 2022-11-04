package com.vaadin.demo.collaboration.hazelcast;

interface HazelcastInstance {

    Cluster getCluster();

    <T> IMap<String, T> getMap(String string);

    <T> IList<T> getList(String topicId);
}
