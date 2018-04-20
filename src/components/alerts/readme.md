---
title: Alerts
description: This page describes Alerts.
demo:
  pages:
  - name: Alerts (Icons)
    slug: example-index
  - name: Alerts (Badges)
    slug: example-index
  - name: More Badge Examples
    slug: example-additional-badges
---

## Settings

* Icon Types - `icon-alert`, `icon-confirm`, `icon-dirty`, `icon-error`, `icon-info`, `icon-pending`, `icon-new`, `icon-in-progress`, `icon-info-field`
* Icon Colors - This is done automatically by the type (alert, error, info, confirm)

## Code Example

Alerts are just specially classed icons. You can added alert icons by adding an SVG element with the icon `xlink:href` pointing to the icon's ID. You should also include an audible span for better accessibility.

```html
<svg class="icon icon-alert" focusable="false" aria-hidden="true" role="presentation">
  <!-- Substitute icon-alert with any of the above icon types -->
  <use xlink:href="#icon-alert"></use>
</svg>
<span class="audible">Alert</span>

```

## Accessibility

-   The traffic light colors in the Light UI theme is technically a contrast violation, so care should be given not to use the identical colors if styling text near the alerts. The high-contrast theme provides an alternative
-   Make to include an offscreen label even though the element does not get focus. This could be read by the virtual cursor on a screen reader (`class="audible"`)

## Keyboard Shortcuts

Alert icons and Badges do not have tab stops or keyboard interaction on their own. However, they may be placed in a grid cell or other object that has tab focus.

## Upgrading from 3.X

-   The old alerts where shown as `<div>`s, the new ones are displayed as spans. These could be used interchangeably, but span is easier to position in line so is usually a better fit.
-   Classes which were formerly `.inforAlertIcon` should be changed to an SVG element
