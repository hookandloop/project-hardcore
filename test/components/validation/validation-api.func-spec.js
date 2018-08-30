import { Validator } from '../../../src/components/validation/validator';

require('../../../src/components/locale/cultures/en-US.js');

const svgHTML = require('../../../src/components/icons/svg.html');
const exampleHTML = require('../../../app/views/components/validation/example-index.html');

let emailEl;
let cardEl;
let validatorAPI;
let svgEl;
const emailID = '#email-address-ok';

describe('Validation API', () => {
  const Locale = window.Soho.Locale;

  beforeEach(() => {
    emailEl = null;
    validatorAPI = null;
    svgEl = null;

    Locale.set('en-US');
    document.body.insertAdjacentHTML('afterbegin', svgHTML);
    document.body.insertAdjacentHTML('afterbegin', exampleHTML);

    svgEl = document.body.querySelector('.svg-icons');
    emailEl = document.body.querySelector(emailID);
    cardEl = document.body.querySelector('#credit-card');

    validatorAPI = new Validator($(emailEl));
    validatorAPI = new Validator($(cardEl));
  });

  afterEach(() => {
    svgEl.parentNode.removeChild(svgEl);
    const formEl = document.body.querySelector('form');
    formEl.parentNode.removeChild(formEl);

    const toastApi = $('body').data('toast');
    if (toastApi) {
      toastApi.destroy();
    }
  });

  it('can be invoked', () => {
    expect(validatorAPI).toEqual(jasmine.any(Object));
  });

  it('can read validation types', () => {
    const emailTypes = validatorAPI.getTypes($(emailEl), { type: 'keydown' });

    expect(emailTypes[0]).toEqual('required');

    const cardTypes = validatorAPI.getTypes($(cardEl), { type: 'keydown' });

    expect(cardTypes[0]).toEqual('required');
  });

  it('can validate with api', (done) => {
    emailEl.value = '';
    const defer = validatorAPI.validate($(emailEl), false, { type: 'keydown' });

    $.when(...defer).then(() => { //eslint-disable-line
      expect(document.body.querySelector('.error-message')).toBeFalsy();
      done();
    }, () => {
      expect(document.body.querySelector('.error-message')).toBeTruthy();
      done();
    });
  });

  it('can get values', () => {
    const value = validatorAPI.value($(emailID));

    expect(value).toEqual('someone@someplace.com');
  });

  it('add / remove messages of different types', () => {
    validatorAPI.addMessage($(emailID), { id: 'error', message: 'This is the message', type: 'error' }, true, false);

    expect(document.body.querySelector('.error-message')).toBeTruthy();

    validatorAPI.removeMessage($(emailID), { id: 'error', type: 'error' });

    expect(document.body.querySelector('.error-message')).toBeFalsy();

    validatorAPI.addMessage($(emailID), { id: 'alert', message: 'This is the message', type: 'alert' }, true, false);

    expect(document.body.querySelector('.alert-message')).toBeTruthy();

    validatorAPI.removeMessage($(emailID), { id: 'alert', type: 'alert' });

    expect(document.body.querySelector('.alert-message')).toBeFalsy();

    validatorAPI.addMessage($(emailID), { id: 'confirm', message: 'This is the message', type: 'confirm' }, true, false);

    expect(document.body.querySelector('.confirm-message')).toBeTruthy();

    validatorAPI.removeMessage($(emailID), { id: 'confirm', type: 'confirm' });

    expect(document.body.querySelector('.confirm-message')).toBeFalsy();

    validatorAPI.addMessage($(emailID), { id: 'info', message: 'This is the message', type: 'info' }, true, false);

    expect(document.body.querySelector('.info-message')).toBeTruthy();

    validatorAPI.removeMessage($(emailID), { id: 'info', type: 'info' });

    expect(document.body.querySelector('.info-message')).toBeFalsy();

    validatorAPI.addMessage($(emailID), { id: 'icon', message: 'This is the message', type: 'icon', icon: 'mail' }, true, false);

    expect(document.body.querySelector('.custom-icon-message')).toBeTruthy();

    validatorAPI.removeMessage($(emailID), { id: 'icon', type: 'icon' });

    expect(document.body.querySelector('.custom-icon-message')).toBeFalsy();
  });

  it('remove error type after icon type is added', () => {
    validatorAPI.addMessage($(emailID), { id: 'icon', message: 'This is the message', type: 'icon', icon: 'mail' }, true, false);
    validatorAPI.addMessage($(emailID), { id: 'error', message: 'This is the message', type: 'error' }, true, false);

    expect(document.body.querySelector('.custom-icon-message')).toBeTruthy();
    expect(document.body.querySelector('.error-message')).toBeTruthy();

    validatorAPI.removeMessage($(emailID), { id: 'error', type: 'error' });

    expect(document.body.querySelector('.error-message')).toBeFalsy();

    validatorAPI.removeMessage($(emailID), { id: 'icon', type: 'icon' });

    expect(document.body.querySelector('.custom-icon-message')).toBeFalsy();
    expect(document.body.querySelector('.error-message')).toBeFalsy();
  });

  it('fire valid and error events (once)', () => {
    const spyEvent = spyOnEvent(emailEl, 'error');
    const spyEvent2 = spyOnEvent(emailEl, 'valid');

    validatorAPI.addMessage($(emailEl), { id: 'error', message: 'This is the message', type: 'error' }, true, false);

    expect(spyEvent).toHaveBeenTriggered();

    validatorAPI.removeMessage($(emailID), { id: 'error', type: 'error' });

    expect(spyEvent2).toHaveBeenTriggered();
  });

  it('be able to call resetForm', (done) => {
    emailEl.value = '';
    const defer = validatorAPI.validate($(emailEl), false, { type: 'keydown' });

    $.when(...defer).then(() => { //eslint-disable-line
      expect(document.body.querySelector('.error-message')).toBeFalsy();
      done();
    }, () => {
      expect(document.body.querySelector('.error-message')).toBeTruthy();
      validatorAPI.resetForm($('form'));

      expect(document.body.querySelector('.error-message')).toBeFalsy();
      done();
    });
  });

  it('be able to call addError / removeError', (done) => {
    $('#email-address-ok').addError({
      inline: false,
      message: '<span>I have an Error.</span>',
      showTooltip: true
    })
      .addError({
        inline: false,
        message: '<span>I have another Error.</span>',
        showTooltip: true
      });

    setTimeout(() => {
      const tooltip = document.body.querySelector('#validation-tooltip');

      expect(tooltip).toBeVisible();
      expect(tooltip.innerHTML).toContain('I have another Error');
      expect(tooltip.innerHTML).toContain('I have an Error');
      $('#email-address-ok').removeError();

      expect(tooltip).toHaveClass('is-hidden');
      done();
    }, 100);
  });

  it('be able to call getMessage', () => {
    validatorAPI.addMessage($(emailID), { id: 'error', message: 'This is the message', type: 'error' }, true, false);

    expect($(emailID).getMessage()).toEqual('This is the message');

    validatorAPI.addMessage($(emailID), { id: 'error2', message: 'This is another message', type: 'error' }, true, false);

    expect($(emailID).getMessage()).toEqual('• This is the message• This is another message');
  });

  it('be able to call getMessages', () => {
    validatorAPI.addMessage($(emailID), { id: 'error', message: 'This is the message', type: 'error' }, true, false);

    expect($(emailID).getMessages()[0].message).toEqual('This is the message');

    validatorAPI.addMessage($(emailID), { id: 'error2', message: 'This is another message', type: 'error' }, true, false);

    expect($(emailID).getMessages()[1].message).toEqual('This is another message');
  });
});
