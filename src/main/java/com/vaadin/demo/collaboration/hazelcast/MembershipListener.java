package com.vaadin.demo.collaboration.hazelcast;

interface MembershipListener {
    void memberAdded(MembershipEvent membershipEvent);

    void memberRemoved(MembershipEvent membershipEvent);
}
