import { CounterService } from 'Frontend/generated/endpoints.js';

CounterService.addOne(1).then((result: number) => console.log(result));
