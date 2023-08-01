import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useState } from 'react';
import { Grid } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { getReports, ReportStatus } from 'Frontend/demo/domain/DataService';
import type Report from 'Frontend/generated/com/vaadin/demo/domain/Report';

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

function Example() {
  const [items, setItems] = useState<Report[]>([]);
  useEffect(() => {
    getReports().then((reports) => setItems(reports as Report[]));
  }, []);

  return (
    <>
      {/* tag::snippet[] */}
      <Grid items={items}>
        <GridColumn path="report" header="Report" />

        <GridColumn header="Due date">
          {({ item: report }) => <span>{dateFormatter.format(new Date(report.due))}</span>}
        </GridColumn>

        <GridColumn path="assignee" header="Assignee" />

        <GridColumn header="Status">
          {({ item: report }) => {
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
          }}
        </GridColumn>
      </Grid>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
