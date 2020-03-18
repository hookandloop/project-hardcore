---
title: Alerts
description:
demo:
  embedded:
  - name: Alerts (Icons)
    slug: example-index
  pages:
  - name: Alerts (Badges)
    slug: example-index
---

## Settings

- Icon Types - `icon-alert`, `icon-success`, `icon-dirty`, `icon-error`, `icon-info`, `icon-pending`, `icon-new`, `icon-in-progress`, `icon-info-field`
- Icon Colors - This is done automatically by the type (alert, error, info, success)

## Code Example

Alerts are just specially classed icons. You can added alert icons by adding an SVG element with the icon `xlink:href` pointing to the icon's ID. You should also include an audible span for better accessibility.

```html
<svg class="icon icon-alert" focusable="false" aria-hidden="true" role="presentation">
  <!-- Substitute icon-alert with any of the above icon types -->
  <use href="#icon-alert"></use>
</svg>
<span class="audible">Alert</span>

```

Also see [Badges](./badges) for more options.

## Accessibility

- The traffic light colors are accessibility violations for contrast, however, the high contrast theme provides an alternative that passes. In addition, in context text should be used as color alone cannot provide the meaning.
- An audible span (`class="audible"`) should always be included for accessibility, it should describe the alert status and/or count value in a meaningful way to a non-visual user.

## Testability

- Please refer to the [Application Testability Checklist](https://design.infor.com/resources/application-testability-checklist) for further details.

## Keyboard Shortcuts

Alert icons and Badges do not have tab stops or keyboard interaction on their own. However, they may be placed in a grid cell or other object that has tab focus.

## Upgrading from 3.X

- The old alerts where shown as `<div>`s, the new ones are displayed as spans. These could be used interchangeably, but span is easier to position inline so is usually a better fit.
- Classes which were formerly `.inforAlertIcon` should be changed to an SVG element
