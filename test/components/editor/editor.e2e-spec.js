const { browserStackErrorReporter } = requireHelper('browserstack-error-reporter');
const utils = requireHelper('e2e-utils');
const config = requireHelper('e2e-config');
requireHelper('rejection');

jasmine.getEnv().addReporter(browserStackErrorReporter);

describe('Editor example-index tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/editor/example-index?layout=nofrills');
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  it('Should be able to edit in both modes', async () => {
    const elem = await element(by.css('.editor'));

    await elem.clear();
    await elem.sendKeys('Test');
    await browser.driver.sleep(config.sleep);

    expect(await element(by.css('.editor')).getAttribute('innerHTML')).toEqual('<p>Test</p>');
    await browser.driver.sleep(config.sleep);
    await element(by.css('button[data-action=source]')).click();
    await browser.driver.sleep(config.sleep);

    const sourceElem = await element(by.tagName('textarea'));
    let testText = await sourceElem.getText();

    expect(testText.replace(/(\r\n\t|\n|\r\t)/gm, '')).toEqual('<p>Test</p>');

    await sourceElem.sendKeys('<b>Test</b>');
    await element(by.css('button[data-action=visual]')).click();
    await browser.driver.sleep(config.sleep);
    testText = await await element(by.css('.editor')).getText();

    expect(testText.replace(/(\r\n\t|\n|\r\t)/gm, '')).toEqual('TestTest');
  });

  it('Should create p tags when cleared', async () => {
    const elem = await element(by.css('.editor'));

    await elem.clear();
    await elem.sendKeys('Test');
    await browser.driver.sleep(config.sleep);

    expect(await element(by.css('.editor')).getAttribute('innerHTML')).toEqual('<p>Test</p>');
  });

  it('Should create p tags when cleared in html view', async () => {
    const elem = await element(by.css('.editor'));

    await element(by.css('button[data-action=source]')).click();
    await browser.driver.sleep(config.sleep);
    const sourceElem = await element(by.tagName('textarea'));
    await sourceElem.clear();
    await element(by.css('button[data-action=visual]')).click();
    await browser.driver.sleep(config.sleep);
    await elem.sendKeys('Test');
    await browser.driver.sleep(config.sleep);

    expect(await element(by.css('.editor')).getAttribute('innerHTML')).toEqual('<p>Test</p>');
  });

  if (utils.isChrome() && utils.isCI()) {
    it('Should not visually regress', async () => {
      const elem = await element(by.css('.editor'));

      expect(await browser.protractorImageComparison.checkElement(elem, 'editor-index')).toEqual(0);
    });
  }
});

describe('Editor preview mode tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/editor/example-preview?layout=nofrills');
  });

  it('Should not have errors', async () => {  //eslint-disable-line
    await utils.checkForErrors();
  });

  it('Should render editor in preview mode', async () => {
    const container = await element(by.css('.editor-container'));
    const elem = await element(by.css('.editor'));

    expect(await container.getAttribute('class')).toContain('is-preview');
    expect(await container.getAttribute('class')).not.toContain('is-disabled');
    expect(await container.getAttribute('class')).not.toContain('is-readonly');
    expect(await elem.getAttribute('class')).not.toContain('is-preview');
    expect(await elem.getAttribute('class')).not.toContain('is-disabled');
    expect(await elem.getAttribute('class')).not.toContain('is-readonly');
    expect(await elem.isDisplayed()).toBeTruthy();
    expect(await elem.getAttribute('contenteditable')).toBe('false');
    expect(await element(by.css('.editor-toolbar')).isPresent()).toBeFalsy();
  });
});

describe('Editor dirty tracking tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/editor/example-dirty-tracking?layout=nofrills');
  });

  it('Should not have errors', async () => {  //eslint-disable-line
    await utils.checkForErrors();
  });

  it('Should render dirty tracker', async () => {
    await element(by.css('button[data-action="bold"]')).click();
    await element(by.id('editor1')).sendKeys('Test');

    await browser.driver.wait(protractor.ExpectedConditions
      .visibilityOf(await element(by.css('.editor-container .icon-dirty'))), config.waitsFor);

    expect(await element(by.css('.editor-container .icon-dirty')).isDisplayed()).toBe(true);

    if (utils.isChrome() && utils.isCI()) {
      const containerEl = await element(by.className('container'));

      expect(await browser.protractorImageComparison.checkElement(containerEl, 'editor-dirty-tracker')).toEqual(0);
    }
  });
});

describe('Editor empty tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/editor/test-empty?layout=nofrills');
  });

  it('Should not have errors', async () => {  //eslint-disable-line
    await utils.checkForErrors();
  });

  it('Should create p tags when entered from empty', async () => {
    const elem = await element(by.css('.editor'));

    await elem.sendKeys('This is a test');
    await browser.driver.sleep(config.sleep);

    expect(await element(by.css('.editor')).getAttribute('innerHTML')).toEqual('<p>This is a test</p>');
  });
});

describe('Editor placeholder tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/editor/test-placeholder?layout=nofrills');
  });

  it('Should not have errors', async () => { //eslint-disable-line
    await utils.checkForErrors();
  });

  if (utils.isChrome() && utils.isCI()) {
    it('Should not visually regress', async () => { //eslint-disable-line
      const elem = await element(by.css('.editor'));

      expect(await browser.protractorImageComparison.checkElement(elem, 'editor-placeholder')).toEqual(0);
    });
  }
});
