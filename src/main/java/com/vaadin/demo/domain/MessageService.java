package com.vaadin.demo.domain;

import java.time.Instant;
import java.util.stream.Stream;

import com.vaadin.flow.spring.annotation.SpringComponent;

@SpringComponent
public class MessageService {
    public Stream<Message> findAllByTopicSince(String topic, Instant since) {
        return null;
    }

    public void save(Message message) {
    }
}
