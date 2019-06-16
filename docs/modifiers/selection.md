---
title: Selection
cssPath: pivotal-ui/css/selection
---

Use the `pui-no-select` modifier to prevent text from being selectable. This is useful to prevent accidental selection of the labels on checkboxes when clicking them.

It is generally not recommended to use this modifier on its own, since preventing the selection of some text may worsen the user experience. Instead of adding the class directly, use the `noSelect` prop on the `Checkbox` or `Radio`, which will automatically add this modifier to the text next to the input.

For the `noSelect` prop to take effect, you will need to import this modifier as shown below.

## Classes

Modifier | Purpose
---------|--------
`pui-no-select` | Prevent selection of text within an element

```jsx
//title=Using the noSelect prop on a Checkbox
<div>
  <div>Try highlighting and clicking rapidly on the labels below.</div>
  <Checkbox noSelect>This is an unselectable checkbox label.</Checkbox>
  <Checkbox>This is a selectable checkbox label.</Checkbox>
</div>
```