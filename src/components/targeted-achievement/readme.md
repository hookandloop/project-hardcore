---
title: Targeted Achievement Chart
description: null
demo:
  embedded:
  - name: Main Target to Achievement Example (shows 3 examples)
    slug: example-index
  pages:
  - name: Showing Percentage Text
    slug: example-percent-text
  - name: Used on a Datagrid
    slug: example-datagrid
---

## Settings

### Dataset Settings

- name - Applies a name label to the left most section of the chart.
- completed - Gives a label, value, color and format to the completed bar of the chart.
- remaining - (optional) shows a hatched section that shows the remaining bit to a set target
- total - will be used on the top of the chart if applied. The total is used to set the total.

## Code Example

This example shows how to invoke a simple target to achievement chart with a dataset with a value several of the key points of the chart.

```javascript
var dataset1 = [{
  data: [{
    name: {text: 'Label A'},
    completed: {text: '50K of 250K', value: 50000, format: '.2s', color: 'primary'},
    remaining: {value: 20000, format: '.2s', text: ' To Target'},
    total: {value: 250000, format: '.2s'},
  }]
}];

var api1 = $('#example-1').chart({dataset: dataset1, type: 'targeted-achievement'}).data('chart');
```

## Accessibility

- The contrast and actual colors can be a concern for visibility impaired and color blind people. However, you can customize the color by passing higher contrast colors.

## Testability

- Please refer to the [Application Testability Checklist](https://design.infor.com/resources/application-testability-checklist) for further details.

## Keyboard Shortcuts

- None

## Upgrading from 3.X

- This is a new element
