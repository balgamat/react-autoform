import * as React from 'react';
import { ReactElement } from 'react';

export type Option<F> = F;

export interface InputComponentProps<F, O = undefined> {
  label: string;
  value: F;
  onChange(value: F): void;
  inputProps: O extends NonNullable<any> ? WithOptionsInputProps<F, O, true> & object : object;
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
}

export type ComponentsDictionary<C extends string, F> = Record<C, (props: InputComponentProps<F>) => ReactElement>;

export type AutoFormProps<T extends object, F, O, C extends string = SupportedInputs> = {
  o: T;
  fields: Array<Field<T, F, C, O>>;
  updateFn(o: T): void;
  components?: ComponentsDictionary<C, F>;
} & object;
