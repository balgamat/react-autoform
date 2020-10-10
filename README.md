# React Autoform

_A React component for simple creation of forms to edit any object, that can e.g. serve as the C+U in your CRUD._

## Description

React Autoform is a utility to make editing JavaScript objects as easy as can possibly be, while staying as
unopinionated as possible, meaning that is completely up to you to decide the styling and the even the input
components that will be used in the form. The autoform then handles changing of the values and delivering the modified
object back to you. Well, enough chitchat, let's see how to use it...

## Installation

Install the base package with:

`yarn add @balgamat/react-autoform`

If you wish to use my component libraries, you can also install those, e.g.:

`yarn add @balgamat/react-autoform-fluent-ui`

and then, e.g. in app root:

```typescript
import { customizeInputComponents } from '@balgamat/react-autoform';
import { useFluentUIComponents } from '@balgamat/react-autoform-fluent-ui';

useFluentUIComponents(customizeInputComponents);
```

### Available UI kits

- **[Fluent UI](https://www.npmjs.com/package/@balgamat/react-autoform-fluent-ui)** `@balgamat/react-autoform-fluent-ui`
- **Blueprint** _in progress_
- **Material UI** _coming soon_

want _SemanticUI, Grommet, Bootstrap_ or something completely different? File an issue or open a PR - collaborators are more than welcome :)

## Getting started

Although you are more than welcome (and encouraged, in fact) to provide your own components, Autoform comes with three
input types you can use out-of-the-box to get you started. Those are:

- `SupportedInputs.Text` (this is the default type)
- `SupportedInputs.Number`
- `SupportedInputs.Select`
- `Component` (special type to inject any Component you'd like between the fields - e.g. a heading or a separator)

Now, let's say you have an object like this:

```typescript
const CUP = {
  contains: 'coffee',
  volume: {
    value: 150,
    unit: 'ml',
  },
};
```

To edit this fella, you simply use the `useAutoform()` hook as follows:

```typescript
import { useAutoform, validation } from 'react-autoform';

const fields = [
  {
    label: 'What is in the cup?',
    path: 'contains',
    validation: validation.string().required()
  },
  {
    label: 'Volume',
    path: 'volume.value',
    type: SupportedInputs.Number,
    validation: validation.number().max(1000),
  },
  {
    label: 'Unit',
    path: 'volume.unit',
    type: SupportedInputs.Select,
    options: [{ data: 'ml', label: 'Millilitres' }, { data: 'oz', label: 'Ounces' }],
    validation: validation.string().required(),
  },
];

const [editedCup, form, validationResult] = useAutoform(CUP, fields);
...
// Now, you can place the component wherever you see fit:
<div>{form}</div>
```

And voilà, you got yourself a form. Easy, wasn't it?

P.S.: Take a note of the `validation` property. Looks familiar? That's because it is in fact [Yup](https://github.com/jquense/yup), reexported here as `validation` for your convenience.

### Computed props

For any prop of the `Field` objects (except _type, path_ and _condition_, you can provide a function instead, that gets passed the full object being edited as its prop. For example, you are editing:

```typescript
const person = {
  name: 'John Doe',
  children: 0,
};
```

and you want the Select for selection of children to have the name of the person on it, so you define the fields as follows:

```typescript
const fields = [
  {
    label: 'Name',
    path: 'name',
  },
  {
    label: { $fn: (person) => `How many children does ${person.name} have?` },
    path: 'children',
    type: SupportedInputs.Number,
  },
];
```

## Custom components

_Coming soon..._
