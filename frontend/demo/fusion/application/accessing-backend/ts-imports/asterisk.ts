import * as CounterEndpoint from 'Frontend/generated/CounterService';

CounterEndpoint.addOne(1).then((result) => console.log(result));
