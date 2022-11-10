package com.vaadin.demo.collaboration.hazelcast;

import java.util.Set;

interface InitialMembershipEvent {

    Set<Member> getMembers();
}
