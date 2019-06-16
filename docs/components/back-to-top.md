---
title: Back to top
cssPath: pivotal-ui/css/back-to-top
reactPath: pivotal-ui/react/back-to-top
reactComponents:
- BackToTop
---

You can use this component to scroll to the top of a document (or another scrollable element).

By default the button will be fixed to the bottom right hand corner of the page. See below for an example of how to override the positioning.

To apply the `BackToTop` component to a specific element, use the `scrollableId` prop. To use the `BackToTop` component to scroll the entire page, do not set the `scrollableId` prop.

```jsx
//title=Scrollable container example
//description=By setting `position: relative` on a parent element, and `position: absolute` on the `BackToTop`, we can position the button within the parent.
<div className="position-relative">
  <div id="scrollable-content" style={{height: '200px', overflow: 'auto'}}>
    <BackToTop scrollableId="scrollable-content" className="position-absolute" style={{
      right: '24px', bottom: '24px'
    }}/>
    <p>Scroll down at least 400 pixels to see the button!</p>
    {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
      <p key={n}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Interdum velit laoreet id donec. Adipiscing vitae proin sagittis nisl rhoncus. Maecenas volutpat blandit aliquam etiam erat velit. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Ac ut consequat semper viverra nam libero justo laoreet sit. Sed tempus urna et pharetra pharetra massa massa. Arcu dictum varius duis at consectetur. Mi ipsum faucibus vitae aliquet nec ullamcorper sit amet. Ac felis donec et odio pellentesque diam volutpat commodo. At risus viverra adipiscing at. Dui accumsan sit amet nulla facilisi. Tristique senectus et netus et malesuada fames ac. Iaculis urna id volutpat lacus laoreet non. Nullam non nisi est sit amet. Lectus sit amet est placerat in. Velit egestas dui id ornare arcu odio ut sem. Viverra nibh cras pulvinar mattis nunc sed blandit libero. Hendrerit gravida rutrum quisque non. Duis ultricies lacus sed turpis tincidunt id.</p>
      ))}
  </div>
</div>
```

By default, the button will appear when the container's `scrollTop` is greater than 400 pixels. To make it always visible, set the `alwaysVisible` prop.

```jsx
//title=Always visible example
<div>
  <BackToTop alwaysVisible/>
  See the bottom right corner of your screen!
</div>
```

## Props

Property       | Required | Type   | Default | Description
---------------|----------|--------|---------|------------
`alwaysVisible`  | no       | Boolean | false   | If `alwaysVisible` is not set, the component will only appear after the window has been scrolled.
`scrollableId`   | no       | String  |         | If `scrollableId` is set, the component will update this element's scrollTop property. Otherwise, document.body will be scrolled.
