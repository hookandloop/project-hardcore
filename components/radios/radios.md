---
title: Radio Buttons
description: This page describes Radio Buttons.
demo:
  pages:
  - name: Radio Button Example
    slug: example-index
  - name: Horizontal Radio Button Example
    slug: example-index
  - name: Dirty Flag
    slug: test-dirty
  - name: Validation
    slug: test-validation
---

## Code Example

Displays one or more selectable values. A user can select exactly one value at a time. Best used when all possible options should be clearly visible to a user.

```html
<fieldset class="radio-group">
<legend>Select delivery method</legend>
  <input type="radio" class="radio" name="options" id="option1" data-automation-id="option1" value="option1" />
  <label for="option1" class="radio-label">Option one</label>
  <br/>
  <input type="radio" class="radio" name="options" id="option2" data-automation-id="option2" value="option1" checked="true" />
  <label for="option2"  class="radio-label">Option two</label>
  <br/>
  <input type="radio" class="radio" name="options" id="option3" data-automation-id="option3" value="option3" />
  <label for="option3" class="radio-label">Option three</label>
  <br/>
  <input type="radio" class="radio" name="options" id="option4" data-automation-id="option4" value="delivery" disabled="true" />
  <label for="option4" class="radio-label">Option four</label>
</fieldset>
```

## Testability

- Make sure each item has a unique id that does not change across versions of your software.
- If you think that your id may change you can also use an optional automation-id for test teams to target your elements. This should not change or future test scripts may break unexpectedly.

## Implementation Tips

- Radio button is a css only component so anything you find on the web about radios can be used.

## Accessibility

- Should work like a standard html radio button
- Make sure you have a label that matches the id of your input.

## Keyboard Shortcuts

-  <kbd>Tab</kbd> Will enter the radio group
-  <kbd>Shit + Tab</kbd> Will exit the radio group
-  <kbd>Down/Right</kbd> Changes the select to the next/previous element.
-  <kbd>Up/Left</kbd> Changes the select to the next/previous element.
-  <kbd>Space bar</kbd> Can work to select with limitations.

## States and Variations

- Enabled
- Disabled
- Checked
- Error
- Dirty

## Responsive Guidelines

- Smaller than mobile size so should fit in the responsive grid except for exceptionally long text which will wrap.

## Upgrading from 3.X

- Has updated markup and validation has changes.
