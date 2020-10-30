import React, { FC, useEffect, useState } from 'react';
import { assoc, assocPath, find, pathOr, propEq } from 'ramda';
import { InputComponents } from './InputComponents';
import { AutoformProps, InputComponentProps, BasicInput, ValidationResult } from '../types';
import { prepareComputedProps } from './prepareComputedProps';
import { createValidationSchema, defineLocale } from './validation';
import { ValidationError } from 'yup';
import { useTranslation } from 'react-i18next';

export const Autoform = <T,>({
  o,
  fields,
  updateFn,
  components,
  handleValidationResult,
  ...rest
}: AutoformProps<T>) => {
  const { t } = useTranslation('autoform');
  const [validationResult, setValidationResult] = useState<ValidationResult>({
    valid: true,
  });

  defineLocale(
    t,
    fields.reduce((acc, val) => assoc(val.path, val.label, acc), {}),
  );

  const schema = createValidationSchema(fields);

  useEffect(() => {
    schema
      .validateAsync(o, { abortEarly: false })
      .then(() => {
        setValidationResult({ valid: true });
        handleValidationResult && handleValidationResult({ valid: true });
      })
      .catch((error: ValidationError) => {
        setValidationResult({ valid: false, error });
        handleValidationResult && handleValidationResult({ valid: false, error });
      });
  }, [o]);

  console.log(validationResult);

  return (
    <div className={`autoform`} {...rest}>
      {fields.map((f) => {
        const { type, path, condition = () => true, ...rest } = f;

        const errorDetails = find(
          propEq('path', f.path.split('.')),
          validationResult.error?.details || [],
        );
        const error = errorDetails ? errorDetails.message : undefined;

        if (type === BasicInput.Hidden) return null;

        const InputComponent: FC<InputComponentProps<T>> | undefined = pathOr(
          undefined,
          [f.type || BasicInput.Text],
          {
            ...InputComponents,
            ...components,
          },
        );

        if (!InputComponent)
          throw new Error(
            `Autoform has encountered an invalid input type: ${f.type}.\n
            Available types are: ${Object.keys(InputComponents)}`,
          );

        const value = pathOr(undefined, path === '.' ? [] : path.split('.'), o);
        const inputProps = prepareComputedProps(o, rest);

        return condition(o)
          ? React.createElement(InputComponent, {
              key: `autoform-field-${path}`,
              value,
              onChange: (value: any) =>
                updateFn(assocPath(path === '.' ? [] : path.split('.'), value, o)),
              error,
              ...inputProps,
            })
          : null;
      })}
    </div>
  );
};
