import { assoc, is, keys, pipe, reduce } from 'ramda';

export const prepareComputedProps = <P, >(o: any, props: P) =>
  pipe(
    keys,
    reduce(
      (acc, k: string) =>
        assoc(
          k,
          is(Function, props[k as keyof P])
          ? ( ( props[k as keyof P] as unknown ) as Function )(o)
          : props[k as keyof P],
        ),
      {},
    ),
  )(props);