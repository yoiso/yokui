---
title: Vertical alignment
cssPath: pivotal-ui/css/vertical-alignment
---

Use the `aligner` class on a container element to help vertically align the element's children to the top, center, or bottom. Use the `aligner-item` and `aligner-item-*` classes on the children of the container element to position them within the container.

The height of the `aligner` element is set to 230 pixels by default but can be customized via CSS or inline styles.

## Classes

Modifier | Purpose
---------|--------
`aligner` | Makes an element into a container with vertically-aligned children
`aligner-item` | Makes an element int a child of the `aligner` container (centered vertically by default)
`aligner-item-top` | Aligns an item to the top of the container
`aligner-item-bottom` | Aligns an item to the bottom of the container

```html
//title=Default example
<div class="aligner border">
  <a class="aligner-item aligner-item-top" href="#">On Top</a>
  <a class="aligner-item" href="#">Center</a>
  <a class="aligner-item aligner-item-bottom" href="#">Bottom</a>
</div>
```

```html
//title=Custom height example
//description=You can override the default height with an inline style (or with CSS).
<div class="aligner border" style="height: 100px;">
  <a class="aligner-item" href="#">Center</a>
</div>
```

```html
//title=Combination example
//description=You can position both vertically and horizontally by combining the `aligner` with grids, or the text-alignment classes (`txt-l`, `txt-r`, and `txt-c`).
<div class="aligner border txt-c">
  <a class="aligner-item" href="#">Centered content</a>
</div>
```