import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { AutoForm, type AutoFormLayoutRendererProps } from '@vaadin/hilla-react-crud';
import { Checkbox } from '@vaadin/react-components/Checkbox.js';
import { DatePicker } from '@vaadin/react-components/DatePicker.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { Select } from '@vaadin/react-components/Select.js';
import { TextArea } from '@vaadin/react-components/TextArea.js';
import { TextField } from '@vaadin/react-components/TextField.js';
import { TimePicker } from '@vaadin/react-components/TimePicker.js';
import { VerticalLayout } from '@vaadin/react-components/VerticalLayout.js';
import { autoGridHostStyles } from 'Frontend/demo/component/auto-grid/react/auto-grid-host-styles'; // hidden-source-line
import Gender from 'Frontend/generated/com/vaadin/demo/fusion/crud/Employee/Gender';
import EmployeeModel from 'Frontend/generated/com/vaadin/demo/fusion/crud/EmployeeModel';
import { EmployeeService } from 'Frontend/generated/endpoints.js';

// tag::snippet[]
function GroupingLayoutRenderer({ form }: AutoFormLayoutRendererProps<EmployeeModel>) {
  const { field, model } = form;
  return (
    <VerticalLayout>
      <h4>Personal Information:</h4>
      <HorizontalLayout theme="spacing" style={{ paddingBottom: '1.5rem' }}>
        <TextField label="First Name" {...field(model.firstName)} />
        <TextField label="Last Name" {...field(model.lastName)} />
        <Select
          label="Gender"
          {...field(model.gender)}
          items={[
            { label: 'Female', value: Gender.FEMALE },
            { label: 'Male', value: Gender.MALE },
            { label: 'Non-Binary', value: Gender.NON_BINARY },
            { label: 'Prefer not to say', value: Gender.OTHER },
          ]}
        />
      </HorizontalLayout>
      <h4>Employment Information:</h4>
      <HorizontalLayout theme="spacing" style={{ paddingBottom: '1.5rem', alignItems: 'baseline' }}>
        <DatePicker label="Start Date" {...field(model.startDate)} />
        <TimePicker label="Shift Starts At" {...field(model.shiftStartsAt)} />
        <Checkbox label="Active" {...field(model.active)} />
      </HorizontalLayout>
      <h4>Other:</h4>
      <HorizontalLayout theme="spacing">
        <TextArea label="Description" {...field(model.description)} style={{ flexGrow: 1 }} />
      </HorizontalLayout>
    </VerticalLayout>
  );
}
// end::snippet[]

function Example() {
  return (
    // tag::snippet[]
    <AutoForm
      service={EmployeeService}
      model={EmployeeModel}
      layoutRenderer={GroupingLayoutRenderer}
    />
    // end::snippet[]
  );
}

export default reactExample(Example, autoGridHostStyles); // hidden-source-line
