package com.vaadin.demo.ce.hazelcast;

import java.util.UUID;

interface Cluster {

    Member getLocalMember();

    UUID addMembershipListener(MembershipListener listener);

    boolean removeMembershipListener(UUID registrationId);
}
