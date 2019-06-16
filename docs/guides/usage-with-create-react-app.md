---
title: Usage with Create React App
---

To get started using Pivotal UI with Create React App (CRA), follow these steps:

1. Install the latest version of Node LTS. [See here for instructions.](https://docs.npmjs.com/getting-started/installing-node)

2. Create a new CRA project with this command:

```bash
npx create-react-app some-directory
```

At this point, you'll be able to start up the default CRA app locally:

```bash
cd some-directory
yarn start
```

For more information on Create React App, see the [CRA readme](https://github.com/facebook/create-react-app).

3. Install the `pivotal-ui` node module:

```bash
yarn add pivotal-ui
```

4. Open `src/App.js` and replace the contents with:

```jsx
import React, {Component} from 'react';
import {DefaultButton} from 'pivotal-ui/react/buttons';

export default class App extends Component {
  render() {
    return <DefaultButton>Click Me</DefaultButton>
  }
}
```

## Sass

Please refer to the [create-react-app docs](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-a-css-preprocessor-sass-less-etc)