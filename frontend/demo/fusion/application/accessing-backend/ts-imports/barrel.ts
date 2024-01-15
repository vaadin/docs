import { CounterEndpoint } from 'Frontend/generated/endpoints';

CounterEndpoint.addOne(1).then((result) => console.log(result));
