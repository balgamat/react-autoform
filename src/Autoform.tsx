import React, { FC, useEffect, useState } from 'react';
import { assoc, assocPath, find, pathOr, propEq } from 'ramda';
import { InputComponents } from './InputComponents';
import { AutoformProps, BasicInput, InputComponentProps, ValidationResult } from '../types';
import { prepareComputedProps } from './prepareComputedProps';
import { createValidationSchema, defineLocale } from './validation';
import { ValidationError } from 'joi';
import * as uuid from 'uuid';

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

  useEffect(() => {
    defineLocale(translationFunction, fields.reduce((acc,f) => assoc(f.path, f.label, acc),{}))
  }, [translationFunction()])

  const schema = createValidationSchema(fields);

  useEffect(() => {
    updateFn(schema.cast(o));
  }, []);

  useEffect(() => {
    schema
      .validate(o)
      .then(() => {
        setValidationResult({ valid: true });
        handleValidationResult && handleValidationResult({ valid: true });
      }).catch((error: ValidationError) => {
        setValidationResult({ valid: false, error });

        handleValidationResult && handleValidationResult({ valid: false, error });
      }
    )
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
          const error = errorDetails ? errorDetails.message : f.customError;

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
