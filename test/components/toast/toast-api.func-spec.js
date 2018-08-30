import { Toast } from '../../../src/components/toast/toast';

let toastEl;
let toastObj;
let toastMessageTitleEl;
let toastMessageContentEl;

describe('Toast API', () => {
  beforeEach(() => {
    toastEl = document.body;
    toastObj = null;

    const toastTitle = 'Toast Title';
    const toastMessage = 'Toast Message';

    toastObj = new Toast(toastEl, {
      title: toastTitle,
      message: toastMessage,
      timeout: 6000
    });
  });

  afterEach(() => {
    toastEl = null;

    toastObj.destroy();
  });

  it('Should be defined', () => {
    expect(toastObj).toEqual(jasmine.any(Object));
  });

  it('Should visible toast', () => {
    expect(document.body.querySelector('.toast')).toBeTruthy();
  });

  it('Should have title', () => {
    toastMessageTitleEl = document.body.querySelector('.toast-title');

    expect(toastMessageTitleEl.innerText).toEqual('Toast Title');
  });

  it('Should have message', () => {
    toastMessageContentEl = document.body.querySelector('.toast-message');

    expect(toastMessageContentEl.innerText).toEqual('Toast Message');
  });

  it('Should have progress bar', () => {
    expect(document.body.querySelector('.toast-progress')).toBeTruthy();
  });

  it('Should have settings updated', () => {
    const settings = {
      title: 'Toast Title 2',
      message: 'Toast Message 2',
      timeout: 6000
    };

    toastObj.updated(settings);

    expect(toastObj.settings.title).toEqual('Toast Title 2');
  });

  it('Should destroy toast', () => {
    toastObj.destroy();

    expect(document.body.querySelector('.toast')).toBeFalsy();
  });
});
