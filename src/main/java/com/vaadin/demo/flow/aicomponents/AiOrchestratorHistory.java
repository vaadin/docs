package com.vaadin.demo.flow.aicomponents;

import java.time.Instant;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.ai.common.AiAttachment;
import com.vaadin.flow.component.ai.common.ChatMessage;
import com.vaadin.flow.component.ai.orchestrator.AiOrchestrator;
import com.vaadin.flow.component.ai.provider.LlmProvider;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.messages.MessageInput;
import com.vaadin.flow.component.messages.MessageList;
import com.vaadin.flow.router.Route;

@Route("ai-components-history")
public class AiOrchestratorHistory extends Div {

    public AiOrchestratorHistory() {
        // tag::snippet[]
        MessageList messageList = new MessageList();
        messageList.setMarkdown(true);
        MessageInput messageInput = new MessageInput();

        LlmProvider provider = getLlmProvider();

        List<ChatMessage> savedHistory = getHistory();
        Map<String, List<AiAttachment>> savedAttachments = getSavedAttachments();

        AiOrchestrator.builder(provider, "You are a helpful assistant.")
                .withMessageList(messageList).withInput(messageInput)
                .withHistory(savedHistory, savedAttachments).build();

        add(messageList, messageInput);
        // end::snippet[]

        com.vaadin.demo.component.messages.LLMClient.initPolling(messageList); // hidden-source-line
    }

    private LlmProvider getLlmProvider() {
        return new MockLlmProvider();
    }

    private Map<String, List<AiAttachment>> getSavedAttachments() {
        return Collections.emptyMap();
    }

    private List<ChatMessage> getHistory() {
        return List.of(
                new ChatMessage(ChatMessage.Role.USER,
                        "What can you help me with?", "msg-1", Instant.now()),
                new ChatMessage(ChatMessage.Role.ASSISTANT,
                        "I can help with coding, writing, "
                                + "and answering questions!",
                        null, Instant.now()));
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<AiOrchestratorHistory> { // hidden-source-line
    } // hidden-source-line
}
