---
title: Positioning
cssPath: pivotal-ui/css/positioning
---

Use the positioning modifiers to control the CSS `display`, `float`, and `position` properties.

## Classes

Modifier | Purpose
---------|--------
`display-block` | Sets `display: block` on element
`display-flex` | Sets `display: flex` on element
`display-inline` | Sets `display: inline` on element
`display-inline-block` | Sets `display: inline-block` on element
`display-none` | Sets `display: none` on element
`float-left` | Floats content to the left
`float-right` | Floats content to the right
`position-absolute` | Sets `position: absolute` on element
`position-fixed` | Sets `position: fixed` on element
`position-relative` | Sets `position: relative` on element

```html
//title=Floats
<div class="txt-c">
  <div class="float-left">floating left</div>
  <div class="float-right">floating right</div>
  <div>not floating</div>
</div>
```

```html
//title=Position Absolute
<div class="position-relative border type-accent-blue paxxl">
  Parent element
  <div class="position-absolute pal type-black bg-light-yellow">
    Child element
  </div>
</div>
```

```html
//title=Position Relative
<div class="position-relative"
     style="color: white;
            padding: 70px;
            background-color: #0074d9;">
  Parent element
  <div class="position-absolute"
       style="background-color: rgba(0,0,0,.3);
              padding: 20px;
              color: rgba(255,255,255,.4);
              bottom: 0;
              left: 0;
              right: 0;">
    Child element
  </div>
</div>
```

```html
//title=Position Fixed
<div>
  This example places a green box in the bottom-right corner of this page.
  <div class="position-fixed bg-green type-white paxxl"
       style="right: 0; bottom: 0;">
    I am fixed!
  </div>
</div>
```

```html
//title=Display Flex
<div class="display-flex">
  <div class="bg-black type-white" style="flex: 1;">child1</div>
  <div class="bg-gray type-white" style="flex: 2;">child2</div>
  <div class="bg-light-gray" style="flex: 3;">child3</div>
</div>
```

```html
//title=Display Block
<span class="display-block bg-light-gray">
  This span tag takes up all available width
</span>
```

```html
//title=Display Inline
<div class="display-inline bg-light-gray">
  This div tag takes up only the space it needs
</div>
```

```html
//title=Display Inline-Block
<div class="display-inline-block bg-light-gray" style="width: 600px">
  This div tag takes up a fixed amount of space (600px)
</div>
```

```html
//title=Display None
<div>
  The div below this text has been hidden with the "display-none" class.
  <div class="display-none">
    This div is hidden!
  </div>
</div>
```