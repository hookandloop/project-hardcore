---
title: Column Chart (Grouped)
description: This page describes Column Chart (Grouped).
demo:
  embedded:
  - name: Standard Grouped Column Chart
    slug: example-index
  pages:
  - name: Default a Selected Group
    slug: example-selected
  - name: Handle negative values
    slug: example-negative
  - name: Set animation speed
    slug: example-animation
  - name: Example showing Get Selected value
    slug: example-get-selected
  - name: Example showing Set Selected value
    slug: example-set-selected
---

## Configuration Options

1. Example Grouped Column Chart [View Example](https://design.infor.com/code/ids-enterprise/latest/demo/column-grouped/example-index?font=source-sans)
2. Default a Selected Group [View Example](https://design.infor.com/code/ids-enterprise/latest/demo/column-grouped/example-selected?font=source-sans)
3. Handle Negative Values [View Example](https://design.infor.com/code/ids-enterprise/latest/demo/column-grouped/example-negative-value?font=source-sans)
4. Set animation speed [View Example]( ../components/column-grouped/example-animation)
5. Example showing Get Selected value [View Example](https://design.infor.com/code/ids-enterprise/latest/demo/column-grouped/example-animation?font=source-sans)
6. Example showing Set Selected value [View Example](https://design.infor.com/code/ids-enterprise/latest/demo/column-grouped/example-set-selected?font=source-sans)

## Code Example

This example shows how to invoke the grouped bar chart in the charts component. We pass a dataset data points for each bar group we want to show.

```javascript
var dataset = [{
    data: [{
        name: 'Jan',
        value: 12
    }, {
        name: 'Feb',
        value: 11
    }],
    name: 'Component A'
    }, {
    data: [{
        name: 'Jan',
        value: 22
    }, {
        name: 'Feb',
        value: 21
    }],
    name: 'Component B'
}];

$('#column-grouped-example').chart({type: 'column-grouped', dataset: dataset});
```

## Accessibility

The contrast and actual colors can be a concern for visibility impaired and color blind people. However, you can customize the color by passing higher contrast colors.

## Code Tips

You can override the tooltip by passing in a specific tooltip text value.

## Testability

- Please refer to the [Application Testability Checklist](https://design.infor.com/resources/application-testability-checklist) for further details.

## Keyboard Shortcuts

- <kbd>Tab</kbd>You can tab into the chart area and through the legend values as each has a focus state.
- <kbd>Enter/Space</kbd>Will select the bar group the corresponds with the focus'd legend item.

## Upgrading from 3.X

- The area chart was added in 3.6. From 3.6 the api is compatible.
