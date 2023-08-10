import React, { useEffect, useState } from 'react';
import { getServiceHealth } from 'Frontend/demo/domain/DataService';
import type ServiceHealth from 'Frontend/generated/com/vaadin/demo/domain/ServiceHealth';

// tag::snippet[]
function ExampleStatistics() {
  const [serviceHealth, setServiceHealth] = useState<ServiceHealth[]>([]);
  useEffect(() => {
    getServiceHealth().then((health) => setServiceHealth(health));
  }, []);

  return (
    <div className="statistics">
      <header className="title">Service health</header>
      <section className="legend">
        <label>
          <span className="level excellent"></span>
          Excellent
        </label>
        <label>
          <span className="level ok"></span>
          Ok
        </label>
        <label>
          <span className="level failing"></span>
          Failing
        </label>
      </section>
      <div className="table">
        <table>
          <thead>
            <th></th>
            <th>City</th>
            <th>Input</th>
            <th>Output</th>
          </thead>
          <tbody>
            {serviceHealth.map(({ id, city, input, output }) => (
              <tr key={id}>
                <td>
                  <span className="level ok" />
                </td>
                <td>{city}</td>
                <td className="number">{input}</td>
                <td className="number">{output}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
// end::snippet[]

export default ExampleStatistics;
