import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Grid, GridColumn } from '@vaadin/react-components';
import { getReports, type Report, ReportStatus } from 'Frontend/demo/domain/DataService';

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

// tag::snippet[]
function renderDueDate({ item: report }: { item: Report }) {
  return <span>{dateFormatter.format(new Date(report.due))}</span>;
}

function renderStatus({ item: report }: { item: Report }) {
  let title: string;
  let theme: string;

  switch (report.status) {
    case ReportStatus.COMPLETED:
      title = 'Completed';
      theme = 'success';
      break;
    case ReportStatus.IN_PROGRESS:
      title = 'In progress';
      theme = '';
      break;
    case ReportStatus.CANCELLED:
      title = 'Cancelled';
      theme = 'error';
      break;
    default:
      title = 'On hold';
      theme = 'contrast';
      break;
  }

  return <span {...{ theme: `badge ${theme} primary` }}>{title}</span>;
}

function Example() {
  useSignals(); // hidden-source-line
  const items = useSignal<Report[]>([]);
  useEffect(() => {
    getReports().then((reports) => {
      items.value = reports as Report[];
    });
  }, []);

  return (
    <Grid items={items.value}>
      <GridColumn path="report" header="Report" />
      <GridColumn header="Due date" renderer={renderDueDate} />
      <GridColumn path="assignee" header="Assignee" />
      <GridColumn header="Status" renderer={renderStatus} />
    </Grid>
  );
}

// end::snippet[]

export default reactExample(Example); // hidden-source-line
