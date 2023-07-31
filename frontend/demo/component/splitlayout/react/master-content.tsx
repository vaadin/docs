import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Table } from '@hilla/react-components/Table.js';
import { TableHead } from '@hilla/react-components/TableHead.js';
import { TableRow } from '@hilla/react-components/TableRow.js';
import { TableCell } from '@hilla/react-components/TableCell.js';
import { TableBody } from '@hilla/react-components/TableBody.js';

@customElement('master-content')
export class MasterContent extends React.Component {
  static override styles = css`
    :host {
      overflow: hidden !important;
      color: var(--lumo-contrast-20pct);
    }

    table {
      border-collapse: collapse;
    }

    th,
    td {
      border-bottom: 1px solid currentColor;
      padding: var(--lumo-space-wide-m);
    }

    th::before,
    td::before {
      content: '\\00a0';
      display: inline-block;
      width: 8rem;
      background: currentColor;
      border-radius: calc(var(--lumo-size-m) / 2);
      font-size: var(--lumo-font-size-xxs);
    }

    th {
      background: var(--lumo-contrast-5pct);
    }
  `;

  render() {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        {/* prettier-ignore */}
        <TableBody>
          <TableRow><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell></TableRow>
          <TableRow><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell></TableRow>
          <TableRow><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell></TableRow>
          <TableRow><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell></TableRow>
          <TableRow><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell></TableRow>
          <TableRow><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell></TableRow>
          <TableRow><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell></TableRow>
          <TableRow><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell></TableRow>
          <TableRow><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell></TableRow>
          <TableRow><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell></TableRow>
          <TableRow><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell></TableRow>
          <TableRow><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell></TableRow>
          <TableRow><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell></TableRow>
          <TableRow><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell></TableRow>
          <TableRow><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell></TableRow>
          <TableRow><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell></TableRow>
        </TableBody>
      </Table>
    );
  }
}
