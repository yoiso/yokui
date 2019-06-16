---
title: Progress bars
cssPath: pivotal-ui/css/progress-bar
reactPath: pivotal-ui/react/progress-bar
reactComponents:
- ProgressBar
---

```jsx
//title=Downloading...
<div>
  <div>Downloading...</div>
  <ProgressBar value={60} barClassName="bar-class"/>
  <Grid>
    <FlexCol>60 MB / 100 MB</FlexCol>
    <FlexCol fixed>60%</FlexCol>
  </Grid>
</div>
```

## Props

Property        | Required   | Type      | Default   | Description
--------------- | ---------- | --------- | --------- | ------------
`barClassName`  | false      | String    |           | Class(es) to apply
`value`         | false      | Number    |           | Percentage to display