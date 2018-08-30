import { Lookup } from '../../../src/components/lookup/lookup';

const lookupHTML = require('../../../app/views/components/lookup/example-index.html');
const svg = require('../../../src/components/icons/svg.html');

let lookupEl;
let svgEl;
let lookupObj;

describe('Lookup API', () => {
  beforeEach(() => {
    lookupEl = null;
    svgEl = null;
    lookupObj = null;
    document.body.insertAdjacentHTML('afterbegin', svg);
    document.body.insertAdjacentHTML('afterbegin', lookupHTML);
    lookupEl = document.body.querySelector('.lookup');
    svgEl = document.body.querySelector('.svg-icons');
    lookupObj = new Lookup(lookupEl);
  });

  afterEach(() => {
    lookupObj.destroy();
    svgEl.parentNode.removeChild(svgEl);
  });

  it('Should be defined', () => {
    expect(lookupObj).toEqual(jasmine.any(Object));
  });

  it('Should be visible', () => {
    expect(document.body.querySelector('.lookup')).toBeTruthy();
  });

  it('Should be able to disable it', () => {
    lookupObj.disable();

    expect(lookupEl.disabled).toBeTruthy();
    expect(lookupObj.isDisabled()).toBeTruthy();
  });

  it('Should be able to enable it', () => {
    lookupObj.enable();

    expect(lookupEl.readOnly).toBeFalsy();
    expect(lookupObj.isReadonly()).toBeFalsy();
    expect(lookupEl.disabled).toBeFalsy();
    expect(lookupObj.isDisabled()).toBeFalsy();
  });

  it('Should be able to make it readonly', () => {
    lookupObj.readonly();

    expect(lookupEl.readOnly).toBeTruthy();
    expect(lookupObj.isReadonly()).toBeTruthy();
  });

  it('Should be able to destroy it', () => {
    lookupObj.destroy();

    expect(document.body.querySelector('.trigger')).toBeFalsy();
  });
});
