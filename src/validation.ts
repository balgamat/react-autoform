// @ts-ignore
import * as validation from '@hapi/joi';
// @ts-ignore
import { Schema } from '@hapi/joi';
import { Field } from '../types';
import { all, assocPath, is, map, prop } from 'ramda';

const builder = require('joi-json').builder();

export const defineLocale = (t: any, pathLabels: any) => {};
/*({
  mixed: {
    default: ({ path }) => t('VALIDATION.FIELD_INVALID', { label: pathLabels[path!] }),
    required: ({ path }) => t('VALIDATION.FIELD_REQUIRED', { label: pathLabels[path!] }),
    oneOf: ({ path, values }) => t('VALIDATION.ONE_OF', { values, label: pathLabels[path!] }),
    notOneOf: ({ path, values }) =>
      t('VALIDATION.NOT_ONE_OF', { values, label: pathLabels[path!] }),
    notType: 'VALIDATION.NOT_TYPE',
  },
  string: {
    length: ({ length, path }) =>
      t('VALIDATION.INVALID_LENGTH', { length, label: pathLabels[path!] }),
    min: ({ min, path }) => t('VALIDATION.MIN_LENGTH', { min, label: pathLabels[path!] }),
    max: ({ max, path }) => t('VALIDATION.MAX_LENGTH', { max, label: pathLabels[path!] }),
    matches: ({ regex, path }) => t('VALIDATION.MATCHES', { regex, label: pathLabels[path!] }),
    email: t('VALIDATION.NOT_EMAIL'),
    url: t('VALIDATION.NOT_URL'),
    uuid: t('VALIDATION.NOT_UUID'),
    trim: t('VALIDATION.TRIM'),
    lowercase: t('VALIDATION.LOWERCASE'),
    uppercase: t('VALIDATION.UPPERCASE'),
  },
  number: {
    min: ({ min, path }) => t('VALIDATION.NUMBER_TOO_SMALL', { min, label: pathLabels[path!] }),
    max: ({ max, path }) => t('VALIDATION.NUMBER_TOO_BIG', { max, label: pathLabels[path!] }),
    lessThan: ({ less, path }) => t('VALIDATION.LESS_THAN', { less, label: pathLabels[path!] }),
    moreThan: ({ more, path }) => t('VALIDATION.MORE_THAN', { more, label: pathLabels[path!] }),
    positive: ({ more, path }) => t('VALIDATION.POSITIVE', { more, label: pathLabels[path!] }),
    negative: ({ less, path }) => t('VALIDATION.NEGATIVE', { less, label: pathLabels[path!] }),
    integer: t('VALIDATION.INTEGER'),
  },
  date: {
    min: ({ min, path }) =>
      t('VALIDATION.DATE_MIN', {
        min: new Date(min).toLocaleDateString(),
        label: pathLabels[path!],
      }),
    max: ({ max, path }) =>
      t('VALIDATION.DATE_MAX', {
        max: new Date(max).toLocaleDateString(),
        label: pathLabels[path!],
      }),
  },
  boolean: {},
  object: {
    noUnknown: t('VALIDATION.NO_UNKNOWN'),
  },
  array: {
    min: ({ min, path }) => t('VALIDATION.ARRAY_MIN', { min, label: pathLabels[path!] }),
    max: ({ max, path }) => t('VALIDATION.ARRAY_MAX', { max, label: pathLabels[path!] }),
  },
});*/

export const createValidationSchema = <T>(fields: Array<Field<T>>): Schema => {
  const structure = fields.reduce((acc, field) => {
    return assocPath(field.path.split('.'), field.validation ?? 'any', acc);
  }, {});

  return validation.object(builder.build(structure));
};

export { validation };
