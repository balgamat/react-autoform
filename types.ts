import { ReactElement } from 'react';

type K1<T> = T[keyof T];
type K2<T> = K1<T>[keyof K1<T>]
type K3<T> = K2<T>[keyof K2<T>]
type K4<T> = K3<T>[keyof K3<T>]
type K5<T> = K4<T>[keyof K4<T>]
type K6<T> = K5<T>[keyof K5<T>]

export type DeepNestedValueT<T> = K1<T> | K2<T> | K3<T> | K4<T> | K5<T> | K6<T>;

export interface InputComponentProps<T, V = DeepNestedValueT<T>> {
  label: string;
  value: V;
  onChange(value: V): void;
  [additionalProp: string]: any
}

export enum SupportedInputs {
  Text = 'text',
  Number = 'number',
  Select = 'select',
}

export interface Field<T> {
  path: string;
  label: string;
  condition?: (o: T) => boolean;
  type?: string;
  inputProps?: object;
}

export type ComponentsDictionary<T> = Record<string, (props: InputComponentProps<T>) => ReactElement>;

export type AutoFormProps<T> = {
  o: T;
  fields: Array<Field<T>>;
  updateFn(o: T): void;
  components?: ComponentsDictionary<T>;
  [additionalProp: string]: any
};
