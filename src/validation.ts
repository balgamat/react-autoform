// @ts-ignore
import * as validation from '@hapi/joi';
// @ts-ignore
import { Schema } from '@hapi/joi';
import { Field } from '../types';
import { assocPath } from 'ramda';

const builder = require('joi-json').builder();

export const createValidationSchema = <T>(fields: Array<Field<T>>): Schema => {
  const structure = fields.reduce((acc, field) => {
    return assocPath(field.path.split('.'), field.validation ?? 'any', acc);
  }, {});

  return validation.object(builder.build(structure));
};

export { validation };
