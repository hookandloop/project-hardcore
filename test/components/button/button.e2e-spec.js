const { browserStackErrorReporter } = requireHelper('browserstack-error-reporter');
const utils = requireHelper('e2e-utils');
const config = requireHelper('e2e-config');
requireHelper('rejection');

const axePageObjects = requireHelper('axe-page-objects');

jasmine.getEnv().addReporter(browserStackErrorReporter);

describe('Button example-index tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/button/example-index');
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  if (!utils.isSafari() && !utils.isIE()) {
    it('Should tab to "Primary Button", and animate on enter', async () => {
      const buttonEl = await element.all(by.css('.btn-primary')).get(3);
      const svgEl = await element.all(by.css('.btn-primary')).get(3).element(by.css('.ripple-effect'));
      await browser.driver
        .wait(protractor.ExpectedConditions.presenceOf(buttonEl), config.waitsFor);
      await element(by.css('body')).sendKeys(protractor.Key.TAB);
      await element(by.css('body')).sendKeys(protractor.Key.TAB);
      await element(by.css('body')).sendKeys(protractor.Key.TAB);
      await buttonEl.sendKeys(protractor.Key.ENTER);
      await browser.driver.wait(protractor.ExpectedConditions.presenceOf(svgEl), config.waitsFor);

      expect(await svgEl.getAttribute('class')).toContain('ripple-effect');
    });

    it('Should click on "Primary Button", and animate on click', async () => {
      const buttonEl = await element.all(by.css('.btn-primary')).get(3);
      const svgEl = await element.all(by.css('.btn-primary')).get(3).element(by.css('.ripple-effect'));
      await browser.driver
        .wait(protractor.ExpectedConditions.presenceOf(buttonEl), config.waitsFor);
      await buttonEl.click();
      await browser.driver.wait(protractor.ExpectedConditions.presenceOf(svgEl), config.waitsFor);

      expect(await svgEl.getAttribute('class')).toContain('ripple-effect');
    });

    it('Should click on "Disabled Primary Button", and not animate', async () => {
      const buttonEl = await element.all(by.css('.btn-primary')).get(2);
      await browser.driver
        .wait(protractor.ExpectedConditions.presenceOf(buttonEl), config.waitsFor);
      await buttonEl.click();
      await browser.driver
        .wait(protractor.ExpectedConditions.presenceOf(buttonEl), config.waitsFor);

      expect(await buttonEl.isElementPresent(by.tagName('svg'))).toBeFalsy();
      expect(await buttonEl.isEnabled()).toBeFalsy();
    });

    it('Should tab to "Secondary Button", and animate on enter', async () => {
      const buttonEl = await element.all(by.css('.btn-secondary')).first();
      const svgEl = await element.all(by.css('.btn-secondary')).first().element(by.css('.ripple-effect'));
      await browser.driver
        .wait(protractor.ExpectedConditions.presenceOf(buttonEl), config.waitsFor);
      await element(by.css('body')).sendKeys(protractor.Key.TAB);
      await element(by.css('body')).sendKeys(protractor.Key.TAB);
      await element(by.css('body')).sendKeys(protractor.Key.TAB);
      await buttonEl.sendKeys(protractor.Key.ENTER);
      await browser.driver.wait(protractor.ExpectedConditions.presenceOf(svgEl), config.waitsFor);

      expect(await svgEl.getAttribute('class')).toContain('ripple-effect');
    });

    it('Should click on "Disabled Secondary Button", and not animate', async () => {
      const buttonEl = await element.all(by.css('.btn-secondary')).get(1);
      await browser.driver
        .wait(protractor.ExpectedConditions.presenceOf(buttonEl), config.waitsFor);
      await buttonEl.click();
      await browser.driver
        .wait(protractor.ExpectedConditions.presenceOf(buttonEl), config.waitsFor);

      expect(await buttonEl.isElementPresent(by.tagName('svg'))).toBeFalsy();
      expect(await buttonEl.isEnabled()).toBeFalsy();
    });

    it('Should click on "Secondary Button", and animate on click', async () => {
      const buttonEl = await element.all(by.css('.btn-secondary')).first();
      const svgEl = await element.all(by.css('.btn-secondary')).first().element(by.css('.ripple-effect'));
      await browser.driver
        .wait(protractor.ExpectedConditions.presenceOf(buttonEl), config.waitsFor);
      await buttonEl.click();

      await browser.driver.wait(protractor.ExpectedConditions.presenceOf(svgEl), config.waitsFor);

      expect(await svgEl.getAttribute('class')).toContain('ripple-effect');
    });

    it('Should tab to "Tertiary Button", and animate on enter', async () => {
      const buttonEl = await element.all(by.css('.btn-tertiary')).first();
      const svgEl = await element.all(by.css('.btn-tertiary')).first().element(by.css('.ripple-effect'));
      await browser.driver
        .wait(protractor.ExpectedConditions.presenceOf(buttonEl), config.waitsFor);
      await element(by.css('body')).sendKeys(protractor.Key.TAB);
      await element(by.css('body')).sendKeys(protractor.Key.TAB);
      await element(by.css('body')).sendKeys(protractor.Key.TAB);
      await buttonEl.sendKeys(protractor.Key.ENTER);
      await browser.driver.wait(protractor.ExpectedConditions.presenceOf(svgEl), config.waitsFor);

      expect(await svgEl.getAttribute('class')).toContain('ripple-effect');
    });

    it('Should click on "Disabled Tertiary Button", and not animate', async () => {
      const buttonEl = await element.all(by.css('.btn-tertiary')).get(1);
      const svgEl = await element.all(by.css('.btn-tertiary')).get(1).element(by.css('.icon'));
      await browser.driver
        .wait(protractor.ExpectedConditions.presenceOf(buttonEl), config.waitsFor);
      await buttonEl.click();
      await browser.driver
        .wait(protractor.ExpectedConditions.presenceOf(buttonEl), config.waitsFor);

      expect(await svgEl.getAttribute('class')).not.toContain('ripple-effect');
      expect(await buttonEl.isElementPresent(by.tagName('svg'))).toBeTruthy();
      expect(await buttonEl.isEnabled()).toBeFalsy();
    });

    it('Should click on "Tertiary Button", and animate on click', async () => {
      const buttonEl = await element.all(by.css('.btn-tertiary')).first();
      const svgEl = await element.all(by.css('.btn-tertiary')).first().element(by.css('.ripple-effect'));
      await browser.driver
        .wait(protractor.ExpectedConditions.presenceOf(buttonEl), config.waitsFor);
      await buttonEl.click();

      await browser.driver.wait(protractor.ExpectedConditions.presenceOf(svgEl), config.waitsFor);

      expect(await svgEl.getAttribute('class')).toContain('ripple-effect');
    });

    it('Should tab to "Icon Button", and animate on enter', async () => {
      const buttonEl = await element.all(by.css('#maincontent .btn-icon')).first();
      const svgEl = await element.all(by.css('#maincontent .btn-icon')).first().element(by.css('.ripple-effect'));
      await browser.driver
        .wait(protractor.ExpectedConditions.presenceOf(buttonEl), config.waitsFor);
      await element(by.css('body')).sendKeys(protractor.Key.TAB);
      await element(by.css('body')).sendKeys(protractor.Key.TAB);
      await element(by.css('body')).sendKeys(protractor.Key.TAB);
      await buttonEl.sendKeys(protractor.Key.ENTER);
      await browser.driver.wait(protractor.ExpectedConditions.presenceOf(svgEl), config.waitsFor);

      expect(await svgEl.getAttribute('class')).toContain('ripple-effect');
    });

    it('Should click on "Disabled Icon Button", and not animate', async () => {
      const buttonEl = await element.all(by.css('#maincontent .btn-icon')).get(1);
      const svgEl = await element.all(by.css('#maincontent .btn-icon')).first().element(by.css('.icon'));
      await browser.driver
        .wait(protractor.ExpectedConditions.presenceOf(buttonEl), config.waitsFor);
      await buttonEl.click();
      await browser.driver
        .wait(protractor.ExpectedConditions.presenceOf(buttonEl), config.waitsFor);

      expect(await svgEl.getAttribute('class')).not.toContain('ripple-effect');
      expect(await buttonEl.isElementPresent(by.tagName('svg'))).toBeTruthy();
      expect(await buttonEl.isEnabled()).toBeFalsy();
    });

    it('Should click on "Icon Button", and animate on click', async () => {
      const buttonEl = await element.all(by.css('#maincontent .btn-icon')).first();
      const svgEl = await element.all(by.css('#maincontent .btn-icon')).first().element(by.css('.ripple-effect'));
      await browser.driver
        .wait(protractor.ExpectedConditions.presenceOf(buttonEl), config.waitsFor);
      await buttonEl.click();

      await browser.driver.wait(protractor.ExpectedConditions.presenceOf(svgEl), config.waitsFor);

      expect(await svgEl.getAttribute('class')).toContain('ripple-effect');
    });
  }
});

describe('Button example-with-icons tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/button/example-with-icons');
  });

  if (!utils.isSafari()) {
    it('Should open menu on return', async () => {
      const buttonEl = await element(by.id('menu-button-alone'));
      await browser.driver
        .wait(protractor.ExpectedConditions.presenceOf(buttonEl), config.waitsFor);
      await buttonEl.sendKeys(protractor.Key.ENTER);

      expect(await buttonEl.getAttribute('class')).toContain('is-open');

      expect(await element(by.css('button#menu-button-alone[aria-haspopup="true"]')).isDisplayed()).toBe(true);
    });
  }

  it('Should open menu on click', async () => {
    const buttonEl = await element(by.id('menu-button-alone'));
    await buttonEl.click();

    expect(await buttonEl.getAttribute('class')).toContain('is-open');
    expect(await element(by.css('button#menu-button-alone[aria-haspopup="true"]')).isDisplayed()).toBe(true);
  });

  if (utils.isChrome() && utils.isCI()) {
    it('Should not visual regress', async () => {
      const buttonEl = await element(by.id('menu-button-alone'));
      await browser.driver
        .wait(protractor.ExpectedConditions.presenceOf(buttonEl), config.waitsFor);
      await browser.driver.sleep(config.waitsFor);

      expect(await browser.protractorImageComparison.checkElement(buttonEl, 'button-init')).toEqual(0);
    });
  }

  if (!utils.isIE()) {
    it('Should be accessible on click with no WCAG 2AA violations', async () => {
      const buttonEl = await element(by.id('menu-button-alone'));
      await browser.driver
        .wait(protractor.ExpectedConditions.presenceOf(buttonEl), config.waitsFor);
      await buttonEl.click();
      await browser.driver.sleep(config.sleep);
      const res = await axePageObjects(browser.params.theme);

      expect(res.violations.length).toEqual(0);
    });
  }
});

describe('Button example-toggle-button tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/button/example-toggle-button');
  });

  it('Should toggle', async () => {
    const buttonEl = await element.all(by.css('.btn-icon.icon-favorite.btn-toggle')).first();
    await browser.driver.wait(protractor.ExpectedConditions.presenceOf(buttonEl), config.waitsFor);
    await buttonEl.click();

    expect(await buttonEl.getAttribute('aria-pressed')).toBe('false');
  });
});

describe('Button example-100-percent tests', () => {
  let windowSize = {};
  beforeEach(async () => {
    await utils.setPage('/components/button/example-100-percent');
    windowSize = await browser.driver.manage().window().getSize();
  });

  afterEach(async () => {
    await browser.driver.manage().window().setSize(windowSize.width, windowSize.height);
    await browser.driver.sleep(config.sleep);
  });

  if (utils.isChrome() && utils.isCI()) {
    it('Should tab onto button, show focus, and not visual regress', async () => {
      const buttonElContainer = await element(by.id('maincontent'));
      await element(by.id('one-hundred')).sendKeys(protractor.Key.TAB);
      await browser.driver.sleep(config.sleep);

      expect(await browser.protractorImageComparison.checkElement(buttonElContainer, 'button-width-focus')).toEqual(0);
    });

    it('Should not visual regress on example-100-percent at 1280px', async () => {
      await browser.driver.manage().window().setSize(1280, 800);
      await browser.driver.sleep(config.sleep);
      const buttonElContainer = await element(by.id('maincontent'));

      expect(await browser.protractorImageComparison.checkElement(buttonElContainer, 'button-width-1280')).toEqual(0);
    });

    it('Should not visual regress on example-100-percent at 768px', async () => {
      await browser.driver.manage().window().setSize(768, 1024);
      await browser.driver.sleep(config.sleep);
      const buttonElContainer = await element(by.id('maincontent'));

      expect(await browser.protractorImageComparison.checkElement(buttonElContainer, 'button-width-768')).toEqual(0);
    });

    it('Should not visual regress on example-100-percent at 500px', async () => {
      await browser.driver.manage().window().setSize(500, 600);
      await browser.driver.sleep(config.sleep);
      const buttonElContainer = await element(by.id('maincontent'));

      expect(await browser.protractorImageComparison.checkElement(buttonElContainer, 'button-width-500')).toEqual(0);
    });

    it('Should not visual regress on example-100-percent at 320px', async () => {
      await browser.driver.manage().window().setSize(320, 480);
      await browser.driver.sleep(config.sleep);
      const buttonElContainer = await element(by.id('maincontent'));

      expect(await browser.protractorImageComparison.checkElement(buttonElContainer, 'button-width-320')).toEqual(0);
    });
  }
});
