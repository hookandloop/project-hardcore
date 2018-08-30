import { Blockgrid } from '../../../src/components/blockgrid/blockgrid';

const blockgridHTML = require('../../../app/views/components/blockgrid/example-index.html');
const svg = require('../../../src/components/icons/svg.html');

let blockgridEl;
let svgEl;
let blockgridObj;

const settings = {
  dataset: [],
  selectable: 'single', // false, 'single' or 'multiple' or mixed
  paging: false,
  pagesize: 25,
  pagesizes: [10, 25, 50, 75]
};

describe('Blockgrid API', () => {
  beforeEach(() => {
    blockgridEl = null;
    svgEl = null;
    blockgridObj = null;
    document.body.insertAdjacentHTML('afterbegin', svg);
    document.body.insertAdjacentHTML('afterbegin', blockgridHTML);
    blockgridEl = document.body.querySelector('.blockgrid');
    svgEl = document.body.querySelector('.svg-icons');
    blockgridObj = new Blockgrid(blockgridEl, settings);
  });

  afterEach(() => {
    blockgridObj.destroy();
    svgEl.parentNode.removeChild(svgEl);
  });

  it('Should be defined', () => {
    expect(blockgridObj).toEqual(jasmine.any(Object));
  });

  it('Should visible blockgrid', () => {
    expect(document.body.querySelector('.blockgrid')).toBeTruthy();
  });

  it('Should select block', (done) => {
    const firstBlock = $('.block').first();
    blockgridObj.selectBlock(firstBlock);

    setTimeout(() => {
      expect(document.body.querySelector('.block').classList.contains('is-selected')).toBeTruthy();
      expect(document.body.querySelector('.block').getAttribute('aria-selected')).toBeTruthy();
      done();
    }, 1000);
  });

  it('Should update settings', () => {
    blockgridObj.updated({ selectable: false });

    expect(blockgridObj.settings.selectable).toEqual(false);
  });

  it('Should have block', () => {
    expect(document.body.querySelector('.block')).toBeTruthy();
  });

  it('Should destroy blockgrid', (done) => {
    blockgridObj.destroy();
    setTimeout(() => {
      expect($(blockgridEl).data('blockgrid')).toBeFalsy();

      blockgridObj = new Blockgrid(blockgridEl, settings);
      done();
    }, 1000);
  });
});
