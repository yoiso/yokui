---
title: Unit testing with Jasmine
---

If you used Create React App to start your project, you already have testing with Jest configured. If you would prefer to use Jasmine, follow the directions below:

Install [Gulp](https://gulpjs.com/) (make sure its version is ^4.0.0), which we will use to run testing tasks:

```bash
yarn add --dev gulp@next
```

Install [`pui-react-tools`](https://github.com/pivotal-cf/pui-react-tools), which provides helpful Gulp tasks for testing with Jasmine:

```bash
yarn add --dev pui-react-tools
```

Install [`jasmine_dom_matchers`](https://github.com/charleshansen/jasmine_dom_matchers), which provides helpful Jasmine matchers for making assertions against the rendered DOM:

```bash
yarn add --dev jasmine_dom_matchers
```

Install `babel-core`, `babel-loader`, `babel-preset-env`, `babel-preset-react`, and `babel-polyfill`:

```bash
yarn add --dev babel-core babel-loader babel-preset-env babel-preset-react babel-polyfill
```

Install Puppeteer, which is used by `pui-react-tools` to run tests in Chrome:

```bash
yarn add --dev puppeteer
```

Install jQuery, which is used by `jasmine_dom_matchers` to select DOM elements:

```bash
yarn add --dev jquery
```

Install [`react-spy-on-render`](https://www.npmjs.com/package/react-spy-on-render), which will let you spy on the `render` method of React components and assert that they are rendered with certain props:

```bash
yarn add --dev react-spy-on-render
```

Create a `.babelrc` file in your project root:

```json
{
  "presets": ["env", "react"]
}
```

Create a file called `gulpfile.babel.js` at your project root to install Jasmine tasks from `pui-react-tools` with a Webpack config:

```jsx
import {Jasmine} from 'pui-react-tools';
import 'babel-polyfill';

Jasmine.install({
  webpack: {
    test: () => {
      return {
        devtool: 'cheap-module-source-map',
        module: {
          rules: [
            {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader', query: {presets: ['env', 'react']}},
            {test: /css$/, loader: 'css-loader'},
            {test: /svg$/, loader: 'file-loader'}
          ]
        },
        output: {filename: '[name].js'},
        watch: true
      };
    }
  },
  appGlobs: ['src/*.test.js'],
  headlessServerOptions: {
    includeStackTrace: true,
    random: false,
    isVerbose: false,
    port: 8888,
    driver: 'chrome'
  },
  headlessSpecRunnerOptions: {profile: true}
});
```

Create a `spec_helper.js` that imports necessary dependencies and sets up tests

```jsx
import $ from 'jquery';
import 'jasmine_dom_matchers';
import ReactDOM from 'react-dom';
import 'react-spy-on-render';

Object.assign(global, {
  $,
  jQuery: $,
  ReactDOM
});

beforeEach(() => {
  $('body').find('#root').remove().end().append('<main id="root"/>');
});

afterEach(() => {
  ReactDOM.unmountComponentAtNode(root);
});
```

Import `spec_helper.js` in each test file. Render into `root` and make assertions with jQuery selectors and matchers from `jasmine_dom_matchers`.

```jsx
import React from 'react';
import App from './App';
import '../path/to/spec_helper.js';

describe('app', () => {
  beforeEach(() => {
    spyOnRender(App).and.callThrough();
    ReactDOM.render(<App/>, root);
  });

  it('renders without crashing', () => {
    expect('.App').toExist();
    expect(App).toHaveBeenRenderedWithProps({});
  });
});
```