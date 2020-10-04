import { ComponentsDictionary, Field, SupportedInputs, ValidationResult } from '../types';
import React, { FC, useEffect, useState } from 'react';
import { Autoform } from './Autoform';
import { createValidationSchema, validation } from './validation';

export const useAutoform = <T,>(
  onObject: T,
  withFields: Array<Field<T>>,
  andOptions: { components?: ComponentsDictionary<T>; [additionalProp: string]: any } = {},
): [T, FC, ValidationResult] => {
  const [o, updateFn] = useState(onObject);
  const [validationResult, setValidationResult] = useState<ValidationResult>({
    valid: true,
  });

  const schema = createValidationSchema(withFields);

  useEffect(() => {
    schema
      .validate(o)
      .then(() => setValidationResult({ valid: true }))
      .catch(error => setValidationResult({ valid: false, error }));
  }, [o]);

  const Component: FC = () => <Autoform {...{ o, updateFn, fields: withFields, ...andOptions }} />;

  return [o, Component, validationResult];
};
