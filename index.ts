import { Autoform, AutoformTranslation } from './src/Autoform';
import {
  ComponentsDictionary,
  AutoformProps,
  Field,
  BasicInput,
  InputComponentProps,
  ValidationResult,
  AutoformHookParams,
  AutoformHookReturnValue,
  AutoformHook,
} from './types';
import { customizeInputComponents } from './src/InputComponents';
import { validation } from './src/validation';
import { useAutoform } from './src/useAutoform';
import * as locales from './src/locales';

export {
  Autoform,
  AutoformHook,
  AutoformHookParams,
  AutoformHookReturnValue,
  AutoformProps,
  AutoformTranslation,
  BasicInput,
  ComponentsDictionary,
  customizeInputComponents,
  Field,
  InputComponentProps,
  useAutoform,
  validation,
  locales,
  ValidationResult,
};
