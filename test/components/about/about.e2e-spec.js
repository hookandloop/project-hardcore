const { browserStackErrorReporter } = requireHelper('browserstack-error-reporter');
const utils = requireHelper('e2e-utils');
const config = requireHelper('e2e-config');
requireHelper('rejection');

jasmine.getEnv().addReporter(browserStackErrorReporter);

describe('About index tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/about/example-index');
  });

  it('Should show the about dialog', async () => {
    const buttonEl = await element(by.id('about-trigger'));
    await buttonEl.click();
    await browser.driver
      .wait(protractor.ExpectedConditions.visibilityOf(await element(by.id('about-modal'))), config.waitsFor);

    expect(await element(by.id('about-modal')).isDisplayed()).toBeTruthy();
  });

  it('Should display the version', async () => {
    const buttonEl = await element(by.id('about-trigger'));
    await buttonEl.click();
    await browser.driver
      .wait(protractor.ExpectedConditions.visibilityOf(await element(by.id('about-modal'))), config.waitsFor);

    expect(await element(by.css('.modal-body')).getText()).toContain('IDS Version : 4.');
  });

  it('Should show the version in the html', async () => {
    const html = await element(by.css('html'));

    expect(await html.getAttribute('data-sohoxi-version')).toContain('.');
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  it('should destroy and reinvoke properly', async () => {
    // Open the About dialog
    await element(by.id('about-trigger')).click();
    await browser.driver
      .wait(protractor.ExpectedConditions.visibilityOf(await element(by.id('about-modal'))), config.waitsFor);

    expect(await element(by.id('about-modal')).isDisplayed()).toBeTruthy();

    // Press the ESCAPE key to close the About Dialog (via modal manager)
    await browser.driver.actions().sendKeys(protractor.Key.ESCAPE).perform();
    await browser.driver
      .wait(protractor.ExpectedConditions.invisibilityOf(await element(by.id('about-modal'))), config.waitsFor);

    // Reopen the About Dialog (creates a new instance)
    await element(by.id('about-trigger')).click();
    await browser.driver
      .wait(protractor.ExpectedConditions.visibilityOf(await element(by.id('about-modal'))), config.waitsFor);

    expect(await element(by.id('about-modal')).isDisplayed()).toBeTruthy();
  });

  it('Should be able to set id/automation id', async () => {
    const button = await element(by.id('about-trigger'));
    await button.click();
    await browser.driver.sleep(config.sleepShort);

    expect(await element(by.id('about-modal')).getAttribute('id')).toEqual('about-modal');
    expect(await element(by.id('about-modal-btn-close')).getAttribute('id')).toEqual('about-modal-btn-close');
  });
});

describe('About translation tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/about/example-index?locale=uk-UA');
  });

  it('Should show the about dialog in ukranian', async () => {
    const buttonEl = await element(by.id('about-trigger'));
    await buttonEl.click();
    await browser.driver
      .wait(protractor.ExpectedConditions.visibilityOf(await element(by.id('about-modal'))), config.waitsFor);

    const ukText = `Авторські права © Infor, ${new Date().getFullYear()}. Усі права збережено. Усі зазначені у цьому документі назви та дизайн елементів є товарними знаками або захищеними товарними знаками Infor та/або афілійованих організацій і філіалів Infor. Усі права збережено. Усі інші товарні знаки, перелічені тут, є власністю відповідних власників. www.infor.com.`;

    expect(await element(by.css('.additional-content + p')).getText()).toEqual(ukText);
  });

  it('Should show version correctly in arabic', async () => {
    await utils.setPage('/components/about/example-index?locale=ar-SA');
    const buttonEl = await element(by.id('about-trigger'));
    await buttonEl.click();
    await browser.driver
      .wait(protractor.ExpectedConditions.visibilityOf(await element(by.id('about-modal'))), config.waitsFor);

    // Its not inverted here but this is correct
    expect(await element(by.css('.version')).getText()).toContain('إصدار :');
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });
});

describe('About Event tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/about/test-close-event-index');
  });

  it('Should fire the close event', async () => {
    await element(by.id('about-trigger')).click();
    await browser.driver
      .wait(protractor.ExpectedConditions.visibilityOf(await element(by.id('about-modal'))), config.waitsFor);
    await element(by.css('.close-container button')).click();
    await browser.driver.sleep(config.sleep);

    expect(await element(by.css('#toast-container .toast-title')).getText()).toEqual('Close Event Triggered');
    await utils.checkForErrors();
  });
});

describe('About Nested Tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/about/test-nested');
  });

  it('Should be able to use both close buttons', async () => {
    // Open About
    await element(by.id('about-trigger')).click();
    await browser.driver
      .wait(protractor.ExpectedConditions.visibilityOf(await element(by.id('about-modal'))), config.waitsFor);

    // Open Nested Modal
    await element(by.id('modal-trigger')).click();
    await browser.driver
      .wait(protractor.ExpectedConditions.visibilityOf(await element(by.id('nested-modal'))), config.waitsFor);

    expect(await element(by.id('nested-modal')).isDisplayed()).toBeTruthy();

    // Close Nested Modal
    await element(by.id('nested-modal-btn-close')).click();
    await browser.driver
      .wait(protractor.ExpectedConditions.invisibilityOf(await element(by.id('nested-modal'))), config.waitsFor);

    // Close About
    await element(by.id('about-modal-btn-close')).click();
    await browser.driver
      .wait(protractor.ExpectedConditions.invisibilityOf(await element(by.id('about-modal'))), config.waitsFor);

    expect(await element(by.id('about-modal')).isPresent()).toBeFalsy();

    await utils.checkForErrors();
  });
});
