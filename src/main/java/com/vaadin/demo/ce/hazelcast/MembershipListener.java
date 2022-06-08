package com.vaadin.demo.ce.hazelcast;

interface MembershipListener {
    void memberAdded(MembershipEvent membershipEvent);

    void memberRemoved(MembershipEvent membershipEvent);
}
