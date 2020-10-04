import * as validation from 'yup';
import { Field } from '../types';
import { Schema } from 'yup';
import { setLocale } from 'yup';
import { assocPath, isEmpty } from 'ramda';

setLocale({
  mixed: {
    default: 'VALIDATION.FIELD_INVALID',
  },
  number: {
    min: ({ min }) => ({ key: 'VALIDATION.NUMBER_TOO_SMALL', values: { min } }),
    max: ({ max }) => ({ key: 'VALIDATION.NUMBER_TOO_BIG', values: { max } }),
  },
});

export const createValidationSchema = <T>(fields: Array<Field<T>>): Schema<any> => {
  const shape = fields.reduce(
    (acc, field) => assocPath(field.path.split('.'), field.validation, acc),
    {},
  );

  if (isEmpty(shape)) {
    return validation.mixed();
  }

  return validation.object().shape(shape);
};

export { validation };
