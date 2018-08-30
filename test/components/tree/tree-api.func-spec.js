import { Tree } from '../../../src/components/tree/tree';

const treeHTML = require('../../../app/views/components/tree/example-index.html');
const svg = require('../../../src/components/icons/svg.html');

let treeEl;
let svgEl;
let treeObj;

describe('Tree API', () => {
  beforeEach(() => {
    treeEl = null;
    svgEl = null;
    treeObj = null;
    document.body.insertAdjacentHTML('afterbegin', svg);
    document.body.insertAdjacentHTML('afterbegin', treeHTML);
    treeEl = document.body.querySelector('.tree[role="tree"]');
    svgEl = document.body.querySelector('.svg-icons');
    treeEl.classList.add('no-init');
    treeObj = new Tree(treeEl);
  });

  afterEach(() => {
    treeObj.destroy();
    treeEl.parentNode.removeChild(treeEl);
    svgEl.parentNode.removeChild(svgEl);
  });

  it('Should be defined on jQuery object', () => {
    expect(treeObj).toEqual(jasmine.any(Object));
  });

  it('Should update with new settings', () => {
    expect(treeObj.settings.selectable).toEqual('single');
    expect(treeObj.settings.hideCheckboxes).toEqual(true);
    expect(treeEl.querySelector('a[role="treeitem"] .tree-checkbox')).toBeFalsy();

    treeObj.updated({ selectable: 'multiple', hideCheckboxes: false });

    expect(treeObj.settings.selectable).toEqual('multiple');
    expect(treeObj.settings.hideCheckboxes).toEqual(false);
    expect(treeEl.querySelector('a[role="treeitem"] .tree-checkbox')).toBeTruthy();
  });

  it('Should destroy tree', () => {
    treeObj.destroy();

    expect(treeEl.querySelectorAll('a[role="treeitem"]').length).toEqual(0);
  });
});
