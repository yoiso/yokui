---
title: Divider
cssPath: pivotal-ui/css/dividers
reactPath: pivotal-ui/react/dividers
reactComponents:
- Divider
---

```jsx
//title=Large divider example
//description=Dividers draw horizontal lines between different content groupings
<div>
  <Divider/>
  Content
  <Divider size="large"/>
</div>
```

```jsx
//title=Inverse dividers
//description=On a dark background, use these inverse dividers
<div style={{background: '#232B2F'}}>
  <div className="type-white">
    I am some content
    <Divider inverse/>
    Me too
  </div>

  <div className="type-white">
    Here's some stuff above the divider
    <Divider inverse size="large"/>
    Here's some stuff below the divider
  </div>
</div>
```

## Props

Property  | Required | Type | Default | Description
----------|----------|------|---------|------------
`inverse` | no | Boolean | | Specifying this prop inverses the divider
`size`    | no | String  | | Changes the size of the component. Either 'large' or leave undefined for default size.