import { useEffect, useState } from 'react';
import * as UsersEndpoint from 'Frontend/generated/UsersEndpoint.js';
import User from 'Frontend/generated/com/vaadin/demo/hilla/testing/User.js';

export default function UsersPage() {
  const [users, setUsers] = useState<readonly User[]>([]);

  useEffect(() => {
    UsersEndpoint.findAll().then((result) => setUsers(result));
  }, []);

  return (
    <table data-testid="users">
      <th>
        <td>First Name</td>
        <td>Last Name</td>
      </th>
      {users.map(({ id, firstName, lastName }) => (
        <tr key={id}>
          <td>{firstName}</td>
          <td>{lastName}</td>
        </tr>
      ))}
    </table>
  );
}
