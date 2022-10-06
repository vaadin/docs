package com.vaadin.demo.collaboration.hazelcast;

interface InitialMembershipListener extends MembershipListener {

    void init(InitialMembershipEvent event);
}
