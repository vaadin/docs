import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { autoGridHostStyles } from 'Frontend/demo/component/auto-grid/react/auto-grid-host-styles'; // hidden-source-line
import { type AutoFormLayoutRendererProps, AutoForm } from '@hilla/react-crud';
import { EmployeeService } from 'Frontend/generated/endpoints.js';
import EmployeeModel from 'Frontend/generated/com/vaadin/demo/fusion/crud/EmployeeModel';
import Gender from 'Frontend/generated/com/vaadin/demo/fusion/crud/Employee/Gender';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { TextField } from '@hilla/react-components/TextField.js';
import { Select } from '@hilla/react-components/Select.js';
import { DatePicker } from '@hilla/react-components/DatePicker.js';
import { TimePicker } from '@hilla/react-components/TimePicker.js';
import { Checkbox } from '@hilla/react-components/Checkbox.js';
import { TextArea } from '@hilla/react-components/TextArea.js';

// tag::snippet[]
function GroupingLayoutRenderer({ children, form }: AutoFormLayoutRendererProps<EmployeeModel>) {
  const { field, model } = form;
  return (
    <VerticalLayout>
      <h4>Personal Information:</h4>
      <HorizontalLayout theme="spacing" className="pb-l">
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
      <HorizontalLayout theme="spacing" className="pb-l items-baseline">
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
