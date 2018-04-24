---
title: Text Input
description: This page describes Text Input.
demo:
  pages:
  - name: Text Input Examples
    slug: example-index
  - name: Inputs with Action Menus
    slug: example-actions
  - name: Inputs with Info message under
    slug: example-info
  - name: Inputs with Placeholders
    slug: example-placeholder
  - name: Input Widths (Sm, Md, Lg)
    slug: example-sizes
  - name: Text Area
    slug: textarea
  - name: Clearable Input (With an X)
    slug: example-clearable
  - name: Input with Right Click Context Menu
    slug: example-contextmenu
---

The Text Input Field supports both unstructured and structured entries. Certain types of values (such as phone numbers, credit card numbers, part codes, even decimal values, etc.) may have more complex formatting rules than simple text and decimal entries. You can use smart (forgiving) and structured formats within a text input field to support more of these types of values.

With smart formatting, the system interprets the user entry and restructures the data if necessary. Use this method when:

-   You don't want to require users to enter the value in exact format. For example, if you require currency values to have two decimal places, a smart format will automatically add two zeros after the decimal place if the user does not enter a decimal point (user enters 94, system interprets as 94.00).
-   The system can easily interpret what the user intends. For example, for a phone number in the U.S., the system should be able to interpret multiple entry methods: (123) 456-7890; 123-456-7890; 123.456.7890; 1234567890

With structured formatting, the system requires values be entered in a specific format. The field uses inline help to identify the field mask and forces the correct structure. Use this method when:

-   User must enter data in a specific format (such as software license keys or credit card numbers).
-   The required format is easily represented visually.
-   The system cannot easily interpret different methods of entering the data.

## Code Example

### Text Input Field

A standard Text Input is a basic input element with `type="text"`. Password type can also be used. To implement one, create an input element with `type="text"`. You can also add various related features, including:

-   Masking
-   Placeholder
-   Tooltip
-   Required
-   Validation
-   Dirty Indicator
-   Enabled/Read-only

```html
<div class="field">
  <label for="first-name">First Name</label>
  <input type="text" id="first-name" name="first-name" placeholder="Normal text Field">
</div>

<div class="field">
  <label class="required" for="last-name">Last Name</label>
  <input type="text" id="last-name" aria-required="true" name="last-name" data-validate="required">
</div>

<div class="field">
  <label class="required" for="email-address">Email Address</label>
  <input type="text" id="email-address" aria-required="true" name="email-address" data-validate="required email" placeholder="Company@address.com">
</div>

<div class="field">
  <label class="required" for="email-address-ok">Email Address - Checker</label>
  <input type="text" id="email-address-ok" name="email-address-ok" data-validate="emailPositive">
</div>

<div class="field">
  <label for="department">Department</label>
  <input type="text" disabled value="Field not editable" id="department" name="department">
</div>

<div class="field">
  <label for="department-code">Department Code</label>
  <input type="text" readonly value="02006" id="department-code" name="department-code">
</div>

<div class="field">
  <label for="department-code-trackdirty">Department Code</label>
  <input type="text" placeholder="Dirty Tracking" data-trackdirty="true" id="department-code-trackdirty" name="department-code-trackdirty">
</div>
```

## Accessibility

-   Make sure the input has a matching `<label>` which is meaningful
-   Add `aria-required` for required elements

## Keyboard Shortcuts

-   <kbd>Tab</kbd> and <kbd>Shift Tab</kbd> moves focus into the edit field to/from the next focusable item in the tab order

## Responsive Guidelines

-  Default size is 300px wide but there are a number of widths [View Example](./input/example-sizes)
- You can also use the responsive grid [View Example]( ./form/example-inputs-simple)

## Upgrading from 3.X

-   Change class `inforTextbox` to `textbox`
-   Change class `inforLabel` to `label`
-   Instead of class `required` on the input, you should add this class to the `<label>`, and add `aria-required` and `data-validate`
-   Be sure to wrap inside of a `field` div
