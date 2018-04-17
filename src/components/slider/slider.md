---
title: Slider Component
description: This page describes Slider Component .
---

## Configuration Details

1. Main Example [View Example](../components/slider/example-index)
2. Range Example (Two Handles) [View Example](../components/slider/example-range)
3. Steps [View Example](../components/slider/example-stepping)
4. Colors &amp; Ticks [View Example](../components/slider/example-colors-and-ticks)
5. Vertical Sliders [View Example](../components/slider/example-vertical)
6. Custom Tooltip Decorators [View Example](../components/slider/example-custom-tooltips)
7. `setValue()` API Demo [View Example](../components/slider/example-set-value-api)

## Code Example

### Single-Handle Slider

The Slider Control provides a clickable, touchable interface that interfaces with a standard HTML Input element with a "range" type attribute. Because of styling and functionality requirements, we use a stylized shadow widget which implements the range input's behavior and updates in sync with a hidden input element. This allows the input element to be serialized with the DOM like normal. The simplest way to use the Slider Control is to create markup containing: a field (for field and responsive form alignment), a label and an input element with a "range" type and a "slider" CSS class. For accessibility and implementation reasons the label is required.

```html
<div class="field">
  <label for="slider-regular-example">Regular</label>
  <input id="slider-regular-example" name="slider-regular" class="slider" type="range"/>
</div>
```

### Ranged Slider

Example of a Slider Control that is configured to be a Range, with a lower value and a higher value. This Slider also displays the current value for the selected handle inside a tooltip.

```html
<div class="field">
  <label for="slider-regular-example">Regular</label>
  <input id="slider-regular-example" name="slider-regular-example" class="slider" type="range" data-tooltip-content='[""]' data-tooltip-persist="true" />
</div>
```

### Extra Ticks & Colors

This example shows how to properly implement a Slider Control with Ticks using HTML5 data attributes for settings.

```html
<label for="slider-quality-example">Ticks &amp; Colors</label>
<input id="slider-quality-example" name="slider-quality-example" class="slider" type="range" min="0" max="5" value="2" step="1" data-ticks='[
  {"value": 0, "description": "Very Poor", "color": "very-poor"},
  {"value": 1, "description": "Poor", "color": "poor"},
  {"value": 2, "description": "Adequate", "color": "adequate"},
  {"value": 3, "description": "Good", "color": "good"},
  {"value": 4, "description": "Very Good", "color": "very-good"},
  {"value": 5, "description": "Superior", "color": "superior"}
]'/>
```

### Stepped Slider Example

This is an example of a Slider that can only have values in increments of 10, with a minimum of -150 and a maximum of 150.

```html
<div class="field">
  <label for="slider-stepped-example">Stepped</label>
  <input id="slider-stepped-example" name="slider-stepped" class="slider" type="range" step="5" data-ticks='[
    {"value": 0, "description": "Min"},
    {"value": 100, "description": "Max"}
  ]'/>
</div>
```

## Implementation Tips

Only providing the HTML Label and Input with a "range" type attribute and "slider" CSS class are necessary if using the SoHo Xi Components Suite.

## Accessibility

The Slider is fairly complex to make accessible. But generally this can be accomplished in four steps:

- Make sure the above keyboard shortcuts are used.
- Make sure that there is a label which matches both the input and any shadow element inputs and identifies the field and is correctly matched using the label for to the input id.
- Use the following ARIA tags on all slider handles/thumbs (the clickable/touchable part of the slider):
  - `role="slider"`
  - `aria-orientation="horizontal"` or `"vertical"`, to match the Control's orientation.
  - `aria-valuemin` - the lowest possible numeric value on the slider.
  - `aria-valuemax` - the highest possible numeric value on the slider.
  - `aria-valuenow` - the current numeric value of the slider. This should dynamically update whenever the handle value is changed.
  - `aria-valuetext` - If there is a word or phrase associated with the current slider value, it should be duplicated in this attribute so it will be read by a screen reader. This should update in sync with aria-valuenow.
  - `tabindex` - set to zero if not using focusable HTML elements, or set to -1 if the handle is disabled.
- Conditionally use the following ARIA attributes in some situations:
  - `aria-label` - Use in most cases to describe the purpose of the handle (Is it the only one? Is it the lower-value versus the higher handle)
  - `aria-describedby` - When used in conjunction with a [Tooltip Control](https://soho.infor.com/index.php?p=component/tooltip), this attribute will be appended to the handle automatically, but in this case the 'aria-label' attribute should be removed.

## Keyboard Shortcuts

Keyboard functionality of the Slider control differs based on whether or not the Slider is single-thumbed (one handle), or a "range" (multi-handle). The keyboard applies to all types of Sliders in these ways:

- <kbd>Right and Up Arrows</kbd> increase the value of the Slider.
- <kbd>Left and Down Arrows</kbd> decrease the value of the Slider.
- <kbd>Home and End</kbd> move to the minimum and maximum values of the Slider.
- <kbd>Tab</kbd> into and out of the Slider handle.
- <kbd>Page Up and Page Down</kbd> optionally increment or decrement the Slider by a given amount. Normally it will change by 10% of the total possible value of the Slider, or it will adjust to the next highest/lowest tick.
- Note: Focus is placed on the Slider. (The visual object that the mouse/touch user would move, also known as the thumb.)
- Note: Localization for right-to-left languages may wish to reverse the left and right arrows.

In cases of a range (two-handled) Slider, the keyboard functionality changes in the following ways:

- On the lower-value handle, <kbd>Right and Up Arrows</kbd>  will only increase the value of the slider up to the constraint of the higher-value handle. The lower handle can never be a higher value than the upper handle.
- On the higher-value handle, the <kbd>Left and Down Arrows</kbd>  will only decrease the value of the slider down to the constraint of the lower-value handle. The higher handle can never be a lower value than the lower handle.
- <kbd>Home and End</kbd>  have the same effect of being constrained by other handles.
- <kbd>Tab</kbd>  will initially focus on the first handle. Pressing Tab again will focus the next handle. Pressing Tab a third time moves to the next focusable object in the document.
- <kbd>Shift+Tab</kbd>  has the reverse effect.

## States and Variations

- Draggable
- Active (vs. at rest)
- Focus
- Hover
- Disabled

Note: Only an entire Slider control can be disabled. If the Slider is a range (meaning multiple handles), setting the Slider control to disabled will cause all handles not to respond to input.

## Responsive Guidelines

- The Slider Control is responsive, and should automatically stretch to fill 100% width (if horizontal), or 100% height (if vertical) of its parent container.
