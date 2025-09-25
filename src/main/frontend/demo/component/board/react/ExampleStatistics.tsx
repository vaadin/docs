import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { getServiceHealth } from 'Frontend/demo/domain/DataService';
import type ServiceHealth from 'Frontend/generated/com/vaadin/demo/domain/ServiceHealth';

// tag::snippet[]
function ExampleStatistics() {
  useSignals(); // hidden-source-line
  const serviceHealth = useSignal<ServiceHealth[]>([]);
  useEffect(() => {
    getServiceHealth().then((health) => {
      serviceHealth.value = health;
    });
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
            <tr>
              <th></th>
              <th>City</th>
              <th>Input</th>
              <th>Output</th>
            </tr>
          </thead>
          <tbody>
            {serviceHealth.value.map(({ id, city, input, output }) => (
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
