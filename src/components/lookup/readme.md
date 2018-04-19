---
title: Lookup
description: This page describes Lookup.
demo:
  pages:
  - name: Default Lookup
    slug: example-index
  - name: Multiselect Lookup
    slug: example-multiselect
  - name: Lookup with Paging
    slug: example-paging
  - name: Lookup with Filter
    slug: example-filter-row
  - name: Editable Lookup
    slug: example-editable
  - name: Editable Strict
    slug: example-editable-strict
  - name: Custom Toolbar
    slug: example-custom-toolbar
  - name: Custom Buttons
    slug: example-custom-buttons
---

## Behavior Guidelines

-   To distinguish between single and multi-select situations, use checkboxes in multi-select lists.
-   The height of a multi-select list can grow up to 3 lines to accommodate multiple entries. After this point, scrolling should be available.
-   In some situations (such as when a lookup is used in a filter row in a table), the field height is fixed and cannot expand to show multiple selections. Include a design approach for multi-select dropdowns in this scenario.

## Code Example

### Lookup Markup

The lookup element is a simple text input field. Always include a matching `<label>` for accessibility. To initialize the lookup call the `.lookup()` plugin.

```html
<div class="field">
  <label for="product-lookup" class="label">Products</label>
  <input id="product-lookup" data-init="false" class="lookup" name="product-lookup" type="text">
</div>
```

### Lookup Example

The `field` is the field to be returned from the grid. You can also pass reasonable grid options to the lookup (not all features will work by design). The `selectable` option can be set to either `single` or `multiselect`. This defines the key difference between a single select lookup and a multi select lookup.

```javascript
grid = $('#product-lookup').lookup({
  field: 'productId',
  options: {
    columns: columns,
    dataset: data,
    selectable: 'single', //multiselect or single
    toolbar: {
      results: true,
      rowHeight: false
    }
  }
});
```

## Accessibility

-   This is a very complex control and interaction and is not currently accessible to screen readers
-   It does work with keyboard however

## Keyboard Shortcuts

-   <kbd>Tab</kbd> and <kbd>Shift Tab</kbd> moves focus into the field to/from the next focusable item in the tab order
-   <kbd>Down Arrow</kbd> opens the dialog
-   <kbd>Esc</kbd> cancels and closes the open dialog
-   <kbd>Tab</kbd> and <kbd>Shift Tab</kbd> when the dialog is open, tab will move around the items, for example, from the search to the data grid
-   <kbd>Down</kbd> and <kbd>Up Arrow</kbd> when focus is on the grid in the dialog this moves the focus up and down on the rows
-   <kbd>Space</kbd> toggle selection on the current row if multiselect. If single select, the row is selected and inserted
-   <kbd>Enter</kbd> if focus is on the grid in the lookup and if single select, the current row will be selected. If multiselect then all the selected rows will be inserted

## Responsive Guidelines

-   The dialog stretches to 90% at smaller breakpoints

## Upgrading from 3.X

-   `inforLookup` class changed to `lookup`
-   Initialization options and API is different
-   Use events rather than callbacks
