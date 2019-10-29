# React AutoForm

_A Simple React component for simple creation of forms to edit any object, that can e.g. serve as the C+U in your CRUD._

## Description

React AutoForm is a utility to make editing JavaScript objects as easy as can possibly be, while staying as
unopinionated as possible, meaning that is completely up to you to decide the styling and the even the input
components that will be used in the form. The autoform then handles changing of the values and delivering the modified
object back to you. Well, enough chitchat, let's see how to use it...

## Getting started
Although you are more than welcome (and encouraged, in fact) to provide your own components, AutoForm comes with three
input types you can use out-of-the-box to get you started. Those are:

* `SupportedInputs.Text` (this is the default type)
* `SupportedInputs.Number`
* `SupportedInputs.Select`

Now, let's say you have an object like this:
```
const CUP = {
    contains: 'coffee', 
    volume: {
        value: 150,
        unit: 'ml'
    },  
};
```
To edit this fella, you simply use the AutoForm ans useState hook (in your Functional Component) as follows:
```
const [editedCup, editCup] = useState(CUP);

...

<Autoform 
    o={editedCup}
    updateFn={editCup} 
    fields={[
        { label: 'What is in the cup?', path: 'contains', type: SupportedInputs.Number },
        { label: 'Volume', path: 'volume.value', type: SupportedInputs.Number },
        {
            label: 'Unit',
            path: 'volume.unit',
            type: SupportedInputs.Select,
            inputProps: {
                options: ['ml', 'oz'],
                optionLabelSelector: option => option === 'ml' ? 'Millilitres' : 'Ounces'
            }
        },
    ]}
/>
```

And voilà, you got yourself a form. Easy, wasn't it?

## Custom components

_Coming soon..._