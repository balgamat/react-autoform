import { AutoformHookParams, ValidationResult } from '../types';
import React, { ReactElement, useEffect, useState } from 'react';
import { Autoform } from './Autoform';
import { createValidationSchema } from './validation';
import { ValidationError } from 'yup';

export const useAutoform = <T,>({
  onObject = {} as T,
  withFields,
  andOptions = {},
}: AutoformHookParams<T>): [T, ReactElement, ValidationResult] => {
  const [o, updateFn] = useState(onObject);
  const [validationResult, setValidationResult] = useState<ValidationResult>({
    valid: true,
  });

  const schema = createValidationSchema(withFields);

  useEffect(() => {
    updateFn(schema.cast(onObject));
  }, []);

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
