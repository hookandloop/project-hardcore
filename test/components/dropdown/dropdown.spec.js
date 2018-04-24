import { Dropdown } from '../../../src/components/dropdown/dropdown';

const dropdownHTML = require('../../../app/views/components/dropdown/example-index.html');
const svg = require('../../../app/views/components/icons/svg.html');

let dropdownEl;
let svgEl;
let dropdownObj;

describe('Dropdown API', () => {
  beforeEach(() => {
    dropdownEl = null;
    svgEl = null;
    dropdownObj = null;
    document.body.insertAdjacentHTML('afterbegin', svg);
    document.body.insertAdjacentHTML('afterbegin', dropdownHTML);
    dropdownEl = document.body.querySelector('.dropdown');
    svgEl = document.body.querySelector('.svg-icons');
    dropdownEl.classList.add('no-init');
    dropdownObj = new Dropdown(dropdownEl);
  });

  afterEach(() => {
    dropdownObj.destroy();
    dropdownEl.parentNode.removeChild(dropdownEl);
    svgEl.parentNode.removeChild(svgEl);
  });

  it('Should be defined on jQuery object', () => {
    expect(dropdownObj).toEqual(jasmine.any(Object));
  });

  it('Should open dropdown', () => {
    dropdownObj.open();

    expect(dropdownObj.isOpen()).toBeTruthy();
    expect(document.body.querySelector('.dropdown.is-open')).toBeTruthy();
  });

  it('Should activate dropdown', () => {
    dropdownObj.activate();

    expect(dropdownObj.isOpen()).toBeFalsy();
    expect(document.body.querySelector('.dropdown.is-open')).toBeFalsy();
  });

  it('Should destroy dropdown', () => {
    dropdownObj.destroy();

    expect(dropdownObj.isOpen()).toBeFalsy();
    expect(document.body.querySelector('.dropdown.is-open')).toBeFalsy();
  });

  it('Should disable dropdown', () => {
    dropdownObj.disable();

    expect(document.body.querySelector('.dropdown.is-disabled')).toBeTruthy();
    expect(dropdownObj.isDisabled()).toBeTruthy();
  });

  it('Should enable dropdown', () => {
    dropdownObj.enable();

    expect(document.body.querySelector('.dropdown.is-disabled')).toBeFalsy();
    expect(dropdownObj.isDisabled()).toBeFalsy();
  });

  it('Should render dropdown readonly', () => {
    dropdownObj.readonly();

    expect(document.body.querySelector('.dropdown.is-readonly')).toBeTruthy();
    expect(dropdownObj.isDisabled()).toBeFalsy();
  });
});
