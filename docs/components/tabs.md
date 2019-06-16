---
title: Tabs
cssPath: pivotal-ui/css/tabs
reactPath: pivotal-ui/react/tabs
reactComponents:
- Tab
- Tabs
- LeftTabs
---

Tabs are a navigation element used in web design that allow users to easily access different areas of a site or different parts of an individual page.

They’re like tabbed dividers in a filing cabinet – by clicking a tab, users can easily locate a view of related content. Tabs should be used for alternating between views within the same context, not to navigate to different areas.

Using Tab components in React consists of a parent element for the desired Tab type (for example,
`Tabs` or `LeftTabs`). Each `Tab` is a child of this parent element and has a `tab` property for the
string value a Tab should display.

Additionally, each `Tab` must define an `eventKey` property for uniquely identifying this tab to its parent component.

Do's         | Don'ts
-------------|----------
Use tabs to group content, connect related information, and as a tool to save space. | Don’t use tabs when it’s more meaningful for the user to see related content grouped together
Information needs to be highly scannable and simple to navigate helps aid users in locating specific information they need. | When content is sequential it may make more sense to have content grouped and scrollable
When a user would like to access each group of information separately. | When it makes more sense to have users scan the page then hide content


```jsx
//title=Tabs
<Tabs defaultActiveKey={1} actions={<a>Action!</a>}>
  <Tab eventKey={1} title="Tab 1">Wow!</Tab>
  <Tab eventKey={2} title="Tab 2">
    <h2>Neat!</h2>
    <span>So much content.</span>
  </Tab>
</Tabs>
```

```jsx
//title=Left tabs
<LeftTabs defaultActiveKey={1}>
  <Tab eventKey={1} title="Tab 1">Wow!</Tab>
  <Tab eventKey={2} title="Tab 2">
    <h2>Neat!</h2>
    <span>So much content.</span>
  </Tab>
</LeftTabs>
```

```jsx
//title=Responsive breakpoints
//description=Tabs can be responsive, and will display accordion-style on small screens and folder-style on large screens.
<Tabs defaultActiveKey={1} responsiveBreakpoint="md">
  <Tab eventKey={1} title="Tab 1"> I'm so responsive </Tab>
  <Tab eventKey={2} title="Tab 2"> Me too </Tab>
</Tabs>
```

## Props

### Tabs props

Property               | Required | Type     | Default | Description
-----------------------|----------|-------------------------------|----------|------------
`actions`              | no       | Node                          |          | An element or text that will display in the upper right
`animation`            | no       | Boolean                       | false    | Whether to animate when moving between tabs, defaults to true
`defaultActiveKey`     | no       | Any                           |          | The tab which will start out open. This should equal one of your tab's event keys
`largeScreenClassName` | no       | String                        |          | Will be applied to large screen tabs only
`onSelect`             | no       | Function                      |          | Will override default behavior when clicking on a tab. If you want to retain the default behavior as well as add new functionality, change default active key in the function you provide
`responsiveBreakpoint` | no       | oneOf('xs', 'sm', 'md', 'lg') |          | The size at which the small-screen tabs (accordion-style) should switch to large-screen tabs (folder-style)
`smallScreenClassName` | no       | String                        |          | Will be applied to small screen tabs only
`tabType`              | no       | oneOf('simple', 'left')       | 'simple' | Use 'left' to have the tabs stacked to the left

### Tab props

Property          | Required | Type     | Default | Description
------------------|----------|----------|---------|------------
`aria-labelledby` | no       | String   |         | Overwrite the default aria-labelledby for the tab for more specific accessibility information
`className`       | no       | String   |         | ClassName to add to the tab content
`disabled`        | no       | Boolean  | false   | If true, disable the tab
`eventKey`        | no       | Any      |         | data representing the tab, to be used with defaultActiveKey or onSelect
`onEntered`       | no       | Function |         | A function that gets called with the eventKey on entering a tab once animations have finished
`onExited`        | no       | Function |         | A function that gets called with the eventKey on exiting a tab once animations have finished
`tabClassName`    | no       | String   |         | className to add to the tab link
`title`           | yes      | Node     |         | Text or an element rendered in the tab link

### LeftTabs props

Property   | Required? | Type             | Description                                  | Default
-----------| ----------|------------------| ---------------------------------------------|------------------------
`tabWidth` | no        |  `number`        | The amount of FlexCol growth for the tabs    | 3