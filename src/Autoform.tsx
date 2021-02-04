import React, { FC, useEffect, useState } from 'react';
import { assocPath, find, pathOr, propEq } from 'ramda';
import { InputComponents } from './InputComponents';
import { AutoformProps, BasicInput, InputComponentProps, ValidationResult } from '../types';
import { prepareComputedProps } from './prepareComputedProps';
import { createValidationSchema } from './validation';
import { ValidationError } from 'joi';
import uuid from 'uuid';

export const AutoformTranslation = React.createContext((key: string, options: any) => key);

export const Autoform = <T,>({
  o,
  fields,
  updateFn,
  components,
  handleValidationResult,
  translationFunction,
  style,
}: AutoformProps<T>) => {
  const [validationResult, setValidationResult] = useState<ValidationResult>({
    valid: true,
  });

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

  return (
    <AutoformTranslation.Provider value={translationFunction}>
      <div className={`autoform`} style={style}>
        {fields.map((f) => {
          const { type, path, condition = () => true, ...rest } = f;

          const errorDetails = find(
            propEq('path', f.path.split('.')),
            validationResult.error?.details || [],
          );
          const error = errorDetails
            ? translationFunction(`VALIDATION.${errorDetails.type.toUpperCase()}`, {
                ...errorDetails.context,
                label: f.label,
                ref: errorDetails.context?.ref
                  ? find(propEq('path', f.path.split('.')), errorDetails.context.ref).label
                  : undefined,
              })
            : undefined;

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
                key: uuid.v4(),
                value,
                onChange: (value: any) =>
                  updateFn(assocPath(path === '.' ? [] : path.split('.'), value, o)),
                error,
                ...inputProps,
              })
            : null;
        })}
      </div>
    </AutoformTranslation.Provider>
  );
};
