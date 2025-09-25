import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { MessageList, type MessageListItem } from '@vaadin/react-components/MessageList.js';

function Example() {
  useSignals(); // hidden-source-line
  // tag::snippet[]
  const items = useSignal<MessageListItem[]>([]);

  useEffect(() => {
    items.value = [
      {
        text: '**Hello team!** Did everyone review the *design document* for the new project?',
        userName: 'Alex Johnson',
      },
      {
        text: `## Project Update
I've completed the initial research phase and documented my findings.

* UI mockups ✅
* Market analysis ✅
* [See detailed report](https://vaadin.com)

Let me know your thoughts!`,
        userName: 'Sam Rivera',
      },
    ];
  }, []);

  return <MessageList items={items.value} markdown />;
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
