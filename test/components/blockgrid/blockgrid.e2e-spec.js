const { browserStackErrorReporter } = requireHelper('browserstack-error-reporter');
const utils = requireHelper('e2e-utils');
const config = requireHelper('e2e-config');
requireHelper('rejection');

jasmine.getEnv().addReporter(browserStackErrorReporter);

describe('Blockgrid example-index tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/blockgrid/example-index');
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  it('Should have a blockgrid', async () => {
    expect(await element(by.className('blockgrid')).isPresent()).toBeTruthy();
  });

  it('Should have a block', async () => {
    expect(await element(by.className('block')).isPresent()).toBeTruthy();
  });
});

describe('Blockgrid example-mixed-selection tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/blockgrid/example-mixed-selection');
  });

  it('Should have a blockgrid mixed selection', async () => {
    expect(await element(by.className('blockgrid')).isPresent()).toBeTruthy();
  });

  it('Should have a block mixed selection', async () => {
    expect(await element(by.className('block')).isPresent()).toBeTruthy();
  });

  it('Should blocks be selectable', async () => {
    expect(await element(by.className('is-selectable')).isPresent()).toBeTruthy();
  });

  it('Should block highlight after clicked', async () => {
    const blockEl = await element.all(by.css('.block.is-selectable')).first();
    await blockEl.click();
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(await element(by.css('.is-activated'))), config.waitsFor);

    expect(await blockEl.getAttribute('class')).toContain('is-activated');
  });

  it('Should block checked after selected', async () => {
    const blockEl = await element.all(by.css('.block.is-selectable')).first();
    const checkEl = await element(by.css("label[for='checkbox0']"));
    await blockEl.click();
    await checkEl.click();

    expect(await blockEl.getAttribute('class')).toContain('is-selected');
  });
});

describe('Blockgrid example-mixed-selection responsive tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/blockgrid/example-mixed-selection?nofrills=true');
  });

  if (utils.isChrome() && utils.isCI()) {
    it('Should not visual regress on example-responsive', async () => {
      const blockgridEl = await element(by.css('div[role=main]'));
      await browser.driver
        .wait(protractor.ExpectedConditions.presenceOf(blockgridEl), config.waitsFor);
      await browser.driver.sleep(config.waitsFor);

      expect(await browser.protractorImageComparison.checkScreen('blockgrid')).toEqual(0);
    });

    it('Should not visual regress on example-responsive at 500px', async () => {
      const windowSize = await browser.driver.manage().window().getSize();
      await browser.driver.manage().window().setSize(500, 600);
      await browser.driver.sleep(config.sleep);
      const blockgridEl = await element(by.css('div[role=main]'));
      await browser.driver
        .wait(protractor.ExpectedConditions.presenceOf(blockgridEl), config.waitsFor);
      await browser.driver.sleep(config.waitsFor);

      expect(await browser.protractorImageComparison.checkScreen('blockgrid-500px')).toEqual(0);
      await browser.driver.manage().window().setSize(windowSize.width, windowSize.height);
      await browser.driver.sleep(config.sleep);
    });

    it('Should not visual regress on example-responsive at 320px', async () => {
      const windowSize = await browser.driver.manage().window().getSize();
      await browser.driver.manage().window().setSize(320, 480);
      await browser.driver.sleep(config.sleep);
      const blockgridEl = await element(by.css('div[role=main]'));
      await browser.driver
        .wait(protractor.ExpectedConditions.presenceOf(blockgridEl), config.waitsFor);
      await browser.driver.sleep(config.waitsFor);

      expect(await browser.protractorImageComparison.checkScreen('blockgrid-320px')).toEqual(0);
      await browser.driver.manage().window().setSize(windowSize.width, windowSize.height);
      await browser.driver.sleep(config.sleep);
    });
  }
});

describe('Blockgrid example-multiselect tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/blockgrid/example-multiselect');
  });

  it('Should have a blockgrid multiselect', async () => {
    expect(await element(by.className('blockgrid')).isPresent()).toBeTruthy();
  });

  it('Should have a block multiselect', async () => {
    expect(await element(by.className('block')).isPresent()).toBeTruthy();
  });

  it('Should all blocks be selectable', async () => {
    expect(await element.all(by.className('is-selectable')).isPresent()).toBeTruthy();
  });

  it('Should highlight blocks after click', async () => {
    const blockEl1 = await element.all(by.css('.block.is-selectable')).get(1);
    const blockEl2 = await element.all(by.css('.block.is-selectable')).get(2);
    await blockEl1.click();
    await blockEl2.click();

    expect(await element(by.className('is-activated'))).toBeTruthy();
  });

  it('Should select multiple blocks', async () => {
    const blockEl1 = await element.all(by.css('.block.is-selectable')).get(1);
    const blockEl2 = await element.all(by.css('.block.is-selectable')).get(2);
    const blockEl3 = await element.all(by.css('.block.is-selectable')).get(3);
    await blockEl1.click();
    await blockEl2.click();
    await blockEl3.click();
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(await element.all(by.css('.is-selected')).get(3)), config.waitsFor);

    expect(await element.all(by.css('.block.is-selectable')).get(1).getAttribute('class')).toContain('is-selected');
    expect(await element.all(by.css('.block.is-selectable')).get(2).getAttribute('class')).toContain('is-selected');
    expect(await element.all(by.css('.block.is-selectable')).get(3).getAttribute('class')).toContain('is-selected');
  });

  it('Should be able to select at 320px', async () => {
    const windowSize = await browser.driver.manage().window().getSize();
    await browser.driver.manage().window().setSize(320, 480);
    await browser.driver.sleep(config.sleep);
    const blockEl1 = await element.all(by.css('.block.is-selectable')).get(1);
    const blockEl2 = await element.all(by.css('.block.is-selectable')).get(2);
    const blockgridEl = await element(by.id('blockgrid'));
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(blockgridEl), config.waitsFor);
    await browser.driver.sleep(config.waitsFor);

    await blockEl1.click();
    await blockEl2.click();
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(await element.all(by.css('.is-selected')).get(2)), config.waitsFor);

    expect(await element.all(by.css('.block.is-selectable')).get(1).getAttribute('class')).toContain('is-selected');
    expect(await element.all(by.css('.block.is-selectable')).get(2).getAttribute('class')).toContain('is-selected');
    await browser.driver.manage().window().setSize(windowSize.width, windowSize.height);
    await browser.driver.sleep(config.sleep);
  });
});

describe('Blockgrid example-singleselect tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/blockgrid/example-singleselect');
  });

  it('Should have a blockgrid singleselect', async () => {
    expect(await element(by.className('blockgrid')).isPresent()).toBeTruthy();
  });

  it('Should have a block singleselect', async () => {
    expect(await element(by.className('block')).isPresent()).toBeTruthy();
  });

  it('Should have singleselect blocks be selectable', async () => {
    expect(await element.all(by.className('is-selectable')).isPresent()).toBeTruthy();
  });

  it('Should select only 1 blocks', async () => {
    const blockEl1 = await element.all(by.css('.block.is-selectable')).get(1);
    const blockEl2 = await element.all(by.css('.block.is-selectable')).get(2);
    const blockEl3 = await element.all(by.css('.block.is-selectable')).get(3);
    await blockEl1.click();
    await blockEl2.click();
    await blockEl3.click();
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(await element(by.css('.is-selected'))), config.waitsFor);

    expect(await element.all(by.css('.block.is-selectable')).get(1).getAttribute('class')).not.toContain('is-selected');
    expect(await element.all(by.css('.block.is-selectable')).get(2).getAttribute('class')).not.toContain('is-selected');
    expect(await element.all(by.css('.block.is-selectable')).get(3).getAttribute('class')).toContain('is-selected');
  });
});

describe('Blockgrid example-text tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/blockgrid/example-text');
  });

  it('Should have a blockgrid in the page', async () => {
    expect(await element.all(by.css('.row.blockgrid.l-center')).isPresent()).toBeTruthy();
  });

  it('Should have a block in the page', async () => {
    expect(await element(by.className('block')).isPresent()).toBeTruthy();
  });

  it('Should have a text in the page', async () => {
    expect(await element(by.css('p')).isPresent()).toBeTruthy();
  });
});

describe('Blockgrid example-paging tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/blockgrid/example-paging');
  });

  it('Should select block, navigate to 2nd page, navigate back, block should still be selected', async () => {
    const blockEl1 = await element.all(by.css('.block.is-selectable')).get(1);
    const firstPageNumEl = await element.all(by.css('.pager-toolbar li')).get(1);
    const secondPageNumEl = await element.all(by.css('.pager-toolbar li')).get(2);
    await blockEl1.click();
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(await element(by.css('.is-selected'))), config.waitsFor);
    await secondPageNumEl.click();
    await browser.driver
      .wait(protractor.ExpectedConditions.visibilityOf(await element.all(by.css('.block.is-selectable')).get(4)), config.waitsFor);
    await firstPageNumEl.click();
    await browser.driver
      .wait(protractor.ExpectedConditions.visibilityOf(await element.all(by.css('.block.is-selectable')).get(1)), config.waitsFor);

    expect(await element.all(by.css('.block.is-selectable')).get(1).getAttribute('class')).toContain('is-selected');
  });

  it('Should navigate to 2nd page, navigate back via keyboard', async () => {
    const blockEl1 = await element.all(by.css('.block.is-selectable')).get(1);
    await blockEl1.sendKeys(protractor.Key.TAB);
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(await element(by.css('.is-selected'))), config.waitsFor);
    await browser.driver.actions().sendKeys(protractor.Key.SPACE).perform();
    await browser.driver
      .wait(protractor.ExpectedConditions.visibilityOf(await element(by.css('.block.is-selected'))), config.waitsFor);
    await browser.driver.actions().sendKeys(protractor.Key.TAB).perform();
    await browser.driver.actions().sendKeys(protractor.Key.ARROW_RIGHT).perform();
    await browser.driver.actions().sendKeys(protractor.Key.ENTER).perform();
    await browser.driver.actions().sendKeys(protractor.Key.TAB).perform();
    await browser.driver.actions().sendKeys(protractor.Key.TAB).perform();
    await browser.driver.actions().sendKeys(protractor.Key.TAB).perform();
    await browser.driver.actions().sendKeys(protractor.Key.ENTER).perform();
    await browser.driver.sleep(config.waitsFor);
    await browser.driver
      .wait(protractor.ExpectedConditions.visibilityOf(await element.all(by.css('.block.is-selectable')).get(1)), config.waitsFor);

    expect(await element.all(by.css('.block.is-selectable')).get(2).getAttribute('class')).toContain('is-selected');
  });
});
