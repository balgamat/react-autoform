import { assoc, is, keys, pipe, reduce } from 'ramda';

export const prepareComputedProps = <P>(o: any, props: P) =>
  pipe(
    keys,
    reduce(
      (acc, k: string) =>
        assoc(
          k,
          (props[k as keyof P] as any)['$fn'] !== undefined &&
            is(Function, (props[k as keyof P] as any)['$fn'])
            ? (((props[k as keyof P] as any)['$fn'] as unknown) as Function)(o)
            : props[k as keyof P],
        )(acc),
      {},
    ),
  )(props);
