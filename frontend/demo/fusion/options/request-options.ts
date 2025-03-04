import { SlowService } from 'Frontend/generated/endpoints';

export function abortCall() {
  // tag::abort[]
  const controller = new AbortController();

  SlowService.takesTime({ signal: controller.signal }).then((msg) => console.log(msg));

  // The `AbortController` can be used to abort the request, for example after a timeout
  // or an user action like a button click
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 5000);
  // end::abort[]

  return () => clearTimeout(timeoutId);
}

export function muteCall() {
  // tag::mute[]
  SlowService.takesTime({ mute: true }).then((msg) => console.log(msg));
  // end::mute[]
}
