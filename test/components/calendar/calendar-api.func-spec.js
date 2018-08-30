import { Calendar } from '../../../src/components/calendar/calendar';
import { Locale } from '../../../src/components/locale/locale';

const calendarHTML = require('../../../app/views/components/calendar/example-index.html');
const svg = require('../../../src/components/icons/svg.html');
const events = require('../../../app/data/events');
const eventTypes = require('../../../app/data/event-types');

let calendarEl;
let svgEl;
let calendarObj;

const settings = {
  eventTypes,
  events
};

describe('Calendar API', () => {
  beforeEach(() => {
    calendarEl = null;
    svgEl = null;
    calendarObj = null;
    document.body.insertAdjacentHTML('afterbegin', svg);
    document.body.insertAdjacentHTML('afterbegin', calendarHTML);
    calendarEl = document.body.querySelector('.calendar');
    svgEl = document.body.querySelector('.svg-icons');

    Locale.addCulture('ar-SA', Soho.Locale.cultures['ar-SA']); //eslint-disable-line
    Locale.addCulture('en-US', Soho.Locale.cultures['en-US']); //eslint-disable-line
    Locale.addCulture('ja-JP', Soho.Locale.cultures['ja-JP']); //eslint-disable-line
    Locale.addCulture('sv-SE', Soho.Locale.cultures['sv-SE']); //eslint-disable-line
    Locale.addCulture('en-GB', Soho.Locale.cultures['en-GB']); //eslint-disable-line
    Locale.addCulture('de-DE', Soho.Locale.cultures['de-DE']); //eslint-disable-line
    Locale.set('en-US');
    Soho.Locale.set('en-US'); //eslint-disable-line

    calendarObj = new Calendar(calendarEl, settings);
  });

  afterEach(() => {
    calendarObj.destroy();
    svgEl.parentNode.removeChild(svgEl);
    calendarEl.parentNode.removeChild(calendarEl);
  });

  it('Should render calendar', () => {
    expect(calendarObj).toEqual(jasmine.any(Object));
    expect(document.body.querySelector('.monthview-table')).toBeTruthy();
    expect(document.body.querySelectorAll('.monthview-table td').length).toEqual(42);
  });

  it('Should render header', () => {
    expect(calendarObj).toEqual(jasmine.any(Object));
    expect(document.body.querySelector('.monthview-header .next')).toBeTruthy();
    expect(document.body.querySelector('.monthview-header .prev')).toBeTruthy();
  });

  it('Should optionaly not render view changer', () => {
    calendarObj.destroy();
    settings.showViewChanger = false;
    calendarObj = new Calendar(calendarEl, settings);

    expect(document.body.querySelector('#calendar-view-changer')).toBeFalsy();
  });

  it('Should be able to destroy', () => {
    calendarObj.destroy();

    expect($(calendarEl).data('calendar')).toBeFalsy();
  });
});
