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
- **[Blueprint](https://www.npmjs.com/package/@balgamat/react-autoform-blueprint)** `@balgamat/react-autoform-blueprint`
- **Material UI** _coming soon_

want _SemanticUI, Grommet, Bootstrap_ or something completely different? File an issue or open a PR - collaborators are more than welcome :)

## Getting started

Although you are more than welcome (and encouraged, in fact) to provide your own components, Autoform comes with five
input types you can use out-of-the-box to get you started. Those are:

- `BasicInput.Text` (this is the default type)
- `BasicInput.Number`
- `BasicInput.Select`
- `BasicInput.Hidden` (do not show this field in the form)
- `BasicInput.Component` (special type to inject any Component you'd like between the fields - e.g. a heading or a separator)

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

```typescript jsx
import { useAutoform, validation, BasicInputs } from '@balgamat/react-autoform';

const fields = [
  {
    label: 'What is in the cup?',
    path: 'contains',
    validation: 'string:required',
  },
  {
    label: 'Volume',
    path: 'volume.value',
    type: BasicInputs.Number,
    validation: 'number:max=1000,required',
  },
  {
    label: 'Unit',
    path: 'volume.unit',
    type: BasicInputs.Select,
    options: [{ data: 'ml', label: 'Millilitres' }, { data: 'oz', label: 'Ounces' }],
    validation: 'string:min=1,max=10,required',
  },
];

const [editedCup, form, validationResult] = useAutoform({ onObject: CUP, withFields: fields });
...
// Now, you can place the component wherever you see fit:
<div>{form}</div>
```

And voilà, you got yourself a form. Easy, wasn't it?

P.S.: Take a note of the `validation` property. Looks familiar? That's because it is in fact [Joi](https://joi.dev/), reexported here as `validation` for your convenience, but using a little quicker syntax here.

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

## Localization
Provide a translate function to `andOptions` property of the `useAutoform` hook and define translation file with these strings (there are also translations for Blueprint UI)

```json
{
  "BLUEPRINT": {
    "SELECT": "Vyberte ...",
    "NOTHING_FOUND": "Nic nenalezeno.",
    "SEARCH": "Vyhledat...",
    "BROWSE": " ... ",
    "CHOOSE_IMAGE": "Vyberte obrázek...",
    "CHOOSE_FILE": "Vyberte soubor..."
  },
  "VALIDATION": {
    "ALTERNATIVES": {
      "ALL": "Hodnota neopovídá ani jedné z povolených možností",
      "ANY": "Žádná z povolených možností nevyhovuje zadané hodnotě",
      "MATCH": "Neplatná hodnota",
      "ONE": "Zadaná hodnota odpovídá více než jedné z povolených možností",
      "TYPES": "Neplatný typ hodnoty"
    },
    "ANY": {
      "CUSTOM": "Chyba: {{error}}",
      "DEFAULT": "{{error}}",
      "FAILOVER": "{{error}}",
      "INVALID": "Toto je nepovolená hodnota",
      "ONLY": "Toto není povolená hodnota",
      "REF": "Nedpovídá poli {{ref}}",
      "REQUIRED": "Toto pole je povinné",
      "UNKNOWN": "Pole obsahuje hodnotu, ačkoliv žádná nebyla očekávána"
    },
    "ARRAY": {
      "BASE": "Toto není seznam",
      "EXCLUDES": "Na pozici {{pos}} je položka, která není v tomto seznamu povolena",
      "INLCUDESREQUIREDBOTH": "Očekávané hodnoty chybí: {{knownMisses}} ... a {{unknownMisses}} další",
      "INCLUDESREQUIREDKNOWNS":"Očekávané hodnoty chybí: {{knownMisses}}",
      "INCLUDESREQUIREDUNKNOWNS":"Chybí {{unknownMisses}} očekávaných hodnot",
      "LENGTH": "Musí být specifikováno přesně {{limit}} položek",
      "MIN": "Musí být specifikováno minimálně {{limit}} položek",
      "MAX": "Může být specifikováno maximálně {{limit}} položek",
      "INCLUDES": "Nepovolená hodnota",
      "ORDEREDLENGTH": "Musí být specifikováno přesně {{limit}} položek",
      "SORT": "Seznam je nesprávně seřazen",
      "SPARSE": "Seznam obsahuje nedefinovanou položku",
      "UNIQUE": "Seznam obsahuje dupolicitní položky"
    },
    "BINARY": {
      "BASE": "{{label}} není buffer"
    },
    "BOOLEAN": {
      "BASE": "Toto není logická hodnota"
    },
    "DATE": {
      "BASE": "Toto není datum",
      "FORMAT": "Datum je v nesprávném formátu",
      "GREATER": "Datum nemůže být po {{limit}}",
      "LESS": "Datum nemůže být před {{limit}}",
      "MAX": "Datum může být nejpozdějí {{limit}}",
      "MIN": "Datum může být nejdříve {{limit}}",
      "STRICT": "Převod na datum není povolen"
    },
    "FUNCTION": {
      "ARITY": "{{label}} musí mít přesně {{n}} parametrů",
      "CLASS": "{{label}} není třída",
      "MAXARITY": "{{label}} může mít nejvýše {{n}} parametrů",
      "MINARITY": "{{label}} musí mít nejméně {{n}} parametrů"
    },
    "NUMBER": {
      "BASE": "Hodnota není číslo",
      "GREATER": "{{label}} musí být větší než {{limit}}",
      "INFINITY": "{{label}} je nekonečno",
      "INTEGER": "{{label}} musí být celé číslo",
      "LESS": "{{label}} musí být menší než {{limit}}",
      "MAX": "{{label}} může být maximálně {{limit}}",
      "MIN": "{{label}} musí být minimálně {{limit}}",
      "MULTIPLE": "Hodnota musí být násobkem čísla {{multiple}}",
      "NEGATIVE": "{{label}} musí být záporné číslo",
      "PORT": "Tohle nevypadá jako číslo portu",
      "POSITIVE": "{{label}} musí být kladné číslo",
      "PRECISION": "Očekávám hodnotu s přesností na {{limit}} desetinných míst",
      "UNSAFE": "Hodnota je mimo zpracovatelný interval"
    },
    "OBJECT": {
      "UNKNOWN": "{{label}} obsahuje neočekávanou vlastnost: {{child}}",
      "AND": "Chybějící údaje",
      "ASSERT": "Neplatný formát",
      "BASE": "Neplatný typ",
      "LENGTH": "Počet údajů neodpovídá očekávání ({{limit}})",
      "MAX": "Tento objekt by měl obsahovat nejvýše {{limit}} vlastností",
      "MIN": "Tento objekt by měl obsahovat nejméně {{limit}} vlastností",
      "MISSING": "Chybějící údaje",
      "NAND": "Nevyhovující údaje",
      "XOR": "Nevyhovující údaje",
      "OXOR": "Nevyhovující údaje",
      "PATTERN": {
        "MATCH": "Názvy vlastností neodpovídají očekávanému formátu"
      },
      "REFTYPE": "{{label}} neníreference",
      "REGEX": "{{label}} není RegEx",
      "SCHEMA": "{{label}} není schéma",
      "INSTANCE": "Neplatný typ",
      "WITH": "Chybějící údaje",
      "WITHOUT": "Přebytečné údaje"
    },
    "STRING": {
      "ALPHANUM": "{{label}} může obsahovat pouze alfanumerické znaky",
      "BASE": "Hodnota musí být text",
      "BASE64": "Toto není řetězec ve formátu base64",
      "CREDITCARD": "Neplatné číslo kreditná karty",
      "DATAURI": "Neplatná adresa",
      "DOMAIN": "Neplatná doména",
      "EMPTY": "Toto pole nemůže zůstat prázdné",
      "GUID": "Neplatné GUID",
      "HEX": "Neplatný hexadecimální řetězec",
      "HEXALIGN": "Řetězec obsahuje hexadecimální znaky, ale jako celek je neplatný",
      "HOSTNAME": "Neplatný název hostitele",
      "IP": "Neplatná IP adresa",
      "IPVERSION": "Neplatná IP adresa",
      "ISODATE": "Neplatné datum",
      "ISODURATION": "Neplatná délka trvání",
      "LENGTH": "{{label}} musí mít přesně {{limit}} znaků",
      "LOWERCASE": "Povolena jsou pouze malá písmena",
      "MAX": "{{label}} může mít maximálně {{limit}} znaků",
      "MIN": "{{label}} musí mít minimálně {{limit}} znaků",
      "NORMALIZE": "Neplatný řetězec",
      "NOT_EMAIL": "Neplatná emailová adresa",
      "PATTERN": {
        "BASE": "Neodpovídá očekávanému formátu: {{pattern}}",
        "NAME": "Neodpovídá očekávanému formátu: {{name}}",
        "INVERT": {
          "BASE": "Pole je v nepovoleném formátu: {{pattern}}",
          "NAME": "Pole je v nepovoleném formátu: {{name}}"
        }
      },
      "TOKEN": "Toto není token",
      "TRIM": "Text začíná nebo končí prázdným znakem (např. mezerou)",
      "UPPERCASE": "Povolena jsou pouze velká písmena",
      "URI": "Neplatná adresa",
      "URICUSTOMSCHEME": "Neplatná adresa",
      "URIRELATIVEONLY": "Lokální adresa"
    },
    "SYMBOL": {
      "BASE": "Toto není symbol",
      "MAP": "Hodnota není symbolem ani nemůže být na symbol převedena"
    }
  }
}

```