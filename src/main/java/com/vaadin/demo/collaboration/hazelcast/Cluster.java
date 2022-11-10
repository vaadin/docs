package com.vaadin.demo.collaboration.hazelcast;

import java.util.UUID;

interface Cluster {

    Member getLocalMember();

    UUID addMembershipListener(MembershipListener listener);

    boolean removeMembershipListener(UUID registrationId);
}
