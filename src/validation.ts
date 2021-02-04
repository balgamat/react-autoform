import * as validation from 'yup';
import { Field } from '../types';
import { all, assocPath, is, map, prop, propOr } from 'ramda';
import { AnySchema } from 'yup';

export const defineLocale = (t: any, pathLabels: any) =>
  validation.setLocale({
    mixed: {
      default: ({ path }: { path: string }) =>
        t('VALIDATION.FIELD_INVALID', { label: propOr(t('VALIDATION.FIELD'), path, pathLabels) }),
      required: ({ path }: { path: string }) =>
        t('VALIDATION.FIELD_REQUIRED', { label: propOr(t('VALIDATION.FIELD'), path, pathLabels) }),
      oneOf: ({ path, values }: { path: string; values: any[] }) =>
        t('VALIDATION.ONE_OF', { values, label: propOr(t('VALIDATION.FIELD'), path, pathLabels) }),
      notOneOf: ({ path, values }: { path: string; values: any[] }) =>
        t('VALIDATION.NOT_ONE_OF', {
          values,
          label: propOr(t('VALIDATION.FIELD'), path, pathLabels),
        }),
      notType: 'VALIDATION.NOT_TYPE',
    },
    string: {
      length: ({ length, path }: { path: string; length: number }) =>
        t('VALIDATION.INVALID_LENGTH', {
          length,
          label: propOr(t('VALIDATION.FIELD'), path, pathLabels),
        }),
      min: ({ min, path }: { path: string; min: number }) =>
        t('VALIDATION.MIN_LENGTH', { min, label: propOr(t('VALIDATION.FIELD'), path, pathLabels) }),
      max: ({ max, path }: { path: string; max: number }) =>
        t('VALIDATION.MAX_LENGTH', { max, label: propOr(t('VALIDATION.FIELD'), path, pathLabels) }),
      matches: ({ regex, path }: { path: string; regex: string }) =>
        t('VALIDATION.MATCHES', { regex, label: propOr(t('VALIDATION.FIELD'), path, pathLabels) }),
      email: t('VALIDATION.NOT_EMAIL'),
      url: t('VALIDATION.NOT_URL'),
      uuid: t('VALIDATION.NOT_UUID'),
      trim: t('VALIDATION.TRIM'),
      lowercase: t('VALIDATION.LOWERCASE'),
      uppercase: t('VALIDATION.UPPERCASE'),
    },
    number: {
      min: ({ min, path }: { path: string; min: number }) =>
        t('VALIDATION.NUMBER_TOO_SMALL', {
          min,
          label: propOr(t('VALIDATION.FIELD'), path, pathLabels),
        }),
      max: ({ max, path }: { path: string; max: number }) =>
        t('VALIDATION.NUMBER_TOO_BIG', {
          max,
          label: propOr(t('VALIDATION.FIELD'), path, pathLabels),
        }),
      lessThan: ({ less, path }: { path: string; less: number }) =>
        t('VALIDATION.LESS_THAN', { less, label: propOr(t('VALIDATION.FIELD'), path, pathLabels) }),
      moreThan: ({ more, path }: { path: string; more: number }) =>
        t('VALIDATION.MORE_THAN', { more, label: propOr(t('VALIDATION.FIELD'), path, pathLabels) }),
      positive: ({ more, path }: { path: string; more: number }) =>
        t('VALIDATION.POSITIVE', { more, label: propOr(t('VALIDATION.FIELD'), path, pathLabels) }),
      negative: ({ less, path }: { path: string; less: number }) =>
        t('VALIDATION.NEGATIVE', { less, label: propOr(t('VALIDATION.FIELD'), path, pathLabels) }),
      integer: t('VALIDATION.INTEGER'),
    },
    date: {
      min: ({ min, path }: { path: string; min: Date }) =>
        t('VALIDATION.DATE_MIN', {
          min: new Date(min).toLocaleDateString(),
          label: propOr(t('VALIDATION.FIELD'), path, pathLabels),
        }),
      max: ({ max, path }: { path: string; max: Date }) =>
        t('VALIDATION.DATE_MAX', {
          max: new Date(max).toLocaleDateString(),
          label: propOr(t('VALIDATION.FIELD'), path, pathLabels),
        }),
    },
    boolean: {},
    object: {
      noUnknown: t('VALIDATION.NO_UNKNOWN'),
    },
    array: {
      min: ({ min, path }: { path: string; min: number }) =>
        t('VALIDATION.ARRAY_MIN', { min, label: propOr(t('VALIDATION.FIELD'), path, pathLabels) }),
      max: ({ max, path }: { path: string; max: number }) =>
        t('VALIDATION.ARRAY_MAX', { max, label: propOr(t('VALIDATION.FIELD'), path, pathLabels) }),
    },
  });

export const createValidationSchema = <T>(fields: Array<Field<T>>): AnySchema => {
  if (all((f: Field<T>) => !prop('validation', f))(fields)) {
    return validation.mixed();
  }

  const structure = fields.reduce((acc, field) => {
    if (!field.validation) return acc;
    return assocPath(field.path.split('.'), () => eval(`${field.validation}`), acc);
  }, {});

  const createObjectShape = (structure: any): any => {
    if (is(Function, structure)) return structure();
    return validation.object().shape(map(createObjectShape, structure) as any);
  };

  return createObjectShape(structure);
};

export { validation };
