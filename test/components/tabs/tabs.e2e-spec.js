const { browserStackErrorReporter } = requireHelper('browserstack-error-reporter');
const utils = requireHelper('e2e-utils');
const config = requireHelper('e2e-config');
requireHelper('rejection');
const axePageObjects = requireHelper('axe-page-objects');

jasmine.getEnv().addReporter(browserStackErrorReporter);

const clickTabTest = async (index) => {
  const tabElTrigger = await element.all(by.className('tab')).get(index);
  await tabElTrigger.click();
  await browser.driver
    .wait(protractor.ExpectedConditions.visibilityOf(element.all(by.className('tab-panel')).get(index)), config.waitsFor);

  expect(await element.all(by.className('tab-panel')).get(index).getAttribute('class')).toContain('can-show');
  expect(await element.all(by.className('tab')).get(index).getAttribute('class')).toContain('is-selected');
};

describe('Tabs click example-index tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/tabs/example-index');
    const tabsEl = await element(by.id('tabs-normal'));
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(tabsEl), config.waitsFor);
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  if (utils.isChrome() && utils.isCI()) {
    it('Should not visual regress on example-index', async () => {
      const tabsEl = await element(by.id('tabs-normal'));
      await browser.driver
        .wait(protractor.ExpectedConditions.presenceOf(tabsEl), config.waitsFor);
      await browser.driver.sleep(config.waitsFor);

      expect(await browser.protractorImageComparison.checkElement(tabsEl, 'tabs-init')).toEqual(0);
    });
  }

  if (!utils.isIE()) {
    xit('Should be accessible on init with no WCAG 2AA violations on example-index', async () => {
      const res = await axePageObjects(browser.params.theme);

      expect(res.violations.length).toEqual(0);
    });
  }

  it('Should open 5th tab, on click', async () => {
    await clickTabTest('4');
  });

  it('Should open 5th tab, 3rd, then 2nd tab, on click screen width of 500px', async () => {
    const windowSize = await browser.driver.manage().window().getSize();
    await browser.driver.manage().window().setSize(500, 600);
    await browser.driver.sleep(config.sleep);
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(element(by.id('tabs-normal'))), config.waitsFor);
    await clickTabTest('4');
    await clickTabTest('2');
    await clickTabTest('1');
    await browser.driver.manage().window().setSize(windowSize.width, windowSize.height);
  });

  it('Should open 5th tab, open menu tab-popupmenu, and list correct tab on screen width of 500px', async () => {
    const windowSize = await browser.driver.manage().window().getSize();
    await browser.driver.manage().window().setSize(500, 600);
    await browser.driver.sleep(config.sleep);
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(element(by.id('tabs-normal'))), config.waitsFor);
    await clickTabTest('4');
    await element(by.css('.tab-more .icon-more')).click();
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(element(by.css('#tab-container-popupmenu.is-open'))), config.waitsFor);

    expect(await element.all(by.css('#tab-container-popupmenu li')).get(4).getAttribute('class')).toContain('is-checked');
    await browser.driver.manage().window().setSize(windowSize.width, windowSize.height);
  });

  it('Should open 5th tab, and select 1st tab on tab-popupmenu on screen width of 500px', async () => {
    const windowSize = await browser.driver.manage().window().getSize();
    await browser.driver.manage().window().setSize(500, 600);
    await browser.driver.sleep(config.sleep);
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(element(by.id('tabs-normal'))), config.waitsFor);
    await clickTabTest('4');
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(element(by.className('is-focused')), config.waitsFor));
    await element(by.className('tab-more')).click();
    await browser.driver
      .wait(protractor.ExpectedConditions.visibilityOf(element(by.css('.tab-more.is-open'))), config.waitsFor);

    expect(await element.all(by.css('#tab-container-popupmenu li')).get(4).getAttribute('class')).toContain('is-checked');
    await element.all(by.css('#tab-container-popupmenu li')).get(1).click();

    expect(await element(by.css('.tab-list .is-selected')).getText()).toContain('Opportunities');
    await browser.driver.manage().window().setSize(windowSize.width, windowSize.height);
  });

  it('Should open 5th, 3rd, then 2nd tab, on click', async () => {
    await clickTabTest('4');
    await clickTabTest('2');
    await clickTabTest('1');
  });
});

describe('Tabs click example-counts tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/tabs/example-counts');
    const tabsEl = await element(by.id('tabs-counts'));
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(tabsEl), config.waitsFor);
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  if (utils.isChrome() && utils.isCI()) {
    it('Should not visual regress on example-counts', async () => {
      const tabsEl = await element(by.id('tabs-counts'));
      await browser.driver
        .wait(protractor.ExpectedConditions.presenceOf(tabsEl), config.waitsFor);
      await browser.driver.sleep(config.waitsFor);

      expect(await browser.protractorImageComparison.checkElement(tabsEl, 'tabs-counts')).toEqual(0);
    });
  }

  if (!utils.isIE()) {
    xit('Should be accessible on init with no WCAG 2AA violations on example-index', async () => {
      const res = await axePageObjects(browser.params.theme);

      expect(res.violations.length).toEqual(0);
    });
  }

  it('Should open 5th tab, on click on count', async () => {
    await clickTabTest('4');
  });

  it('Should open 5th, 3rd, then 2nd tab, on click on count', async () => {
    await clickTabTest('4');
    await clickTabTest('2');
    await clickTabTest('1');
  });

  it('Should open 4th tab, 3rd, then 2nd tab, on click screen width of 500px on count', async () => {
    const windowSize = await browser.driver.manage().window().getSize();
    await browser.driver.manage().window().setSize(500, 600);
    await browser.driver.sleep(config.sleep);
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(element(by.id('tabs-counts'))), config.waitsFor);
    await clickTabTest('3');
    await clickTabTest('2');
    await clickTabTest('1');
    await browser.driver.manage().window().setSize(windowSize.width, windowSize.height);
  });
});

describe('Tabs keyboard example-index tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/tabs/example-index');
    const tabsEl = await element(by.id('tabs-normal'));
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(tabsEl), config.waitsFor);

    const selectedTab = await element(by.css('.tab.is-selected > a'));
    await selectedTab.click();
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  if (utils.isChrome()) {
    it('Should open 5th tab, on arrow right', async () => {
      await browser.driver.actions().sendKeys(protractor.Key.ARROW_RIGHT).perform();
      await browser.driver
        .wait(protractor.ExpectedConditions.presenceOf(await element(by.className('is-focused')), config.waitsFor));
      await browser.driver.actions().sendKeys(protractor.Key.ARROW_RIGHT).perform();
      await browser.driver
        .wait(protractor.ExpectedConditions.presenceOf(await element(by.className('is-focused')), config.waitsFor));
      await browser.driver.actions().sendKeys(protractor.Key.ENTER).perform();
      await browser.driver
        .wait(protractor.ExpectedConditions.visibilityOf(await element(by.css('#tabs-normal-notes.is-visible'))), config.waitsFor);

      expect(await element(by.id('tabs-normal-notes')).getAttribute('class')).toContain('can-show');
      expect(await element.all(by.className('tab')).get(4).getAttribute('class')).toContain('is-selected');
    });

    it('Should open 5th tab, on arrow down', async () => {
      await browser.driver.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();
      await browser.driver
        .wait(protractor.ExpectedConditions.presenceOf(element(by.className('is-focused')), config.waitsFor));
      await browser.driver.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();
      await browser.driver
        .wait(protractor.ExpectedConditions.presenceOf(element(by.className('is-focused')), config.waitsFor));
      await browser.driver.actions().sendKeys(protractor.Key.ENTER).perform();
      await browser.driver
        .wait(protractor.ExpectedConditions.visibilityOf(element(by.css('#tabs-normal-notes.is-visible'))), config.waitsFor);

      expect(await element(by.id('tabs-normal-notes')).getAttribute('class')).toContain('can-show');
      expect(await element.all(by.className('tab')).get(4).getAttribute('class')).toContain('is-selected');
    });

    it('Should open 1st tab, on arrow up', async () => {
      await browser.driver.actions().sendKeys(protractor.Key.ARROW_UP).perform();
      await browser.driver
        .wait(protractor.ExpectedConditions.presenceOf(element(by.className('is-focused')), config.waitsFor));
      await browser.driver.actions().sendKeys(protractor.Key.ARROW_UP).perform();
      await browser.driver
        .wait(protractor.ExpectedConditions.presenceOf(element(by.className('is-focused')), config.waitsFor));
      await browser.driver.actions().sendKeys(protractor.Key.ENTER).perform();
      await browser.driver
        .wait(protractor.ExpectedConditions.visibilityOf(element(by.css('#tabs-normal-contracts.is-visible'))), config.waitsFor);

      expect(await element(by.id('tabs-normal-contracts')).getAttribute('class')).toContain('can-show');
      expect(await element.all(by.className('tab')).get(0).getAttribute('class')).toContain('is-selected');
    });

    it('Should open 1st tab, on arrow left', async () => {
      await browser.driver.actions().sendKeys(protractor.Key.ARROW_LEFT).perform();
      await browser.driver
        .wait(protractor.ExpectedConditions.presenceOf(element(by.className('is-focused')), config.waitsFor));
      await browser.driver.actions().sendKeys(protractor.Key.ARROW_LEFT).perform();
      await browser.driver
        .wait(protractor.ExpectedConditions.presenceOf(element(by.className('is-focused')), config.waitsFor));
      await browser.driver.actions().sendKeys(protractor.Key.ENTER).perform();
      await browser.driver
        .wait(protractor.ExpectedConditions.visibilityOf(element(by.css('#tabs-normal-contracts.is-visible'))), config.waitsFor);

      expect(await element(by.id('tabs-normal-contracts')).getAttribute('class')).toContain('can-show');
      expect(await element.all(by.className('tab')).get(0).getAttribute('class')).toContain('is-selected');
    });

    it('Should arrow to 1st tab, open menu tab-popupmenu, and list correct tab on screen width of 500px', async () => {
      const windowSize = await browser.driver.manage().window().getSize();
      await browser.driver.manage().window().setSize(500, 600);
      await browser.driver.sleep(config.sleep);
      await browser.driver
        .wait(protractor.ExpectedConditions.presenceOf(element(by.className('is-focused')), config.waitsFor));
      await browser.driver.actions().sendKeys(protractor.Key.ARROW_LEFT).perform();
      await browser.driver
        .wait(protractor.ExpectedConditions.presenceOf(element(by.className('is-focused')), config.waitsFor));
      await browser.driver.actions().sendKeys(protractor.Key.ARROW_LEFT).perform();
      await browser.driver
        .wait(protractor.ExpectedConditions.presenceOf(element(by.className('is-focused')), config.waitsFor));
      await browser.driver.actions().sendKeys(protractor.Key.ENTER).perform();
      await browser.driver
        .wait(protractor.ExpectedConditions.visibilityOf(element(by.css('#tabs-normal-contracts.is-visible'))), config.waitsFor);
      await browser.driver.sleep(config.sleep);
      await browser.driver.actions().sendKeys(protractor.Key.ARROW_LEFT).perform();
      await browser.driver
        .wait(protractor.ExpectedConditions.presenceOf(element(by.css('#tab-container-popupmenu'))), config.waitsFor);

      expect(await element.all(by.css('#tab-container-popupmenu li')).get(0).getAttribute('class')).toContain('is-checked');
      await browser.driver.manage().window().setSize(windowSize.width, windowSize.height);
    });
  }
});

describe('Tabs click example-add-tab button tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/tabs/example-add-tab-button');
    const tabsEl = await element(by.id('tab1'));
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(tabsEl), config.waitsFor);
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  if (utils.isChrome() && utils.isCI()) {
    it('Should not visual regress on example-add-tab-button', async () => {  //eslint-disable-line
      const tabsEl = await element(by.id('add-capable-tabs'));
      await browser.driver
        .wait(protractor.ExpectedConditions.presenceOf(tabsEl), config.waitsFor);
      await browser.driver.sleep(config.waitsFor);

      expect(await browser.protractorImageComparison.checkElement(tabsEl, 'tabs-add-tab')).toEqual(0);
    });
  }

  if (!utils.isIE()) {
    xit('Should be accessible on init with no WCAG 2AA violations on example-add-tab-button', async () => {
      const res = await axePageObjects(browser.params.theme);

      expect(res.violations.length).toEqual(0);
    });
  }

  it('Should add two tabs, on click, then click', async () => {
    await clickTabTest('1');
    const addTabEl = await element(by.className('add-tab-button'));
    await addTabEl.click();
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(element.all(by.className('tab-panel')).get(3)), config.waitsFor);

    expect(await element.all(by.className('tab-panel')).get(3).getAttribute('id')).toContain('new-tab-0');
    expect(await element.all(by.className('tab')).get(3).getAttribute('class')).toContain('dismissible');

    await addTabEl.click();
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(element.all(by.className('tab-panel')).get(4)), config.waitsFor);

    expect(await element.all(by.className('tab-panel')).get(4).getAttribute('id')).toContain('new-tab-1');
    expect(await element.all(by.className('tab')).get(4).getAttribute('class')).toContain('dismissible');
  });

  it('Should add two tabs, on click, then click, submenu should appear with correct selection at 500px', async () => {
    const windowSize = await browser.driver.manage().window().getSize();
    await browser.driver.manage().window().setSize(500, 600);
    await browser.driver.sleep(config.sleep);
    await clickTabTest('1');
    const addTabEl = await element(by.className('add-tab-button'));
    await addTabEl.click();
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(element.all(by.className('tab-panel')).get(3)), config.waitsFor);

    expect(await element.all(by.className('tab-panel')).get(3).getAttribute('id')).toContain('new-tab-0');
    expect(await element.all(by.className('tab')).get(3).getAttribute('class')).toContain('dismissible');

    await addTabEl.click();
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(element.all(by.className('tab-panel')).get(4)), config.waitsFor);

    expect(await element.all(by.className('tab-panel')).get(4).getAttribute('id')).toContain('new-tab-1');
    expect(await element.all(by.className('tab')).get(4).getAttribute('class')).toContain('dismissible');

    await element(by.css('.tab-more')).click();
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(element(by.css('#tab-container-popupmenu.is-open'))), config.waitsFor);
    await clickTabTest('2');
    await element(by.css('.tab-more')).click();

    expect(await element.all(by.css('#tab-container-popupmenu li')).get(2).getAttribute('class')).toContain('is-checked');
    await browser.driver.manage().window().setSize(windowSize.width, windowSize.height);
  });

  it('Should add two tabs, on click, submenu should select correct tab at 500px', async () => {
    const windowSize = await browser.driver.manage().window().getSize();
    await browser.driver.manage().window().setSize(500, 600);
    await browser.driver.sleep(config.sleep);
    await clickTabTest('1');
    const addTabEl = await element(by.className('add-tab-button'));
    await addTabEl.click();
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(element.all(by.className('tab-panel')).get(3)), config.waitsFor);

    expect(await element.all(by.className('tab-panel')).get(3).getAttribute('id')).toContain('new-tab-0');
    expect(await element.all(by.className('tab')).get(3).getAttribute('class')).toContain('dismissible');

    await addTabEl.click();
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(element.all(by.className('tab-panel')).get(4)), config.waitsFor);

    expect(await element.all(by.className('tab-panel')).get(4).getAttribute('id')).toContain('new-tab-1');
    expect(await element.all(by.className('tab')).get(4).getAttribute('class')).toContain('dismissible');

    await element(by.css('.tab-more')).click();
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(element(by.css('#tab-container-popupmenu.is-open'))), config.waitsFor);
    await element.all(by.css('#tab-container-popupmenu li')).get(4).click();

    expect(await element.all(by.className('tab')).get(4).getAttribute('class')).toContain('is-selected');
    await browser.driver.manage().window().setSize(windowSize.width, windowSize.height);
  });
});

describe('Tabs click example-dropdown-tabs tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/tabs/example-dropdown-tabs');
    const tabsContainerEl = await element(by.className('tab-list-container'));
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(tabsContainerEl), config.waitsFor);
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  if (utils.isChrome() && utils.isCI()) {
    it('Should not visual regress on example-dropdown-tabs', async () => {
      const tabsEl = await element(by.id('tabs-dropdown'));
      await browser.driver
        .wait(protractor.ExpectedConditions.presenceOf(tabsEl), config.waitsFor);
      await browser.driver.sleep(config.waitsFor);

      expect(await browser.protractorImageComparison.checkElement(tabsEl, 'tabs-dropdown')).toEqual(0);
    });
  }

  it('Should open dropdown tab', async () => {
    await element.all(by.className('tab')).get(1).click();

    expect(await element.all(by.className('tab')).get(1).getAttribute('class')).toContain('is-open');
  });

  it('Should select dropdown tab on click', async () => {
    await element.all(by.className('tab')).get(1).click();
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(element(by.css('.is-open'))), config.waitsFor);
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(element(by.css('.dropdown-tab'))), config.waitsFor);
    await element.all(by.css('.dropdown-tab li')).get(1).click();

    expect(await element(by.id('tabs-dropdown-paper-plates')).getAttribute('class')).toContain('can-show');
    expect(await element(by.id('tabs-dropdown-paper-plates')).getAttribute('class')).toContain('tab-panel');
    expect(await element(by.id('tabs-dropdown-paper-plates')).getAttribute('class')).toContain('is-visible');
  });
});

describe('Tabs click example-url-hash-change tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/tabs/example-url-hash-change');
    const tabsContainerEl = await element(by.id('tabs'));
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(tabsContainerEl), config.waitsFor);
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  it('Should correctly updated url on tab click', async () => {
    await element.all(by.className('tab')).get(1).click();
    await browser.driver
      .wait(protractor.ExpectedConditions.urlContains('tab-number-two'), config.waitsFor);

    expect(await element.all(by.className('tab')).get(1).getAttribute('class')).toContain('is-selected');

    await element.all(by.className('tab')).get(3).click();
    await browser.driver
      .wait(protractor.ExpectedConditions.urlContains('tab-number-four'), config.waitsFor);

    expect(await element.all(by.className('tab')).get(3).getAttribute('class')).toContain('is-selected');
  });
});

describe('Tabs ajax as source tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/tabs/test-ajax-source-as-string');
    const tabsContainerEl = await element(by.id('ajaxified-tabs'));
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(tabsContainerEl), config.waitsFor);
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  it('Should be able to activate tabs', async () => {
    expect(await element(by.id('tab-one')).getAttribute('innerHTML')).not.toBe('');

    await element.all(by.className('tab')).get(2).click();
    await browser.driver
      .wait(protractor.ExpectedConditions.visibilityOf(element(by.css('#tab-three.is-visible'))), config.waitsFor);

    expect(await element(by.id('tab-three')).getAttribute('innerHTML')).not.toBe('');
  });
});

describe('Tabs ajax as href tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/tabs/test-ajax-source-as-tab-href');
    const tabsContainerEl = await element(by.id('ajaxified-tabs-tab-1'));
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(tabsContainerEl), config.waitsFor);
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  xit('Should be able to activate href tabs', async () => {
    expect(await element(by.id('ajaxified-tabs-tab-1')).getAttribute('innerHTML')).not.toBe('');

    await element.all(by.id('example-tab-two')).click();
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(element(by.css('#ajaxified-tabs-tab-2.is-visible'))), config.waitsFor);

    expect(await element(by.id('ajaxified-tabs-tab-2')).getAttribute('innerHTML')).not.toBe('');
  });
});

describe('Tabs click example-activated-event tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/tabs/example-activated-event');
    const tabsContainerEl = await element(by.id('tabs'));
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(tabsContainerEl), config.waitsFor);
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  it('Should be able to call activate and beforeActivate in tabs', async () => { //eslint-disable-line
    const opportunitiesEl = await element.all(by.css('.tab-list li')).get(2);

    await browser.actions().mouseMove(opportunitiesEl).perform();
    await browser.actions().click(opportunitiesEl).perform();
    await opportunitiesEl.click();

    const beforeActivateEl = await element.all(by.css('.toast-title')).get(0);
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(beforeActivateEl), config.waitsFor);

    expect(await beforeActivateEl.getText()).toContain('beforeActivate');

    const activateEl = await element.all(by.css('.toast-title')).get(1);
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(activateEl), config.waitsFor);

    expect(await activateEl.getText()).toContain('activated');
  });
});
