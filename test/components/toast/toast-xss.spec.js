import { Toast } from '../../../src/components/toast/toast';

let toastEl;
let toastAPI;
let toastMessageTitleEl;
let toastMessageContentEl;

describe('Toast XSS Prevention', () => {
  beforeEach(() => {
    toastEl = document.body;
  });

  afterEach(() => {
    toastEl = null;

    toastAPI.destroy();
    toastAPI = null;

    toastMessageTitleEl = null;
    toastMessageContentEl = null;
  });

  it('Can strip HTML tags out of user-set content', () => {
    // NOTE: See SOHO-7818
    const dangerousToastTitle = 'Application Message <script>alert("GOTCHA!");</script>';
    const dangerousToastMsg = 'This is a potentially dangerous Toast message. <script>alert("GOTCHA!");</script>';

    toastAPI = new Toast(toastEl, {
      title: dangerousToastTitle,
      message: dangerousToastMsg,
      timeout: 200000
    });

    toastMessageTitleEl = document.querySelector('#toast-container .toast-title'); // should only be one
    toastMessageContentEl = document.querySelector('#toast-container .toast-message'); // should only be one

    expect(toastMessageTitleEl.innerText).toEqual('Application Message alert("GOTCHA!");');
    expect(toastMessageContentEl.innerText).toEqual('This is a potentially dangerous Toast message. alert("GOTCHA!");');
  });
});
