import React from 'react';
import { assocPath, pathOr } from 'ramda';
import { AutoFormProps, FieldWithOptions, InputComponents, SupportedInputs } from './types';
import { DEFAULT_INPUT_COMPONENTS } from './InputComponents';

let InputComponents = DEFAULT_INPUT_COMPONENTS;

export const customizeInputComponents = <F, O>(components: InputComponents<F, O>) => {
  InputComponents = { ...DEFAULT_INPUT_COMPONENTS, ...components };
};

export const AutoForm = <T extends object>({ o, fields, updateFn }: AutoFormProps<T>) => (
  <>
    {fields.map(f => {
      const { type, path, label, condition = () => true, ...rest } = f;
      const options = (f as FieldWithOptions<T, any>).options || undefined;
      const InputComponent = (InputComponents as InputComponents<T, any>)[f.type || SupportedInputs.Text];
      return condition(o) ? (
        <label key={`auto-form-label-${path}`}>
          {label}
          {
            // @ts-ignore
            <InputComponent
              id={`auto-form-input-for-${path}`}
              value={pathOr('', path.split('.'), o)}
              onChange={(value: any) => updateFn(assocPath(path.split('.'), value, o))}
              {...rest}
              options={typeof options === 'function' ? options(o) : options}
            />
          }
        </label>
      ) : null;
    })}
  </>
);

export default { AutoForm, customizeInputComponents };
