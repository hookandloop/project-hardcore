const { browserStackErrorReporter } = requireHelper('browserstack-error-reporter');
const utils = requireHelper('e2e-utils');

requireHelper('rejection');

jasmine.getEnv().addReporter(browserStackErrorReporter);

describe('Accordion example-accordion-click-event tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/accordion/example-accordion-click-event');
  });

  it('Should toast diplay when accordion is clicked', async () => {
    const accordionEl = await element.all(by.className('accordion-header')).first();

    await browser.actions().mouseMove(accordionEl).perform();
    await browser.actions().click(accordionEl).perform();

    expect(await element(by.className('toast'))).toBeTruthy();
  });
});

describe('Accordion example-accordion-panels tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/accordion/example-accordion-panels');
  });

  it('Should accordion have panels', async () => {
    expect(await element(by.className('accordion panel'))).toBeTruthy();
  });
});

describe('Accordion example-ajax tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/accordion/example-ajax');
  });

  it('Should ajax data is in the headers', async () => {
    const accordionEl = await element.all(by.className('accordion-header')).first();
    const testEl = await element.all(by.className('accordion-header')).get(2);

    await browser.actions().mouseMove(accordionEl).perform();
    await browser.actions().click(accordionEl).perform();

    expect(testEl.getText()).toEqual('Apple');
  });
});

describe('Accordion example-disabled tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/accordion/example-disabled');
  });

  it('Should accordion be disabled', async () => {
    expect(await element(by.className('is-disabled'))).toBeTruthy();
  });
});

describe('Accordion example-index tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/accordion/example-index');
  });

  it('Should accordion be displayed', async () => {
    expect(await element(by.className('accordion'))).toBeTruthy();
  });

  it('Should accordion can be expanded', async () => {
    const buttonEl = await element.all(by.tagName('button')).first();
    await buttonEl.click();

    expect(await element(by.css('[aria-expanded="true"]'))).toBeTruthy();
  });

  it('Should keyboard working on focus in accordion ', async () => {
    const accordionEl = await element.all(by.className('accordion-header')).first();

    await browser.actions().mouseMove(accordionEl).perform();
    await browser.actions().click(accordionEl).perform();

    expect(await element(by.className('is-focused'))).toBeTruthy();

    await browser.actions().click(accordionEl).perform();
    await browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();

    expect(await element(by.className('is-focused'))).toBeTruthy();
  });

  it('Should keyboard working on expand in accordion ', async () => {
    const accordionEl = await element.all(by.className('accordion-header')).first();

    await browser.actions().mouseMove(accordionEl).perform();
    await browser.actions().click(accordionEl).perform();

    expect(await element(by.className('is-expanded'))).toBeTruthy();

    await browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();
    await browser.actions().sendKeys(protractor.Key.ENTER).perform();

    expect(await element(by.className('is-expanded'))).toBeTruthy();
  });
});
