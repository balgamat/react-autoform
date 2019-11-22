import * as React from 'react';
import { ReactElement } from 'react';

export type Option<F> = F;

export interface InputComponentProps<T, F, O = undefined> {
  label: string;
  value: F;
  onChange(value: F): void;
  inputProps: O extends NonNullable<any> ? WithOptionsInputProps<T, O, true> : object;
}

export enum SupportedInputs {
  Text = 'text',
  Number = 'number',
  Select = 'select',
}

export interface Field<T, F, C, O> {
  path: string;
  label: string;
  condition?: (o: T) => boolean;
  type?: SupportedInputs | C;
  inputProps?: InputComponentProps<F, O>['inputProps'];
}

export interface WithOptionsInputProps<T, O, optionsUnwrapped = false> {
  options: optionsUnwrapped extends false ? ((o: T) => Option<O>[]) : Option<O>[];
  optionLabelSelector: (option: O) => NonNullable<React.ReactNode>;
  optionIdentifierSelector: (option: O) => any;
  [additionalKey: string]: any;
}

export type ComponentsDictionary<T, C extends string, F> = Record<C, (props: InputComponentProps<T, F>) => ReactElement>;

export type AutoFormProps<T extends object = any, F = any, O = any, C extends string = SupportedInputs> = {
  o: T;
  fields: Array<Field<T, F, C, O>>;
  updateFn(o: T): void;
  components?: ComponentsDictionary<T, C, F>;
  [additionalKey: string]: any
};
