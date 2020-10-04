import React from 'react';
import { ComponentsDictionary } from '../types';

export const DEFAULT_INPUT_COMPONENTS = {
  text: ({ label, onChange, value, ...rest }) => (
    <label
      key={`autoform-label-${label}`}
      className={`autoform autoform-label autoform-label-${label}`}
    >
      {label}
      <input
        className={`autoform autoform-input autoform-text-input autoform-text-input-${label}`}
        type={'text'}
        onChange={({ target: { value } }: any) => onChange(value)}
        {...rest}
      />
    </label>
  ),
  number: ({ label, onChange, value, ...rest }) => (
    <label
      key={`autoform-label-${label}`}
      className={`autoform autoform-label autoform-label-${label}`}
    >
      {label}
      <input
        className={`autoform autoform-input autoform-number-input autoform-number-input-${label}`}
        type={'number'}
        onChange={({ target: { value } }: any) => onChange(value)}
        {...rest}
      />
    </label>
  ),
  select: ({ label, onChange, value, options, optionLabelSelector, ...rest }) => (
    <label
      key={`autoform-label-${label}`}
      className={`autoform autoform-label autoform-label-${label}`}
    >
      {label}
      <select value={value} onChange={({ target: { value } }: any) => onChange(value)}>
        {options.map((o: any) => (
          <option key={`option-${optionLabelSelector(o)}`} value={o}>
            {optionLabelSelector(o)}
          </option>
        ))}
      </select>
    </label>
  ),
} as ComponentsDictionary<any>;


export let InputComponents = DEFAULT_INPUT_COMPONENTS;
export const customizeInputComponents = <T, >(components: ComponentsDictionary<T>) => {
  InputComponents = { ...DEFAULT_INPUT_COMPONENTS, ...components };
};