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
  select: ({ label, onChange, value, options, labelExtractor, keyExtractor, ...rest }) => (
    <label
      key={`autoform-label-${label}`}
      className={`autoform autoform-label autoform-label-${label}`}
    >
      {label}
      <select value={value} onChange={({ target: { value } }: any) => onChange(value)}>
        {options.map((o: any) => (
          <option key={`option-${labelExtractor(o)}`} value={o}>
            {labelExtractor(o)}
          </option>
        ))}
      </select>
    </label>
  ),
  Component: ({ Component }) => {
    if (!Component)
      throw new Error(
        'Found a `component` type Autoform element without a `Component` as its prop.',
      );

    return Component;
  },
} as ComponentsDictionary;

export let InputComponents = DEFAULT_INPUT_COMPONENTS;
export const customizeInputComponents = <T,>(components: ComponentsDictionary) => {
  InputComponents = { ...components, ...DEFAULT_INPUT_COMPONENTS };
};
