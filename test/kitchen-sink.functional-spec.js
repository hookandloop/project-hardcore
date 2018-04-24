const AxeBuilder = require('axe-webdriverjs');
const { browserStackErrorReporter } = require('./helpers/browserstack-error-reporter.js');
require('./helpers/rejection.js');

// Light Theme color contrast is not WCAG 2AA, #fff on #368ac0, focused item on a open dropdown
const axeOptions = {
  rules: [
    {
      id: 'aria-allowed-attr',
      enabled: false
    },
    {
      id: 'aria-required-children',
      enabled: false
    },
    {
      id: 'aria-valid-attr-value',
      enabled: false
    },
    {
      id: 'color-contrast',
      enabled: false
    },
    {
      id: 'region',
      enabled: false
    }
  ]
};

jasmine.getEnv().addReporter(browserStackErrorReporter);

describe('Kitchen-sink tests', () => {
  // Exclude IE11: Async timeout errors
  if (browser.browserName.toLowerCase() !== 'ie') {
    it('Should be accessible on init with no WCAG 2AA violations', async () => {
      await browser.waitForAngularEnabled(false);
      await browser.driver.get('http://localhost:4000/kitchen-sink');

      const res = await AxeBuilder(browser.driver)
        .configure(axeOptions)
        .exclude('header')
        .analyze();

      expect(res.violations.length).toEqual(0);
    });

    it('Should pass CSP', async () => {
      await browser.waitForAngularEnabled(false);
      await browser.driver.get('http://localhost:4000/kitchen-sink');

      let errorLog = null;
      await browser.manage().logs().get('browser').then((browserLog) => {
        errorLog = browserLog;
      });

      const securityErrors = errorLog.filter(err => err.level.name === 'SEVERE' && err.message.indexOf('Security') > -1);

      expect(securityErrors.length).toEqual(0);
    });
  }
});
