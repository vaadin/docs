package com.vaadin.demo.ce.hazelcast;

interface InitialMembershipListener extends MembershipListener {

    void init(InitialMembershipEvent event);
}
