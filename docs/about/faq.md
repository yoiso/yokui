---
title: FAQ
---

## How can I get help with Pivotal UI?

The fastest way to get a question answered is to ask the Pivotal UI team in the #pivotal-ui Slack channel.

The maintainers are open to pairing with other teams to help them incorporate and/or upgrade Pivotal UI. Reach out in Slack to set something up.

If a question turns into a bug report or a feature request, we may ask you to [file an issue](https://github.com/pivotal-cf/pivotal-ui/issues/new) so we can keep these in a central location.

## What browsers are supported?

On the desktop, Pivotal UI supports recent versions of Chrome, Firefox, Edge, and Safari as well as IE11. Pivotal UI also supports recent versions of mobile Chrome and Safari.

## How do I customize my components?

Sometimes, the props available on a component will not provide the customization needed for a particular requirement. In those cases, there are a few options:

- Writing a new component to encapsulate custom requirements and styles is often a good idea. New components can usually be built using simple Pivotal UI components like the `Grid` or `Panel`. If this new component could be useful to other teams, reach out to the Pivotal UI maintainers to see about incorporating this component into Pivotal UI.

- To some extent, modifier classes can be used to customize components. They are especially good for changing aspects like colors, text emphasis, and spacing around components.

- Many Pivotal UI styles can be overridden by writing custom CSS, but this is rarely recommended. It will often make code more difficult to maintain through future changes to Pivotal UI and can make UIs look inconsistent across Pivotal products.

If none of these options will work, reach out to the Pivotal UI team via a GitHub issue or in the Slack channel. We may be able to help find the right solution and/or to improve Pivotal UI to meet your needs.