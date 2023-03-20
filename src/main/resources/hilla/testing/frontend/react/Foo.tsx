import type { MouseEventHandler } from "react";

export type FooProps = {
  title?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

// tag::snippet[]
export default function Foo({ onClick, title = 'Bar' }: FooProps) {
  return (
    <section>
      <header>{title}</header>
      {onClick && <button onClick={onClick}>Increase</button>}
    </section>
  );
}
// end::snippet[]
