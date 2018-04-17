import { version as SOHO_XI_VERSION } from '../../package.json';
import { breakpoints } from './breakpoints';

// jQuery Components
import './debounced-resize.jquery';

/**
 * @class {Environment}
 */
const Environment = {

  browser: {},

  os: {},

  rtl: $('html').attr('dir') === 'rtl',

  /**
   * Builds run-time environment settings
   */
  set() {
    $('html').attr('data-sohoxi-version', SOHO_XI_VERSION);
    this.addBrowserClasses();
    this.addGlobalResize();
  },

  /**
   * Global Classes for browser, version and device as needed.
   */
  addBrowserClasses() {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    const html = $('html');
    let cssClasses = ''; // User-agent string

    if (ua.indexOf('Safari') !== -1 &&
        ua.indexOf('Chrome') === -1 &&
        ua.indexOf('Android') === -1) {
      cssClasses += 'is-safari ';
      this.browser.name = 'safari';
    }

    if (ua.indexOf('Chrome') !== -1) {
      cssClasses += 'is-chrome ';
      this.browser.name = 'chrome';
    }

    if (ua.indexOf('Mac OS X') !== -1) {
      cssClasses += 'is-mac ';
      this.os.name = 'Mac OS X';
    }

    if (ua.indexOf('Firefox') > 0) {
      cssClasses += 'is-firefox ';
      this.browser.name = 'firefox';
    }

    // Class-based detection for IE
    if (ua.match(/Edge\//)) {
      cssClasses += 'ie ie-edge ';
      this.browser.name = 'edge';
    }
    if (ua.match(/Trident/)) {
      cssClasses += 'ie ';
      this.browser.name = 'ie';
    }
    if (navigator.appVersion.indexOf('MSIE 8.0') > -1 ||
      ua.indexOf('MSIE 8.0') > -1 ||
      document.documentMode === 8) {
      cssClasses += 'ie8 ';
      this.browser.version = '8';
    }
    if (navigator.appVersion.indexOf('MSIE 9.0') > -1) {
      cssClasses += 'ie9 ';
      this.browser.version = '9';
    }
    if (navigator.appVersion.indexOf('MSIE 10.0') > -1) {
      cssClasses += 'ie10 ';
      this.browser.version = '10';
    } else if (ua.match(/Trident\/7\./)) {
      cssClasses += 'ie11 ';
      this.browser.version = '11';
    }

    // Class-based detection for iOS
    // /iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/
    if ((/iPhone|iPod|iPad/).test(ua)) {
      cssClasses += 'ios ';
      this.os.name = 'ios';

      const iDevices = ['iPod', 'iPad', 'iPhone'];
      for (let i = 0; i < iDevices.length; i++) {
        if (new RegExp(iDevices[i]).test(ua)) {
          cssClasses += `${iDevices[i].toLowerCase()} `;
          this.device = iDevices[i];
        }
      }
    }

    if ((/Android/.test(ua))) {
      cssClasses += 'android ';
      this.os.name = 'android';
    }

    html.addClass(cssClasses);
  },

  /**
   * Setup a global resize event trigger for controls to listen to
   */
  addGlobalResize() {
    // Global resize event
    $(window).debouncedResize(() => {
      $('body').triggerHandler('resize', [window]);
      breakpoints.compare();
    });

    // Also detect whenenver a load or orientation change occurs
    $(window).on('orientationchange load', () => breakpoints.compare());
  }
};

/**
 *
 */
Environment.pasteEvent = (function getPasteEvent() {
  const el = document.createElement('input');
  const name = 'onpaste';
  el.setAttribute(name, '');
  return ((typeof el[name] === 'function') ? 'paste' : 'input');
}());

/**
 * Automatically set up the environment by virtue of including this script
 */
Environment.set();

export { Environment };
