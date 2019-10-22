import * as React from 'react';

export type Option<F> = F;

export interface InputComponentProps<F> {
  value: F;
  onChange(value: F): void;
  inputProps?: object;
}

export type SelectionInputComponentProps<F, O> = InputComponentProps<F> & { options: Option<O>[] } & Pick<
    FieldWithOptions<F, O>,
    'optionLabelSelector' | 'optionEqWhen'
  >;

export enum SupportedInputs {
  Text = 'text',
  Number = 'number',
  SelectOne = 'selectOne',
  SelectMultiple = 'selectMultiple',
}

export type InputComponents<F, O> = Partial<
  { [T in SupportedInputs]: (props: InputComponentProps<F> | SelectionInputComponentProps<F, O>) => React.ReactNode }
> &
  Partial<{
    Text: (props: InputComponentProps<F>) => React.ReactNode;
    Number: (props: InputComponentProps<F>) => React.ReactNode;
    SelectOne: (props: SelectionInputComponentProps<F, O>) => React.ReactNode;
    SelectMultiple: (props: SelectionInputComponentProps<F, O>) => React.ReactNode;
  }>;

export interface Field<T> {
  path: string;
  label: string;
  condition?: (o: T) => boolean;
  type?: SupportedInputs;
  inputProps?: object;
}

export interface FieldWithOptions<T, O> extends Field<T> {
  type: SupportedInputs.SelectOne | SupportedInputs.SelectMultiple;
  options: ((o: T) => Option<O>[]) | Option<O>[];
  optionLabelSelector: (option: O) => NonNullable<React.ReactNode>;
  optionEqWhen: (a: T[keyof T], b: T[keyof T]) => boolean;
}

export interface AutoFormProps<T extends object, O = any> {
  o: T;
  fields: Array<Field<T> | FieldWithOptions<T, O>>;
  updateFn(o: T): void;
  components?: InputComponents<T, O>;
}
