---
title: Cards
description: This page describes Cards.
demo:
  pages:
  - name: Simple Card Example
    slug: example-index
  - name: Expandable Card
    slug: example-expandable
  - name: Full Page Width Cards
    slug: example-full-page
  - name: A group action toolbar area
    slug: example-group-action
  - name: Menu Button in the Header
    slug: example-menubutton
  - name: 3 Cards per column
    slug: example-three-up
test:
  pages:
  - name: Datagrid In a Card (Bad Practice)
    slug: test-datagrid
  - name: Datagrid With Pager (Bad Practice)
    slug: test-paging-datagrid
  - name: Toolbar In The Header
    slug: test-toolbar-header
---

## Code Example

Note that either the class `card` or `widget` can be used interchangeably. A card is just a div with `class="card"`. Usually its used in conjunction with home pages or the responsive grid. It can also have a header object and a content area (with scrolling). By adding the classes as noted in the example. Also checkout the homepage examples and homepage component.

```html
<div class="row">
  <div class="one-third column">
    <div class="card">
      <div class="card-header">
          <h2 class="widget-title">Card Title</h2>
          <button class="btn-actions" type="button">
            <span class="audible">Actions</span>
            <svg class="icon" focusable="false" aria-hidden="true" role="presentation">
              <use xlink:href="#icon-more"></use>
            </svg>
          </button>
          <ul class="popupmenu">
            <li><a href="#">Action One</a></li>
            <li><a href="#">Action Two</a></li>
          </ul>

      </div>
      <div class="card-content">

      </div>
    </div>
  </div>
  <div class="two-thirds column">
    <div class="card">
      <div class="card-header">
          <h2 class="widget-title">Card Title</h2>
          <button class="btn-actions" type="button">
            <span class="audible">Actions</span>
            <svg class="icon" focusable="false" aria-hidden="true" role="presentation">
              <use xlink:href="#icon-more"></use>
            </svg>
          </button>
          <ul class="popupmenu">
            <li><a href="#">Action One</a></li>
            <li><a href="#">Action Two</a></li>
          </ul>

      </div>
      <div class="card-content">

      </div>
    </div>
  </div>
</div>
```

## Keyboard Shortcuts

- The header contains a toolbar. Arrow keys should be used between buttons on the toolbars
- <kbd>Tab</kbd> to each section

## Responsive Guidelines

-   Either fluid based on parent grid, or uses masonry style layout
