import React from 'react';
import { ComponentsDictionary, InputComponentProps, SupportedInputs } from './types';

export const DEFAULT_INPUT_COMPONENTS = {
  text: <P extends InputComponentProps<string>>(props: P) => (
    <label key={`auto-form-label-${props.label}`}>
      {props.label}
      <input
        type={'text'}
        {...props}
        onChange={({ target: { value } }: any) => props.onChange(value)}
        {...props.inputProps}
      />
    </label>
  ),
  number: <P extends InputComponentProps<number>>(props: P) => (
    <label key={`auto-form-label-${props.label}`}>
      {props.label}
      <input
        type={'number'}
        {...props}
        onChange={({ target: { value } }: any) => props.onChange(value)}
        {...props.inputProps}
      />
    </label>
  ),
  select: <P extends InputComponentProps<NonNullable<any>, NonNullable<any>>>(props: P) => (
    <label key={`auto-form-label-${props.label}`}>
      {props.label}
      <select value={props.value} onChange={({ target: { value } }: any) => props.onChange(value)}>
        {props.inputProps.options.map(o => (
          <option key={`option-${props.inputProps.optionLabelSelector(o)}`} value={o}>
            {props.inputProps.optionLabelSelector(o)}
          </option>
        ))}
      </select>
    </label>
  ),
} as ComponentsDictionary<SupportedInputs, string | number | NonNullable<any>>;
