---
title: Ellipsis
cssPath: pivotal-ui/css/ellipsis
---

Use the `type-ellipsis` modifier to cause text within an element to be truncated with ellipses ("...") when it is too long to be displayed fully.

## Classes

Modifier | Purpose
---------|--------
`type-ellipsis` | Truncate inner text with ellipses

```jsx
//title=Basic example
<div className="type-ellipsis" style={{width: '250px'}}>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</div>
```