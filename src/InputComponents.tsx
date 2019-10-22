import React from 'react';
import { InputComponentProps, InputComponents, SelectionInputComponentProps } from './types';

export const DEFAULT_INPUT_COMPONENTS = {
  text: <P extends InputComponentProps<string>>(props: P) => (
    <input
      type={'text'}
      {...props}
      onChange={({ target: { value } }: any) => props.onChange(value)}
      {...props.inputProps}
    />
  ),
  number: <P extends InputComponentProps<number>>(props: P) => (
    <input
      type={'number'}
      {...props}
      onChange={({ target: { value } }: any) => props.onChange(value)}
      {...props.inputProps}
    />
  ),
  selectOne: <P extends SelectionInputComponentProps<any, any>>(props: P) => (
    <select value={props.value} onChange={({ target: { value } }: any) => props.onChange(value)}>
      {props.options.map(o => (
        <option key={`option-${props.optionLabelSelector(o)}`} value={o}>
          {props.optionLabelSelector(o)}
        </option>
      ))}
    </select>
  ),
} as InputComponents<any, any>;
