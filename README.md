# evrythng-cli-plugin-smartlabel

Plugin for the [EVRYTHNG CLI](https://github.com/evrythng/evrythng-cli) 
that creates EVRYTHNG products compatible with smartlabel.evrythng.io, enabling
the dynamic loading of product data into a single SmartLabel template.


## Usage

Simply install alongside the CLI to make the `smartlabel` command available to 
use. Typically this is a global installation:

```
$ npm i -g evrythng-cli-plugin-smartlabel
```

Use the `smartlabel create` command to submit a pre-prepared JSON object. This
will be validated before being sent to the API:

```
$ evrythng smartlabel create $payload --project <project ID>
```

Alternatively, use the `smartlabel build` command to interactively build the 
product, field by field:

```
$ evrythng smartlabel build --project <project ID>
```


## Unit Tests

Run unit tests in the `tests` directory with `npm test`.
