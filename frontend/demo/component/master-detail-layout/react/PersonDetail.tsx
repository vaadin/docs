import React from 'react';
import {
  Button,
  EmailField,
  FormLayout,
  TextField,
  VerticalLayout,
} from '@vaadin/react-components';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

interface PersonDetailProps {
  person: Person | null;
  onClose(): void;
}

function PersonDetail({ person, onClose }: PersonDetailProps) {
  return (
    <VerticalLayout theme="padding">
      <FormLayout>
        <TextField label="First Name" value={person?.firstName ?? ''} readonly />
        <TextField label="Last Name" value={person?.lastName ?? ''} readonly />
        <EmailField label="Email" value={person?.email ?? ''} readonly />
        <TextField label="Profession" value={person?.profession ?? ''} readonly />
      </FormLayout>
      <Button onClick={onClose} style={{ marginTop: 'var(--vaadin-gap-l)' }}>
        Close
      </Button>
    </VerticalLayout>
  );
}

export default PersonDetail;
