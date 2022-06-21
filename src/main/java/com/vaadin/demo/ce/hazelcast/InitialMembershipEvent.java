package com.vaadin.demo.ce.hazelcast;

import java.util.Set;

interface InitialMembershipEvent {

    Set<Member> getMembers();
}
