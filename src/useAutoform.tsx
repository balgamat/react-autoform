import { AutoformHookParams } from '../types';
import React, { ReactElement, useEffect, useState } from 'react';
import { Autoform } from './Autoform';
import { ValidationResult } from '../types';

export const useAutoform = <T,>({
  onObject = {} as T,
  withFields,
  andOptions = {},
}: AutoformHookParams<T>): [T, ReactElement, ValidationResult] => {
  const [o, updateFn] = useState(onObject);

  const [validationResult, setValidationResult] = useState<ValidationResult>({
    valid: true,
  });

  useEffect(() => {
    updateFn(onObject);
  }, [onObject]);

  return [
    o,
    <Autoform
      {...{
        o,
        updateFn,
        fields: withFields,
        ...andOptions,
        handleValidationResult: (res) => {
          setValidationResult(res);
          andOptions?.handleValidationResult && andOptions?.handleValidationResult(res);
        },
      }}
    />,
    validationResult,
  ];
};
