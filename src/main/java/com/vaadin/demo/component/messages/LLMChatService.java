package com.vaadin.demo.component.messages;

import java.util.List;

import com.vaadin.demo.component.messages.LLMClient.Message;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import reactor.core.publisher.Flux;

// tag::snippet[]
@BrowserCallable
@AnonymousAllowed
public class LLMChatService {

    public List<Message> getHistory(String chatId) {
        // Implement your message history retrieval logic here
        return LLMClient.getHistory(chatId);
    }

    public Flux<String> stream(String chatId, String userMessage) {
        // Implement your message streaming logic here
        return LLMClient.stream(chatId, userMessage);
    }
}
// end::snippet[]
