import { createValidationSchema, validation } from '../src/validation';

const fields = [
  {
    label: 'What is in the cup?',
    path: 'contains',
    type: 'TextField',
    validation: validation.string().required(),
  },
  {
    label: 'Volume',
    path: 'volume.value',
    type: 'SpinButton',
    validation: validation.number().max(1000),
  },
  {
    label: 'When was this cup filled?',
    path: 'filled',
    type: 'DatePicker',
    id: 'filled',
    validation: validation.string(),
  },
];

describe('Create Validation Schema', () => {
  it('Outputs mixed validation schema when empty', () => {
    expect(createValidationSchema(fields)).toEqual({});
  });
});
