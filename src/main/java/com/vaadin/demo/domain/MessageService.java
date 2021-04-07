package com.vaadin.demo.domain;

import java.time.Instant;
import java.util.stream.Stream;

import com.vaadin.flow.spring.annotation.SpringComponent;

@SpringComponent
public interface MessageService {
    Stream<Message> findAllByTopicSince(String topic, Instant since);

    void save(Message message);
}
