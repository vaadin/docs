package com.vaadin.demo.flow.aicomponents;

import java.time.Duration;
import java.util.List;
import java.util.Map;

import com.vaadin.flow.component.ai.common.AIAttachment;
import com.vaadin.flow.component.ai.common.ChatMessage;
import com.vaadin.flow.component.ai.provider.LLMProvider;

import reactor.core.publisher.Flux;

/**
 * Mock LLM provider for documentation examples.
 */
public class MockLLMProvider implements LLMProvider {

    private static final String MOCK_RESPONSE = """
            I can help you with:

            1. **Answering questions** -- from quick facts to in-depth \
            explanations.
            2. **Explaining concepts** -- breaking down complex ideas \
            step by step.
            3. **Brainstorming** -- generating outlines, stories, or \
            code snippets.

            Need anything else? Just ask!
            """;

    @Override
    public Flux<String> stream(LLMRequest request) {
        var tokens = MOCK_RESPONSE.split(" ");
        return Flux.fromArray(tokens).delaySubscription(Duration.ofSeconds(1))
                .delayElements(Duration.ofMillis(100))
                .map(token -> token + " ");
    }

    @Override
    public void setHistory(List<ChatMessage> history,
            Map<String, List<AIAttachment>> attachmentsByMessageId) {
        // Accept history silently for demo purposes
    }
}
