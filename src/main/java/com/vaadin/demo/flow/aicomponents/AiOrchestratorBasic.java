package com.vaadin.demo.flow.aicomponents;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.ai.orchestrator.AiOrchestrator;
import com.vaadin.flow.component.ai.provider.LlmProvider;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.messages.MessageInput;
import com.vaadin.flow.component.messages.MessageList;
import com.vaadin.flow.router.Route;

@Route("ai-components-basic")
public class AiOrchestratorBasic extends Div {

    public AiOrchestratorBasic() {
        // tag::snippet[]
        MessageList messageList = new MessageList();
        messageList.setMarkdown(true);
        MessageInput messageInput = new MessageInput();

        LlmProvider provider = new MockLlmProvider();

        AiOrchestrator.builder(provider, "You are a helpful assistant.")
                .withMessageList(messageList).withInput(messageInput).build();

        add(messageList, messageInput);
        // end::snippet[]

        com.vaadin.demo.component.messages.LLMClient.initPolling(messageList); // hidden-source-line
    }

    public static class Exporter extends DemoExporter<AiOrchestratorBasic> { // hidden-source-line
    } // hidden-source-line
}
