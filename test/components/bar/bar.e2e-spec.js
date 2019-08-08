const { browserStackErrorReporter } = requireHelper('browserstack-error-reporter');
const config = requireHelper('e2e-config');
const utils = requireHelper('e2e-utils');

requireHelper('rejection');

jasmine.getEnv().addReporter(browserStackErrorReporter);

describe('Bar Chart example-index tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/bar/example-index?layout=nofrills');
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  it('Should have names for the graphs', async () => {
    const namesEl = await element.all(by.css('.axis.y .tick text')).count();

    expect(await namesEl).toBe(3);
  });

  it('Should have greyed out bars when not selected', async () => {
    const barEl = await element(by.css('.bar.series-0'));
    const barTestEl = await element(by.css('.bar.series-1'));

    await barEl.click();
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(await element(by.css('.bar.is-selected'))), config.waitsFor);

    expect(await barEl.getAttribute('class')).toContain('is-selected');
    expect(await barTestEl.getCssValue('opacity')).toBe('0.6');
  });

  if (utils.isChrome() && utils.isCI()) {
    it('Should not visual regress', async () => {
      const containerEl = await element(by.className('container'));
      await browser.driver.sleep(config.sleep);

      await browser.driver
        .wait(protractor.ExpectedConditions.presenceOf(containerEl), config.waitsFor);
      await browser.driver.sleep(config.sleep);

      expect(await browser.protractorImageComparison.checkElement(containerEl, 'bar-index')).toEqual(0);
    });
  }
});

describe('Bar Chart example-selected tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/bar/test-selected');
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  it('Should have greyed out bars when not selected', async () => {
    const notSelectedBarEl = await element(by.css('.bar.series-1'));

    expect(await notSelectedBarEl.getCssValue('opacity')).toBe('0.6');
  });
});

describe('Bar Chart example-negative-value tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/bar/example-negative-value');
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  it('Should have negative values', async () => {
    const valueEl = await element.all(by.css('.axis.x .tick .negative-value')).count();

    expect(await valueEl).toBe(2);
  });
});

describe('Bar Chart example-colors', () => {
  beforeEach(async () => {
    await utils.setPage('/components/bar/example-colors?layout=nofrills');
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(await element(by.css('.bar.series-2'))), config.waitsFor);
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  it('Should detect that first bar is blue', async () => {
    const blueEl = await element(by.css('.bar.series-0'));

    expect(await blueEl.getCssValue('fill')).toBe('rgb(29, 95, 138)');
  });

  it('Should detect that second bar is green', async () => {
    const blueEl = await element(by.css('.bar.series-1'));

    expect(await blueEl.getCssValue('fill')).toBe('rgb(142, 209, 198)');
  });

  it('Should detect that third bar is violet', async () => {
    const blueEl = await element(by.css('.bar.series-2'));

    expect(await blueEl.getCssValue('fill')).toBe('rgb(146, 121, 166)');
  });

  if (utils.isChrome() && utils.isCI()) {
    it('Should not visual regress', async () => {
      const containerEl = await element(by.className('container'));
      await browser.driver.sleep(config.sleep);

      await browser.driver
        .wait(protractor.ExpectedConditions.presenceOf(containerEl), config.waitsFor);
      await browser.driver.sleep(config.sleep);

      expect(await browser.protractorImageComparison.checkElement(containerEl, 'bar-color')).toEqual(0);
    });
  }
});

describe('Bar Chart alignment tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/bar/test-alignment?layout=nofrills');
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  if (utils.isChrome() && utils.isCI()) {
    it('Should not visual regress', async () => {
      const containerEl = await element(by.className('container'));
      await browser.driver.sleep(config.sleep);

      await browser.driver
        .wait(protractor.ExpectedConditions.presenceOf(containerEl), config.waitsFor);
      await browser.driver.sleep(config.sleep);

      expect(await browser.protractorImageComparison.checkElement(containerEl, 'bar-alignment')).toEqual(0);
    });
  }
});

describe('Bar Chart axis adjust tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/bar/test-axis-adjust?layout=nofrills');
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  if (utils.isChrome() && utils.isCI()) {
    it('Should not visual regress', async () => {
      const containerEl = await element(by.className('container'));
      await browser.driver.sleep(config.sleep);

      await browser.driver
        .wait(protractor.ExpectedConditions.presenceOf(containerEl), config.waitsFor);
      await browser.driver.sleep(config.sleep);

      expect(await browser.protractorImageComparison.checkElement(containerEl, 'bar-axis-adjust')).toEqual(0);
    });
  }
});

describe('Bar Chart axis formatter tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/bar/test-axis-formatter?layout=nofrills');
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  if (utils.isChrome() && utils.isCI()) {
    it('Should not visual regress', async () => {
      const containerEl = await element(by.className('container'));
      await browser.driver.sleep(config.sleep);

      await browser.driver
        .wait(protractor.ExpectedConditions.presenceOf(containerEl), config.waitsFor);
      await browser.driver.sleep(config.sleep);

      expect(await browser.protractorImageComparison.checkElement(containerEl, 'bar-axis-formatter')).toEqual(0);
    });
  }
});
