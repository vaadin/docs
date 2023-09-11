import { CounterService } from 'Frontend/generated/endpoints';

CounterService.addOne(1).then((result: number) => console.log(result));
