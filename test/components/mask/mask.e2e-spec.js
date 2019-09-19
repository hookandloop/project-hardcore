const { browserStackErrorReporter } = requireHelper('browserstack-error-reporter');
const config = requireHelper('e2e-config');
const utils = requireHelper('e2e-utils');
requireHelper('rejection');

jasmine.getEnv().addReporter(browserStackErrorReporter);

const inputId = 'percentage-field';

describe('Mask Percent Format Tests', () => {
  it('Should be type in en-US', async () => {
    await utils.setPage('/components/mask/test-percent-locale');
    const inputEl = await element(by.id(inputId));
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(inputEl), config.waitsFor);

    await inputEl.clear();
    await inputEl.sendKeys('100');

    expect(await inputEl.getAttribute('value')).toEqual('100 %');
  });

  it('Should be type in tr-TR', async () => {
    await utils.setPage('/components/mask/test-percent-locale?locale=tr-TR');
    const inputEl = await element(by.id(inputId));
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(inputEl), config.waitsFor);
    await browser.driver.sleep(config.sleepShort);

    await inputEl.clear();
    await inputEl.sendKeys('100');

    expect(await inputEl.getAttribute('value')).toEqual('%100');
  });

  it('Should be type in ar-SA', async () => {
    await utils.setPage('/components/mask/test-percent-locale?locale=ar-SA');
    const inputEl = await element(by.id(inputId));
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(inputEl), config.waitsFor);
    await browser.driver.sleep(config.sleepShort);

    await inputEl.clear();
    await inputEl.sendKeys('100');

    expect(await inputEl.getAttribute('value')).toEqual('100 ٪');
  });
});
