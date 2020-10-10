import { prepareComputedProps } from '../src/prepareComputedProps';

const o = {
  P1: 'String',
  P2: 2,
  P3: true,
};

const plainProps = {
  label: 'Label 1',
  options: ['A', 'B'],
};

describe('Prepare Computed Props', () => {
  it('Passes plain props', () => {
    expect(prepareComputedProps(o, plainProps)).toEqual(plainProps);
  });
  it('Computes props from functions mixed with plain props', () => {
    expect(
      prepareComputedProps(o, {
        label: { $fn: (o: any) => o.P1 },
        options: ['A', 'B'],
      }),
    ).toEqual({
      label: 'String',
      options: ['A', 'B'],
    });
  });
});
