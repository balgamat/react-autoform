import * as validation from 'yup';
import { Schema, setLocale } from 'yup';
import { Field } from '../types';
import { all, assocPath, is, map, prop } from 'ramda';

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
  if (all((f: Field<T>) => !prop('validation', f))(fields)) {
    return validation.mixed();
  }

  const structure = fields.reduce((acc, field) => {
    if (!field.validation) return acc;
    return assocPath(field.path.split('.'), () => field.validation, acc);
  }, {});

  const createObjectShape = (structure: any): any => {
    if (is(Function, structure)) return structure();
    return validation.object().shape(map(createObjectShape, structure) as any);
  };

  return createObjectShape(structure);
};

export { validation };
