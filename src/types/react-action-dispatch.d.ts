import type { Dispatch } from 'react';

declare module 'react' {
  export type ActionDispatch<A> = Dispatch<A>;
}
