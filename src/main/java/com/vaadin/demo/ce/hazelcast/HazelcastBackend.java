package com.vaadin.demo.ce.hazelcast;

import java.io.Serializable;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.function.BiConsumer;
import java.util.function.Predicate;

import com.vaadin.collaborationengine.Backend;
import com.vaadin.collaborationengine.MembershipEvent.MembershipEventType;
import com.vaadin.collaborationengine.MembershipListener;
import com.vaadin.flow.shared.Registration;

public class HazelcastBackend extends Backend {

    // tag::id-payload[]
    private static final class IdAndPayload implements Serializable {

        private final UUID id;

        private final String payload;

        private IdAndPayload(UUID id, String payload) {
            this.id = id;
            this.payload = payload;
        }
    }

    // end::id-payload[]
    // tag::event-log[]
    public static class HazelcastEventLog implements EventLog {

        private final IList<IdAndPayload> list;
        // tag::event-log-fields[]
        private int nextEventIndex = 0;

        private UUID newerThan;

        private BiConsumer<UUID, String> eventSubscriber;

        // end::event-log-fields[]
        public HazelcastEventLog(IList<IdAndPayload> list) {
            this.list = list;
        }

        // tag::submit-event[]
        @Override
        public void submitEvent(UUID id, String payload) {
            list.add(new IdAndPayload(id, payload));
        }

        // end::submit-event[]
        // tag::deliver-events[]
        private synchronized void deliverEvents() {
            while (nextEventIndex < list.size()) {
                IdAndPayload event = list.get(nextEventIndex++);
                if (this.newerThan == null) {
                    eventSubscriber.accept(event.id, event.payload);
                } else {
                    if (event.id.equals(newerThan)) {
                        this.newerThan = null;
                    }
                }
            }
        }

        // end::deliver-events[]
        // tag::handle-remove[]
        private synchronized void handleRemoveItem() {
            if (nextEventIndex > 0) {
                nextEventIndex--;
            }
        }

        // end::handle-remove[]
        // tag::subscribe[]
        @Override
        public synchronized Registration subscribe(UUID newerThan,
                BiConsumer<UUID, String> eventSubscriber)
                throws EventIdNotFoundException {
            if (this.eventSubscriber != null) {
                throw new IllegalStateException(); // <1>
            }

            if (newerThan != null) {
                Optional<IdAndPayload> newerThanIdAndEvent = list.stream()
                        .filter(item -> newerThan.equals(item.id)).findFirst();
                if (newerThanIdAndEvent.isEmpty()) {
                    throw new EventIdNotFoundException(
                            "newerThan doesn't " + "exist in the log."); // <2>
                }
            }
            this.newerThan = newerThan;
            this.eventSubscriber = eventSubscriber;
            nextEventIndex = 0;

            UUID registrationId = list
                    .addItemListener(new ItemListener<IdAndPayload>() {
                        @Override
                        public void itemAdded(ItemEvent<IdAndPayload> item) {
                            deliverEvents();
                        }

                        @Override
                        public void itemRemoved(ItemEvent<IdAndPayload> item) {
                            handleRemoveItem();
                        }
                    }, false); // <3>

            // Deliver initial events
            deliverEvents(); // <4>

            return () -> {
                synchronized (this) {
                    list.removeItemListener(registrationId);
                    this.eventSubscriber = null;
                }
            }; // <5>
        }

        // end::subscribe[]
        // tag::truncate[]
        @Override
        public synchronized void truncate(UUID olderThan) {
            Predicate<IdAndPayload> filter = e -> true;
            if (olderThan != null) {
                Optional<IdAndPayload> olderThanEvent = list.stream()
                        .filter(item -> olderThan.equals(item.id)).findFirst();
                if (olderThanEvent.isEmpty()) {
                    // NOOP
                    return;
                }
                filter = new Predicate<>() {
                    boolean found;

                    @Override
                    public boolean test(IdAndPayload event) {
                        found = found || olderThan.equals(event.id);
                        return !found;
                    }
                };
            }
            list.removeIf(filter);
        }
        // end::truncate[]
    }

    // end::event-log[]
    private final HazelcastInstance hz;

    private final IMap<String, Snapshot> snapshots;

    public HazelcastBackend(HazelcastInstance hz) {
        this.hz = hz;
        this.snapshots = hz
                .getMap(HazelcastBackend.class.getName() + ".snapshots");
    }

    // tag::openEventLog[]
    @Override
    public EventLog openEventLog(String logId) {
        return new HazelcastEventLog(hz.getList(logId));
    }

    // end::openEventLog[]
    // tag::loadLatestSnapshot[]
    @Override
    public CompletableFuture<Snapshot> loadLatestSnapshot(String name) {
        return CompletableFuture.completedFuture(snapshots.get(name));
    }

    // end::loadLatestSnapshot[]
    // tag::replaceSnapshot[]
    @Override
    public CompletableFuture<Void> replaceSnapshot(String name, UUID expectedId,
            UUID newId, String payload) {
        Snapshot currentSnapshot = snapshots.computeIfAbsent(name,
                k -> new Snapshot(null, null));

        if (Objects.equals(expectedId, currentSnapshot.getId())) {
            Snapshot idAndPayload = new Snapshot(newId, payload);
            snapshots.put(name, idAndPayload);
        }

        return CompletableFuture.completedFuture(null);
    }

    // end::replaceSnapshot[]
    // tag::getNodeId[]
    @Override
    public UUID getNodeId() {
        return hz.getCluster().getLocalMember().getUuid();
    }

    // end::getNodeId[]
    // tag::addMembershipListener[]
    @Override
    public Registration addMembershipListener(
            MembershipListener membershipListener) {
        UUID registrationId = hz.getCluster()
                .addMembershipListener(new InitialMembershipListener() {

                    @Override
                    public void init(InitialMembershipEvent event) {
                        event.getMembers()
                                .forEach(member -> submitEvent(
                                        MembershipEventType.JOIN,
                                        member.getUuid()));
                    }

                    @Override
                    public void memberAdded(MembershipEvent membershipEvent) {
                        submitEvent(MembershipEventType.JOIN,
                                membershipEvent.getMember().getUuid());
                    }

                    @Override
                    public void memberRemoved(MembershipEvent membershipEvent) {
                        submitEvent(MembershipEventType.LEAVE,
                                membershipEvent.getMember().getUuid());
                    }

                    private void submitEvent(MembershipEventType type,
                            UUID id) {
                        membershipListener.handleMembershipEvent(
                                new com.vaadin.collaborationengine.MembershipEvent(
                                        type, id, getCollaborationEngine()));
                    }
                });
        return () -> hz.getCluster().removeMembershipListener(registrationId);
    }
    // end::addMembershipListener[]
}
