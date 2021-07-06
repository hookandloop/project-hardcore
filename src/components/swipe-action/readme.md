---
title: Swipe Action
description: A simple, mobile-friendly container that offers swipe actions
demo:
  embedded:
  - name: Default Example
    slug: example-index
---

In Desktop settings, Action Sheets are represented by [Popupmenus](../popupmenu/readme.md).  However, Action Sheet components can be configured to instead display a mobile-friendly view of this menu, which appears to roll out from the bottom of the viewport, and can easily be selected by touch.

## Code Example

The Action Sheet HTML markup is generated by the component, after the component is invoked against its trigger button.  Actions are defined in Javascript as a simple array of objects.

```html
<button id="action-sheet-trigger" class="btn-icon">
  <span class="audible">Trigger Action Sheet</span>
  <svg role="presentation" aria-hidden="true" focusable="false" class="icon">
    <use href="#icon-more"></use>
  </svg>
</button>
```

Each action is defined by its "icon" and "text" properties:

```js
$('#action-sheet-trigger').actionsheet({
  actions: [
    { icon: 'mail', text: 'Email' },
    { icon: 'user-profile', text: 'Go to Profile' },
    { icon: 'workflow', text: 'Share' },
    { icon: 'user-status-do-not-disturb', text: 'Remove' }
  ]
});
```

## Behavior Guidelines

For easier usability, Action Sheets should not contain too many different actions.  Actions should be contextual to the element that triggered them, similar to a simple Context Menu.

## Responsive Guidelines

- While it's possible to configure the breakpoint at which the Action Sheet is displayed, keep in mind that the view is intended to be mobile-friendly, and should be used with regard for an easy experience for the end user.

## Keyboard Shortcuts

The swipe container buttons are not keyboard accessible. On desktop you would use the popup menu which follows popupmenu guidelines

## Upgrading from 3.X

No corresponding component to the Swipe Container was available in the 3.x components.