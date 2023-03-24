import { CounterEndpoint } from 'Frontend/generated/endpoints.js';

CounterEndpoint.addOne(1).then((result) => console.log(result));
