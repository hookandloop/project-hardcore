/* eslint-disable no-unused-vars */
const { browserStackErrorReporter } = requireHelper('browserstack-error-reporter');
const config = requireHelper('e2e-config');
const utils = requireHelper('e2e-utils');
requireHelper('rejection');

jasmine.getEnv().addReporter(browserStackErrorReporter);

const triggerId = 'action-sheet-trigger';
const popupmenuId = 'my-actions-popupmenu';
const containerId = 'ids-actionsheet-root';

describe('ActionSheet example-index tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/actionsheet/example-index?layout=nofrills');
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  it('should display a Popupmenu if above the correct breakpoint', async () => {
    // By default, the test browser's viewport is big enough to trigger a Popupmenu
    const triggerEl = await element(by.id(triggerId)).click();
    const openSelector = `#${triggerId}.is-open`;
    await browser.driver
      .wait(protractor.ExpectedConditions.visibilityOf(await element(by.css(openSelector))), config.waitsFor);

    expect(await element(by.id(triggerId)).getAttribute('class')).toContain('is-open');
  });

  it('should display an Action Sheet if below the correct breakpoint', async () => {
    // Make browser viewport smaller to enable the Action Sheet
    const windowSize = await browser.driver.manage().window().getSize();
    await browser.driver.manage().window().setSize(500, 600);
    await browser.driver.sleep(config.sleep);

    const triggerEl = await element(by.id(triggerId)).click();
    await browser.driver
      .wait(protractor.ExpectedConditions.visibilityOf(await element(by.id(containerId))), config.waitsFor);

    expect(await element(by.id(containerId)).getAttribute('class')).toContain('engaged');

    // Reset browser viewport size
    await browser.driver.manage().window().setSize(windowSize.width, windowSize.height);
    await browser.driver.sleep(config.sleep);
  });

  it('should cancel an Action Sheet when pressing the Escape key', async () => {
    // Make browser viewport smaller to enable the Action Sheet
    const windowSize = await browser.driver.manage().window().getSize();
    await browser.driver.manage().window().setSize(500, 600);
    await browser.driver.sleep(config.sleep);

    const triggerEl = await element(by.id(triggerId)).click();
    await browser.driver
      .wait(protractor.ExpectedConditions.visibilityOf(await element(by.id(containerId))), config.waitsFor);

    // Action Sheet should be displayed
    expect(await element(by.id(containerId)).getAttribute('class')).toContain('engaged');

    // Press the ESCAPE key to close the Action Sheet
    await browser.driver.actions().sendKeys(protractor.Key.ESCAPE).perform();
    await browser.driver
      .wait(protractor.ExpectedConditions.invisibilityOf(await element(by.id('containerId'))), config.waitsFor);

    // Action Sheet should be hidden
    expect(await element(by.id(containerId)).getAttribute('class')).not.toContain('engaged');

    // Reset browser viewport size
    await browser.driver.manage().window().setSize(windowSize.width, windowSize.height);
    await browser.driver.sleep(config.sleep);
  });

  it('should cancel an Action Sheet when clicking the "cancel" button', async () => {
    // Make browser viewport smaller to enable the Action Sheet
    const windowSize = await browser.driver.manage().window().getSize();
    await browser.driver.manage().window().setSize(500, 600);
    await browser.driver.sleep(config.sleep);

    // Click trigger and wait for animation to complete
    const triggerEl = await element(by.id(triggerId)).click();
    await browser.driver.sleep(config.sleep);

    // Click the "cancel" button
    await element(by.css('.btn-cancel')).click();
    await browser.driver
      .wait(protractor.ExpectedConditions.invisibilityOf(await element(by.id('containerId'))), config.waitsFor);

    // Action Sheet should be hidden
    expect(await element(by.id(containerId)).getAttribute('class')).not.toContain('engaged');

    // Reset browser viewport size
    await browser.driver.manage().window().setSize(windowSize.width, windowSize.height);
    await browser.driver.sleep(config.sleep);
  });
});

describe('ActionSheet example-breakpoints tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/actionsheet/example-breakpoints?layout=nofrills');
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  it('can open at different breakpoints', async () => {
    // By default, the test browser's viewport is big enough to trigger a Popupmenu
    const triggerEl = await element(by.id(triggerId)).click();
    const openSelector = `#${triggerId}.is-open`;
    await browser.driver
      .wait(protractor.ExpectedConditions.visibilityOf(await element(by.css(openSelector))), config.waitsFor);

    expect(await element(by.id(triggerId)).getAttribute('class')).toContain('is-open');

    // Press the ESCAPE key to close the menu
    await browser.driver.actions().sendKeys(protractor.Key.ESCAPE).perform();

    // Switch the breakpoint setting to occur at the largest one
    await element(by.css('label[for="desktop-to-extralarge"]')).click();

    // Click the trigger again.  This time it will open an Action Sheet
    await element(by.id(triggerId)).click();
    await browser.driver
      .wait(protractor.ExpectedConditions.visibilityOf(await element(by.id(containerId))), config.waitsFor);

    // Action Sheet should be displayed
    expect(await element(by.id(containerId)).getAttribute('class')).toContain('engaged');
  });
});

describe('ActionSheet no-cancel tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/actionsheet/test-no-cancel?layout=nofrills');
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  it('does not display a cancel button', async () => {
    const triggerEl = await element(by.id(triggerId)).click();
    await browser.driver
      .wait(protractor.ExpectedConditions.visibilityOf(await element(by.id(containerId))), config.waitsFor);

    // Action Sheet should be displayed with no cancel button present
    expect(await element(by.id(containerId)).getAttribute('class')).toContain('engaged');
    expect(await element(by.css('.btn-cancel')).isPresent()).toBeFalsy();
  });
});
