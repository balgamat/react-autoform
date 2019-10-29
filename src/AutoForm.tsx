import React from 'react';
import { assocPath, pathOr } from 'ramda';
import { AutoFormProps, ComponentsDictionary, Field, SupportedInputs } from './types';
import { DEFAULT_INPUT_COMPONENTS } from './InputComponents';

let InputComponents = DEFAULT_INPUT_COMPONENTS;

export const customizeInputComponents = <C extends string, F>(components: Record<C, F>) => {
  InputComponents = { ...DEFAULT_INPUT_COMPONENTS, ...components };
};

export const AutoForm = <T extends object, F, O, C extends string = SupportedInputs>({
  o,
  fields,
  updateFn,
  components,
  formProps,
}: AutoFormProps<T, F, O, C>) => (
  <div {...formProps}>
    {fields.map(f => {
      const { type, path, condition = () => true, inputProps = {}, ...rest } = f;
      const options = pathOr(undefined, ['inputProps', 'options'], f as Field<T, F, C, O>);
      const InputComponent = ({ ...InputComponents, ...components } as ComponentsDictionary<SupportedInputs | C, F>)[
        f.type || SupportedInputs.Text
      ];
      return condition(o) ? (
        //@ts-ignore
        <InputComponent
          key={`auto-form-field-${path}`}
          value={pathOr('', path.split('.'), o)}
          onChange={(value: any) => updateFn(assocPath(path.split('.'), value, o))}
          {...rest}
          inputProps={{ ...inputProps, options: typeof options === 'function' ? (options as Function)(o) : options }}
        />
      ) : null;
    })}
  </div>
);

export default { AutoForm, customizeInputComponents };
