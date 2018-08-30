---
title: Bar Chart (Stacked)
description: This page describes Bar Chart (Stacked).
demo:
  pages:
  - name: Standard Stacked Bar Chart
    slug: example-index
  - name: 100% Stacked Bar Chart
    slug: example-stacked-100
  - name: Colors
    slug: example-stacked-colors
  - name: Patterns
    slug: example-stacked-patterns
  - name: Formatting Tooltip Data
    slug: example-stacked-formatter-string
  - name: Set animation speed
    slug: example-animation
  - name: Example showing defaulting a selected value
    slug: example-stacked-selected
  - name: Example showing Get Selected value
    slug: example-get-selected
  - name: Example showing Set Selected value
    slug: example-set-selected
---

## Code Example

This example shows how to invoke the grouped bar chart in the charts component. We pass a dataset data points for each bar group we want to show.

```javascript
var dataset = [{
    data: [{
        name: '2008',
        value: 123
    }, {
        name: '2009',
        value: 234
    }, {
        name: '2010',
        value: 345,
    }],
    name: 'Series 1'
}, {
    data: [{
        name: '2008',
        value: 235
    }, {
        name: '2009',
        value: 267
    }, {
        name: '2010',
        value: 573
    }],
    name: 'Series 2'
}];

$('#bar-stacked-example').chart({type: 'bar-stacked', dataset: dataset});
```

## Accessibility

- The contrast and actual colors can be a concern for visibility impaired and color blind people. However, you can customize the color by passing higher contrast colors.

```javascript
color: '#1a1a1a'
name: 'Component C'

```

## Code Tips

You can override the tooltip by passing in a specific tooltip text value.

```javascript
{type: 'bar-stacked', dataset: dataset, tooltip: 'Tooltip by attribute'}
```

Or if you have more dynamic requirements you can do this with an ajax callback.

```javascript
$('#bar-grouped-example').chart({type: 'bar-stacked', dataset: dataset,
  tooltip: function(response) {
    //Ajax Call or async op
    setTimeout(function () {
      response('<strong>Tooltips Provide <br> Interesting Information</strong>');
    }, 400);
  }
});
```

## Testability

- Please refer to the [Application Testability Checklist](https://design.infor.com/resources/application-testability-checklist) for further details.

## Keyboard Shortcuts

- <kbd>Tab</kbd> You can tab into the chart area and through the legend values as each has a focus state.
- <kbd>Enter/Space</kbd> Will select the bar group the corresponds with the focus'd legend item.

## Upgrading from 3.X

- The stacked chart was added in 3.6. From 3.6 the api is compatible.
