# React JSON Schema Form Editor

[![npm](https://img.shields.io/npm/v/@ginkgo-bioworks/react-json-schema-form-builder)](https://www.npmjs.com/package/@ginkgo-bioworks/react-json-schema-form-builder)
[![CI](https://github.com/ginkgobioworks/react-json-schema-form-builder/workflows/CI/badge.svg?branch=main)](https://github.com/ginkgobioworks/react-json-schema-form-builder/actions)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![GitHub issues](https://img.shields.io/github/issues-raw/ginkgobioworks/react-json-schema-form-builder)](https://github.com/ginkgobioworks/react-json-schema-form-builder/issues)


![demo](https://react-json-schema-form-builder.readthedocs.io/en/latest/img/visualDemo.gif)

This repository contains code for a React JS Component called the `FormBuilder` that allows the user to visually configure a [JSON Schema encoded form](https://json-schema.org/) by dragging, dropping, and editing card elements. An example use case for this tool could be for building an app that allows users to create and distribute their own surveys. The React JSON Schema Form Builder provides components to allow users to dynamically build such survey forms. The Form Builder is also customizable, and can incorporate novel form elements (like a special email address or file upload input), specified by the developer building the survey creation app.

This component is wrapped around a demo app that demonstrates how the tool can be used in conjunction with a code editor and [Mozilla's React JSON schema form viewer](https://github.com/rjsf-team/react-jsonschema-form) to build a form and maintain a live, code representation of it in real time.

The Form Builder is available as an NPM package [here](https://www.npmjs.com/package/@ginkgo-bioworks/react-json-schema-form-builder).

View the Form Builder in action [here](https://ginkgobioworks.github.io/react-json-schema-form-builder/)

More extensive documentation is available [here](https://react-json-schema-form-builder.readthedocs.io/en/main/)

## Versions (this fork)

This fork renders with Material-UI instead of Bootstrap/reactstrap, so its major version tracks the
MUI line it peer-depends on:

| Version | Peer UI library                              | React        |
| ------- | -------------------------------------------- | ------------ |
| 4.x     | `@mui/material` 7.x + `@mui/icons-material`  | 17.x or 18.x |
| 3.x     | `@mui/material` 5.x + `@mui/icons-material`  | 17.x or 18.x |
| 2.x     | `@material-ui/core` 4.x (+ `lab`, `icons`)   | 16.x or 17.x |

3.x and 4.x are UI-library swaps only: no component, prop, or context name changed. `@mui/material`
v5+ needs `@emotion/react` and `@emotion/styled` installed alongside it (the library itself imports
neither directly, and adds no JSS).

4.x publishes both a CommonJS build (`lib/`) and an ES-module build (`lib-esm/`), selected through
the package's `exports` map. MUI v7 ships its own CJS and ESM builds behind an `exports` map, so a
CommonJS-only package would make a bundler load a *second* copy of MUI — one for the app's `import`
and one for this library's `require` — leaving the form builder outside the app's `ThemeProvider`.
Deep imports (`react-json-schema-form-builder/lib/formBuilder/types`) keep working and keep
resolving their types from `lib/`.

`lib-esm/` is written for bundlers but is well-formed ES: `scripts/finalizeEsmBuild.cjs` gives its
relative specifiers real `.js` paths and marks the directory `"type": "module"`. Loading the whole
stack through Node's own ESM loader still fails on React 17, which predates `exports` and so cannot
resolve the `react/jsx-runtime` that MUI v7's ESM build imports -- a plain
`import '@mui/material/Tooltip'` fails identically.

## Quickstart

```bash
npm i --save @ginkgo-bioworks/react-json-schema-form-builder
```

Import the tool as a react component in your Node project:

## Usage

```javascript
import React, { Component } from 'react';
 
import {FormBuilder} from '@ginkgo-bioworks/react-json-schema-form-builder';
 
class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schema: '',
      uischema: ''
    };
  }
  render() {
    return (
      <FormBuilder
        schema={this.state.schema}
        uischema={this.state.uischema}
        onChange={(newSchema: string, newUiSchema: string) => {
          this.setState({
            schema: newSchema,
            uischema: newUiSchema
          })
        }}
      />
    );
  }
}
```

For more usage examples, see the [Usage documentation page](https://react-json-schema-form-builder.readthedocs.io/en/latest/Usage/)

## Contributing

See the [Contributing page](https://github.com/ginkgobioworks/react-json-schema-form-builder/blob/main/CONTRIBUTING.md) for information about improving the Form Builder.

## License

Copyright 2020 [Ginkgo Bioworks](https://www.ginkgobioworks.com/), Inc. Licensed Apache 2.0.

