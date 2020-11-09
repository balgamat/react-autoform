import { FC, ReactElement } from 'react';
import { Schema, ValidationError } from 'joi';

type K1<T> = T[keyof T];
type K2<T> = K1<T>[keyof K1<T>];
type K3<T> = K2<T>[keyof K2<T>];
type K4<T> = K3<T>[keyof K3<T>];
type K5<T> = K4<T>[keyof K4<T>];
type K6<T> = K5<T>[keyof K5<T>];

export type DeepNestedValueT<T> = K1<T> | K2<T> | K3<T> | K4<T> | K5<T> | K6<T> | T;

export interface InputComponentProps<V = any> {
  label: string;
  value: V;
  error?: string;
  customError?: string;
  onChange(value: V): void;

  [additionalProp: string]: any;
}

export enum BasicInput {
  Component = 'Component',
  Hidden = 'hidden',
  Number = 'number',
  Select = 'select',
  Text = 'text',
}

export interface Field<T> {
  path: string;
  label: string;
  condition?: (o: T) => boolean;
  type?: string;
  validation?: string | object;
  [additionalProp: string]: any;
}

export type InputComponent<T> = FC<InputComponentProps<T>>;

export type ComponentsDictionaryGeneric<K extends InputComponentProps> = Record<string, FC<K>>;

export type ComponentsDictionary = ComponentsDictionaryGeneric<InputComponentProps>;

export type AutoformProps<T> = {
  o: T;
  fields: Array<Field<T>>;
  updateFn(o: T): void;
  components?: ComponentsDictionary;
  handleValidationResult?(result: ValidationResult): void;
  [additionalProp: string]: any;
};

export interface ValidationResult {
  valid: boolean;
  error?: ValidationError;
}

export type AutoformHookParams<T> = {
  onObject?: T;
  withFields: Array<Field<T>>;
  andOptions?: {
    components?: ComponentsDictionary;
    handleValidationResult?(result: ValidationResult): void;
    translationFunction?(...args: any[]): string;
    [additionalProp: string]: any;
  };
};

export type AutoformHookReturnValue<T> = [T, ReactElement, ValidationResult];

export interface AutoformHook<T> {
  (params: AutoformHookParams<T>): AutoformHookReturnValue<T>;
}
