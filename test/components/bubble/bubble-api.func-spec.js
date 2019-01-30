import { Line } from '../../../src/components/line/line';

const areaHTML = require('../../../app/views/components/bubble/example-index.html');
const svg = require('../../../src/components/icons/svg.html');

let bubbleEl;
let svgEl;
let bubbleObj;

const dataset = [{
  data: [{
    name: 'January',
    value: {
      x: 5,
      y: 3,
      z: 3
    },
    selected: true
  }, {
    name: 'February',
    value: {
      x: 37,
      y: 5,
      z: 9
    }
  }, {
    name: 'March',
    value: {
      x: 10,
      y: 5.3,
      z: 4
    }
  }, {
    name: 'April',
    value: {
      x: 80,
      y: 6,
      z: 10
    }
  }, {
    name: 'May',
    value: {
      x: 21,
      y: 4.8,
      z: 4
    }
  }, {
    name: 'June',
    value: {
      x: 72,
      y: 5.2,
      z: 4
    }
  }, {
    name: 'July',
    value: {
      x: 26,
      y: 8,
      z: 6
    }
  }, {
    name: 'August',
    value: {
      x: 71,
      y: 3.9,
      z: 8
    }
  }, {
    name: 'September',
    value: {
      x: 85,
      y: 8,
      z: 2
    }
  }, {
    name: 'October',
    value: {
      x: 52,
      y: 3,
      z: 2
    }
  }, {
    name: 'November',
    value: {
      x: 44,
      y: 5.9,
      z: 3
    }
  }, {
    name: 'December',
    value: {
      x: 110,
      y: 7,
      z: 4
    }
  }],
  name: 'Series 01',
  labels: {
    name: 'Series',
    value: {
      x: 'Revenue',
      y: 'Sold',
      z: 'Market Share'
    }
  },
  // Use d3 Format - only value will be formated
  valueFormatterString: {
    z: '0.0%'
  }
},
{
  data: [{
    name: 'January',
    value: {
      x: 9,
      y: 3.2,
      z: 3
    }
  }, {
    name: 'February',
    value: {
      x: 12,
      y: 6.3,
      z: 10
    }
  }, {
    name: 'March',
    value: {
      x: 65,
      y: 4,
      z: 10
    }
  }, {
    name: 'April',
    value: {
      x: 27,
      y: 7,
      z: 2
    }
  }, {
    name: 'May',
    value: {
      x: 29,
      y: 8.5,
      z: 4
    }
  }, {
    name: 'June',
    value: {
      x: 81,
      y: 3.9,
      z: 8
    }
  }, {
    name: 'July',
    value: {
      x: 33,
      y: 4.1,
      z: 7
    }
  }, {
    name: 'August',
    value: {
      x: 75,
      y: 4,
      z: 3
    }
  }, {
    name: 'September',
    value: {
      x: 39,
      y: 7,
      z: 4
    }
  }, {
    name: 'October',
    value: {
      x: 80,
      y: 2,
      z: 3
    }
  }, {
    name: 'November',
    value: {
      x: 48,
      y: 6.2,
      z: 2
    }
  }, {
    name: 'December',
    value: {
      x: 99,
      y: 4,
      z: 2
    }
  }],
  name: 'Series 02'
}];

describe('Bubble Chart API', () => {
  beforeEach(() => {
    bubbleEl = null;
    svgEl = null;
    bubbleObj = null;
    document.body.insertAdjacentHTML('afterbegin', svg);
    document.body.insertAdjacentHTML('afterbegin', areaHTML);
    bubbleEl = document.body.querySelector('#bubble-example');
    svgEl = document.body.querySelector('.svg-icons');

    bubbleObj = new Line(bubbleEl, { isBubble: true, type: 'bubble', dataset, animate: false });
  });

  afterEach(() => {
    bubbleObj.destroy();
    svgEl.parentNode.removeChild(svgEl);
    bubbleEl.parentNode.removeChild(bubbleEl);

    const rowEl = document.body.querySelector('.row');
    rowEl.parentNode.removeChild(rowEl);
  });

  it('Should show on page', () => {
    expect(document.body.querySelectorAll('.dot').length).toEqual(24);
    expect(document.body.querySelectorAll('.line-group').length).toEqual(2);
    expect(document.body.querySelectorAll('.chart-legend')[0].innerText.replace(/[\r\n]+/g, '')).toEqual('Series 01Series 02');
  });

  it('Should render selected dot', () => {
    expect(document.body.querySelectorAll('[data-group-id="0"]').length).toEqual(1);
    expect(document.body.querySelector('[data-group-id="0"]').classList.contains('is-selected')).toBeTruthy();
  });

  it('Should be able to get the get and set the selected bubble', () => {
    // Use group "name" to select
    let options = {
      groupName: 'name',
      groupValue: 'Series 01'
    };
    bubbleObj.setSelected(options);

    expect(bubbleObj.getSelected()[0].data.data.length).toEqual(12);
    expect(bubbleObj.getSelected()[0].data.name).toEqual('Series 01');

    bubbleObj.toggleSelected(options);

    expect(bubbleObj.getSelected().length).toEqual(0);

    // Use groupIndex to select
    options = {
      groupIndex: 0,
      fieldName: 'name',
      fieldValue: 'February'
    };
    bubbleObj.setSelected(options);

    expect(bubbleObj.getSelected()[0].data.value.x).toEqual(37);
    expect(bubbleObj.getSelected()[0].data.name).toEqual('February');

    bubbleObj.toggleSelected(options);

    expect(bubbleObj.getSelected().length).toEqual(0);

    // Use group index to select
    options = { groupIndex: 0 };
    bubbleObj.setSelected(options);

    expect(bubbleObj.getSelected()[0].data.data.length).toEqual(12);
    expect(bubbleObj.getSelected()[0].data.name).toEqual('Series 01');

    // Use point index to select
    options = {
      groupIndex: 1,
      index: 0
    };
    bubbleObj.setSelected(options);

    expect(bubbleObj.getSelected()[0].data.value.x).toEqual(9);
    expect(bubbleObj.getSelected()[0].data.name).toEqual('January');

    // Use jQuery object to select
    options = { elem: $('#area-example').find('[data-group-id="1"]') };
    bubbleObj.setSelected(options);

    expect(bubbleObj.getSelected()[0].data.value.x).toEqual(9);
    expect(bubbleObj.getSelected()[0].data.name).toEqual('January');

    options = { elem: $('#area-example').find('[data-group-id="1"] .dot:eq(0)') };
    bubbleObj.setSelected(options);

    expect(bubbleObj.getSelected()[0].data.value.x).toEqual(9);
    expect(bubbleObj.getSelected()[0].data.name).toEqual('January');
  });
});
