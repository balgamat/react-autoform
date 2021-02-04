import { createValidationSchema, validation } from '../src/validation';
import { Field } from '../types';

const fields = [
  {
    path: 'contains',
    validation: 'validation.string().required()',
  },
  {
    path: 'volume.value',
    validation: 'validation.number().max(1000)',
  },
  {
    path: 'volume.unit',
    validation: 'validation.string().required()',
  },
  {
    path: 'volume.extra.multiplier',
    validation: 'validation.number().min(1).max(10)',
  },
  {
    path: 'filled',
  },
];

describe('Validation', () => {
  it('Outputs object schema according to the fields sent', () => {
    expect(
      JSON.stringify(createValidationSchema((fields as unknown) as Field<any>[]), null, 2),
    ).toEqual(
      JSON.stringify(
        validation.object().shape({
          contains: validation.string().required(),
          volume: validation.object().shape({
            value: validation.number().max(1000),
            unit: validation.string().required(),
            extra: validation.object().shape({
              multiplier: validation
                .number()
                .min(1)
                .max(10),
            }),
          }),
        }),
        null,
        2,
      ),
    );
  });

  it('Outputs mixed schema when no validations are set', () => {
    expect(
      JSON.stringify(
        createValidationSchema((fields.map(f => ({ path: f.path })) as unknown) as Field<any>[]),
        null,
        2,
      ),
    ).toEqual(JSON.stringify(validation.mixed(), null, 2));
  });
});
