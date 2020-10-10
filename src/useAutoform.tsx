import { ComponentsDictionary, Field, ValidationResult } from '../types';
import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Autoform } from './Autoform';
import { createValidationSchema, validation } from './validation';
import { ValidationError } from 'yup';

export const useAutoform = <T,>(
  onObject: T,
  withFields: Array<Field<T>>,
  andOptions: { components?: ComponentsDictionary; [additionalProp: string]: any } = {},
): [T, ReactElement, ValidationResult] => {
  const [o, updateFn] = useState(onObject);
  const [validationResult, setValidationResult] = useState<ValidationResult>({
    valid: true,
  });

  const schema = createValidationSchema(withFields);

  useEffect(() => {
    schema
      .validate(o)
      .then(() => setValidationResult({ valid: true }))
      .catch((error: ValidationError) => setValidationResult({ valid: false, error }));
  }, [o]);
  return [
    o,
    <Autoform {...{ o, updateFn, fields: withFields, ...andOptions }} />,
    validationResult,
  ];
};
