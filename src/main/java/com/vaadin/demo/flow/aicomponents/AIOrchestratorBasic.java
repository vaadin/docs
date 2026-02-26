package com.vaadin.demo.flow.aicomponents;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.ai.orchestrator.AIOrchestrator;
import com.vaadin.flow.component.ai.provider.LLMProvider;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.messages.MessageInput;
import com.vaadin.flow.component.messages.MessageList;
import com.vaadin.flow.router.Route;

@Route("ai-components-basic")
public class AIOrchestratorBasic extends Div {

    public AIOrchestratorBasic() {
        // tag::snippet[]
        MessageList messageList = new MessageList();
        MessageInput messageInput = new MessageInput();

        LLMProvider provider = getLLMProvider();

        AIOrchestrator.builder(provider,
                        "You are a helpful assistant.")
                .withMessageList(messageList)
                .withInput(messageInput)
                .build();

        add(messageList, messageInput);
        // end::snippet[]

        com.vaadin.demo.component.messages.LLMClient.initPolling(messageList); // hidden-source-line
    }

    private LLMProvider getLLMProvider() {
        return new MockLLMProvider();
    }

    public static class Exporter extends DemoExporter<AIOrchestratorBasic> { // hidden-source-line
    } // hidden-source-line
}
