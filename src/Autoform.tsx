import React, { FC } from 'react';
import { assocPath, pathOr } from 'ramda';
import { InputComponents } from './InputComponents';
import { AutoformProps, InputComponentProps, BasicInput } from '../types';
import { prepareComputedProps } from './prepareComputedProps';

export const Autoform = <T,>({ o, fields, updateFn, components, ...rest }: AutoformProps<T>) => (
  <div className={`autoform`} {...rest}>
    {fields.map((f) => {
      const { type, path, condition = () => true, ...rest } = f;

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
            ...inputProps,
          })
        : null;
    })}
  </div>
);
