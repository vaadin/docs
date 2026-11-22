import { useSignal } from '@vaadin/hilla-react-signals';
import {
  Button,
  Checkbox,
  HorizontalLayout,
  TextField,
  VerticalLayout,
} from '@vaadin/react-components';
import Vote from 'Frontend/generated/com/vaadin/demo/fusion/signals/MeetingService/Vote';
import { MeetingService } from 'Frontend/generated/endpoints';

// tag::snippet[]
// tag::signals[]
// Created once, outside the component
const topic = MeetingService.topic({ defaultValue: '' });
const agenda = MeetingService.agenda();
const yesVotes = MeetingService.votes(Vote.YES);
const noVotes = MeetingService.votes(Vote.NO);
// end::signals[]

export default function MeetingView() {
  const newItem = useSignal('');

  return (
    <VerticalLayout theme="spacing padding">
      {/* tag::value[] */}
      <TextField
        label="Topic"
        value={topic.value}
        onChange={(event) => {
          topic.value = event.target.value;
        }}
      />
      {/* end::value[] */}

      {/* tag::number[] */}
      <HorizontalLayout theme="spacing">
        <Button onClick={() => yesVotes.incrementBy(1)}>Yes ({yesVotes.value})</Button>
        <Button onClick={() => noVotes.incrementBy(1)}>No ({noVotes.value})</Button>
      </HorizontalLayout>
      {/* end::number[] */}

      {/* tag::list[] */}
      {agenda.value.map((item) => (
        <HorizontalLayout key={item.id} theme="spacing">
          <Checkbox
            label={item.value.title}
            checked={item.value.done}
            onChange={(event) => {
              item.value = { ...item.value, done: event.target.checked };
            }}
          />
          <Button theme="tertiary" onClick={() => agenda.remove(item)}>
            Remove
          </Button>
        </HorizontalLayout>
      ))}
      <HorizontalLayout theme="spacing">
        <TextField
          value={newItem.value}
          onValueChanged={(event) => {
            newItem.value = event.detail.value;
          }}
        />
        <Button
          onClick={() => {
            agenda.insertLast({ title: newItem.value, done: false });
            newItem.value = '';
          }}
        >
          Add
        </Button>
      </HorizontalLayout>
      {/* end::list[] */}
    </VerticalLayout>
  );
}
// end::snippet[]
