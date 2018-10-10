const { browserStackErrorReporter } = requireHelper('browserstack-error-reporter');
const utils = requireHelper('e2e-utils');
const config = requireHelper('e2e-config');
requireHelper('rejection');

jasmine.getEnv().addReporter(browserStackErrorReporter);

describe('Datagrid index tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/datagrid/example-index');

    const datagridEl = await element(by.id('datagrid'));
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(datagridEl), config.waitsFor);
    const tabElTriggerStart = await element(by.id('header-searchfield'));
    await tabElTriggerStart.click();
    await element(by.css('body')).sendKeys(protractor.Key.TAB);
    await element(by.css('body')).sendKeys(protractor.Key.TAB);
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  it('Should show results', async () => {
    expect(await element(by.className('datagrid-result-count')).getText()).toBe('(7 Results)');
  });

  it('Should navigate with arrow keys', async () => {
    await browser.driver.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();
    await browser.driver.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();

    let cellEl = await browser.driver.switchTo().activeElement();

    expect(await cellEl.getAttribute('aria-colindex')).toBe('1');

    await browser.driver.actions().sendKeys(protractor.Key.ARROW_RIGHT).perform();
    cellEl = await browser.driver.switchTo().activeElement();

    expect(await cellEl.getAttribute('aria-colindex')).toBe('2');

    await browser.driver.actions().sendKeys(protractor.Key.ARROW_LEFT).perform();
    cellEl = await browser.driver.switchTo().activeElement();

    expect(await cellEl.getAttribute('aria-colindex')).toBe('1');

    await browser.driver.actions().sendKeys(protractor.Key.ARROW_UP).perform();
    cellEl = await browser.driver.switchTo().activeElement();

    expect(await cellEl.getAttribute('aria-colindex')).toBe('1');
  });
});

describe('Datagrid mixed selection tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/datagrid/example-mixed-selection');

    const datagridEl = await element(by.id('datagrid-header'));
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(datagridEl), config.waitsFor);
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  it('Should allow activation and deactivation', async () => {
    expect(await element(by.css('#datagrid-header .datagrid-body tbody tr:nth-child(1) td:nth-child(2)')).getText()).toEqual('52106');
    await element(by.css('#datagrid-header .datagrid-body tbody tr:nth-child(1) td:nth-child(2)')).click();

    expect(await element(by.css('#datagrid-header .datagrid-body tbody tr:nth-child(1)')).getAttribute('class')).toMatch('is-rowactivated');
    await element(by.css('#datagrid-header .datagrid-body tbody tr:nth-child(1) td:nth-child(2)')).click();

    expect(await element(by.css('#datagrid-header .datagrid-body tbody tr:nth-child(1)')).getAttribute('class')).not.toMatch('is-rowactivated');
  });

  it('Should handle selection ', async () => {
    await element(by.css('#datagrid-header .datagrid-body tbody tr:nth-child(1) td:nth-child(1)')).click();

    expect(await element(by.css('#datagrid-header .datagrid-body tbody tr:nth-child(1)')).getAttribute('class')).not.toMatch('is-rowactivated');
    expect(await element(by.css('#datagrid-header .datagrid-body tbody tr:nth-child(1)')).getAttribute('class')).toMatch('is-selected');
  });
});

describe('Datagrid multiselect tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/datagrid/example-multiselect');

    const datagridEl = await element(by.id('datagrid'));
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(datagridEl), config.waitsFor);
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  it('Should allow selection and deselection', async () => {
    await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(1) td:nth-child(2)')).click();
    await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(2) td:nth-child(2)')).click();

    expect(await element(by.css('.selection-count')).getText()).toEqual('2 Selected');
    await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(1) td:nth-child(2)')).click();

    expect(await element(by.css('.selection-count')).getText()).toEqual('1 Selected');
    await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(1) td:nth-child(2)')).click();

    expect(await element.all(by.css('.datagrid-row.is-selected')).count()).toEqual(2);
  });

  it('Should handle removing selected rows ', async () => {
    expect(await element.all(by.css('.datagrid-row')).count()).toEqual(7);

    await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(1) td:nth-child(1)')).click();
    await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(2) td:nth-child(2)')).click();

    await element(by.id('remove-btn')).click();

    expect(await element.all(by.css('.datagrid-row')).count()).toEqual(5);
  });
});

describe('Datagrid page size selector tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/datagrid/example-paging-page-size-selector');

    const datagridEl = await element(by.id('datagrid'));
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(datagridEl), config.waitsFor);
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  it('Should toggle and use pagesize selector', async () => {
    expect(await element.all(by.css('.datagrid-row')).count()).toEqual(3);
    await element(by.id('toggle-pagesize-selector')).click();
    await element(by.css('.pager-pagesize .btn-menu')).click();

    await element(by.css('#popupmenu-3 li:nth-child(2) a')).click();

    expect(await element.all(by.css('.datagrid-row')).count()).toEqual(10);
  });
});

describe('Datagrid single select tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/datagrid/example-singleselect');

    const datagridEl = await element(by.id('datagrid'));
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(datagridEl), config.waitsFor);
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  it('Should single select rows', async () => {
    await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(1) td:nth-child(1)')).click();

    expect(await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(1)')).getAttribute('class')).toMatch('is-selected');
    expect(await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(2)')).getAttribute('class')).not.toMatch('is-selected');

    await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(2) td:nth-child(1)')).click();

    expect(await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(1)')).getAttribute('class')).not.toMatch('is-selected');
    expect(await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(2)')).getAttribute('class')).toMatch('is-selected');

    await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(2) td:nth-child(1)')).click();

    expect(await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(1)')).getAttribute('class')).not.toMatch('is-selected');
    expect(await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(2)')).getAttribute('class')).not.toMatch('is-selected');
  });
});

describe('Datagrid contextmenu tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/datagrid/test-contextmenu');

    const datagridEl = await element(by.id('readonly-datagrid'));
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(datagridEl), config.waitsFor);
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  if (!utils.isBS()) {
    it('Should show context menu', async () => {
      const td = await element(by.css('#readonly-datagrid tr:first-child td:first-child')).getLocation();
      await browser.actions()
        .mouseMove(td)
        .click(protractor.Button.RIGHT)
        .perform();

      await browser.driver
        .wait(protractor.ExpectedConditions.visibilityOf(await element(by.css('#grid-actions-menu'))), config.waitsFor);

      expect(await element(by.css('#grid-actions-menu > li:nth-child(1)')).getText()).toBe('Action One');
      expect(await element(by.css('#grid-actions-menu > li:nth-child(1)')).isDisplayed()).toBeTruthy();

      expect(await element(by.css('#grid-actions-menu > li:nth-child(3)')).getText()).toBe('Action Three');
      expect(await element(by.css('#grid-actions-menu > li:nth-child(3)')).isDisplayed()).toBeTruthy();

      expect(await element(by.css('#grid-actions-menu .submenu .popupmenu')).isDisplayed()).toBeFalsy();

      browser.actions().mouseMove(element(by.css('#grid-actions-menu .submenu'))).perform();

      await browser.driver
        .wait(protractor.ExpectedConditions.visibilityOf(await element(by.css('#grid-actions-menu .submenu .popupmenu'))), config.waitsFor);

      expect(await element(by.css('#grid-actions-menu .submenu ul > li:nth-child(1)')).getText()).toBe('Action Four');
      expect(await element(by.css('#grid-actions-menu .submenu ul > li:nth-child(1)')).isDisplayed()).toBeTruthy();
    });
  }
});

describe('Datagrid filter single select tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/datagrid/test-filter-singleselect');

    const datagridEl = await element(by.id('datagrid'));
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(datagridEl), config.waitsFor);
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  it('Should single select rows, filter and restore', async () => {
    expect(await element.all(by.css('.datagrid-row')).count()).toEqual(8);
    await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(1) td:nth-child(1)')).click();

    expect(await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(1)')).getAttribute('class')).toMatch('is-selected');
    expect(await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(2)')).getAttribute('class')).not.toMatch('is-selected');

    await element(by.id('test-filter-singleselect-datagrid-1-header-filter-1')).sendKeys('23');
    await element(by.id('test-filter-singleselect-datagrid-1-header-filter-1')).sendKeys(protractor.Key.ENTER);

    expect(await element.all(by.css('.datagrid-row')).count()).toEqual(1);

    await element(by.id('test-filter-singleselect-datagrid-1-header-filter-1')).clear();
    await element(by.id('test-filter-singleselect-datagrid-1-header-filter-1')).sendKeys(protractor.Key.ENTER);

    expect(await element.all(by.css('.datagrid-row')).count()).toEqual(8);
    expect(await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(1)')).getAttribute('class')).toMatch('is-selected');
    expect(await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(2)')).getAttribute('class')).not.toMatch('is-selected');
  });
});

describe('Datagrid grouping multiselect tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/datagrid/test-grouping-multiselect');

    const datagridEl = await element(by.id('datagrid'));
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(datagridEl), config.waitsFor);
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  it('Should be able to select within groups', async () => {
    await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(2) td:nth-child(1)')).click();

    expect(await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(2)')).getAttribute('class')).toMatch('is-selected');
    expect(await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(3)')).getAttribute('class')).not.toMatch('is-selected');

    await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(7) td:nth-child(1)')).click();

    expect(await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(7)')).getAttribute('class')).toMatch('is-selected');
    expect(await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(8)')).getAttribute('class')).not.toMatch('is-selected');

    await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(11) td:nth-child(1)')).click();

    expect(await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(11)')).getAttribute('class')).toMatch('is-selected');
    expect(await element.all(by.css('.datagrid-row.is-selected')).count()).toEqual(3);
  });
});

describe('Datagrid hide selection checkbox tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/datagrid/test-hide-selection-checkbox');

    const datagridEl = await element(by.id('datagrid'));
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(datagridEl), config.waitsFor);
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  it('Should not show selection checkbox', async () => {
    expect(await element(by.css('#datagrid .datagrid-header thead .datagrid-checkbox')).isDisplayed()).toBeFalsy();
  });
});

describe('Datagrid loaddata selected rows tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/datagrid/test-loaddata-selected-rows');

    const datagridEl = await element(by.id('datagrid'));
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(datagridEl), config.waitsFor);
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  it('Should be able to select and reload and clear rows', async () => {
    await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(1) td:nth-child(2)')).click();

    expect(await element.all(by.css('.datagrid-row.is-selected')).count()).toEqual(1);

    await element(by.id('clear')).click();

    expect(await element.all(by.css('.datagrid-row.is-selected')).count()).toEqual(0);
  });

  it('Should be able to select and reload and preserve rows', async () => {
    await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(1) td:nth-child(2)')).click();

    expect(await element.all(by.css('.datagrid-row.is-selected')).count()).toEqual(1);

    await element(by.id('save')).click();

    expect(await element.all(by.css('.datagrid-row.is-selected')).count()).toEqual(1);
  });
});

describe('Datagrid disableRowDeactivation setting tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/datagrid/test-mixed-selection-disable-row-dectivation');

    const datagridEl = await element(by.id('datagrid-header'));
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(datagridEl), config.waitsFor);
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  it('Should allow activation but not deactivation', async () => {
    expect(await element(by.css('#datagrid-header .datagrid-body tbody tr:nth-child(1) td:nth-child(2)')).getText()).toEqual('52106');
    await element(by.css('#datagrid-header .datagrid-body tbody tr:nth-child(1) td:nth-child(2)')).click();

    expect(await element(by.css('#datagrid-header .datagrid-body tbody tr:nth-child(1)')).getAttribute('class')).toMatch('is-rowactivated');
    await element(by.css('#datagrid-header .datagrid-body tbody tr:nth-child(1) td:nth-child(2)')).click();

    expect(await element(by.css('#datagrid-header .datagrid-body tbody tr:nth-child(1)')).getAttribute('class')).toMatch('is-rowactivated');
  });
});

describe('Datagrid multiselect with no selection checkbox', () => {
  beforeEach(async () => {
    await utils.setPage('/components/datagrid/test-multiselect-no-checkboxes');

    const datagridEl = await element(by.id('datagrid'));
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(datagridEl), config.waitsFor);
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  it('Should allow multiselect with no selection checkbox', async () => {
    await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(1) td:nth-child(2)')).click();
    await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(2) td:nth-child(2)')).click();

    expect(await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(1)')).getAttribute('class')).toMatch('is-selected');
    expect(await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(2)')).getAttribute('class')).toMatch('is-selected');
  });
});

describe('Datagrid paging multiselect across pages', () => {
  beforeEach(async () => {
    await utils.setPage('/components/datagrid/test-paging-multiselect-select-across-page');

    const datagridEl = await element(by.id('datagrid'));
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(datagridEl), config.waitsFor);
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  it('Should be able to select across pages', async () => {
    await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(1) td:nth-child(1)')).click();
    await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(2) td:nth-child(1)')).click();

    expect(await element.all(by.css('.datagrid-row.is-selected')).count()).toEqual(2);

    element(by.css('.pager-next')).click();

    await browser.driver
      .wait(protractor.ExpectedConditions.elementToBeClickable(await element(by.css('.pager-prev'))), config.waitsFor);

    expect(await element.all(by.css('.datagrid-row.is-selected')).count()).toEqual(0);

    await element(by.css('.pager-prev')).click();

    await browser.driver
      .wait(protractor.ExpectedConditions.visibilityOf(await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(1).is-selected'))), config.waitsFor);

    expect(await element.all(by.css('.datagrid-row.is-selected')).count()).toEqual(2);
  });
});

describe('Datagrid paging multiselect tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/datagrid/test-paging-multiselect');

    const datagridEl = await element(by.id('datagrid'));
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(datagridEl), config.waitsFor);
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  it('Should be able to select and when changing pages the selections reset', async () => {
    await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(1) td:nth-child(1)')).click();
    await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(2) td:nth-child(1)')).click();

    expect(await element.all(by.css('.datagrid-row.is-selected')).count()).toEqual(2);

    await element(by.css('.pager-next')).click();

    await browser.driver
      .wait(protractor.ExpectedConditions.elementToBeClickable(await element(by.css('.pager-prev'))), config.waitsFor);

    expect(await element.all(by.css('.datagrid-row.is-selected')).count()).toEqual(0);

    await element(by.css('.pager-prev')).click();

    await browser.driver
      .wait(protractor.ExpectedConditions.visibilityOf(await element(by.css('tr:nth-child(1) td[aria-colindex="2"]'))), config.waitsFor);

    expect(await element.all(by.css('.datagrid-row.is-selected')).count()).toEqual(0);
  });
});

describe('Datagrid paging client side multiselect tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/datagrid/test-paging-select-clientside-multiple');

    const datagridEl = await element(by.id('datagrid'));
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(datagridEl), config.waitsFor);
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  it('Should be able to select across pages', async () => {
    await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(1) td:nth-child(1)')).click();
    await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(2) td:nth-child(1)')).click();

    expect(await element.all(by.css('.datagrid-row.is-selected')).count()).toEqual(2);

    await element(by.css('.pager-next')).click();

    await browser.driver
      .wait(protractor.ExpectedConditions.visibilityOf(await element(by.css('tr:nth-child(1) td[aria-colindex="2"]'))), config.waitsFor);

    expect(await element.all(by.css('.datagrid-row.is-selected')).count()).toEqual(0);

    await element(by.css('.pager-prev')).click();

    await browser.driver
      .wait(protractor.ExpectedConditions.visibilityOf(await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(1).is-selected'))), config.waitsFor);

    expect(await element.all(by.css('.datagrid-row.is-selected')).count()).toEqual(2);
  });
});

describe('Datagrid paging clientside single select tests', () => { //eslint-disable-line
  beforeEach(async () => {
    await utils.setPage('/components/datagrid/test-paging-select-clientside-single');

    const datagridEl = await element(by.id('datagrid'));
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(datagridEl), config.waitsFor);
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  it('Should be able to select across pages', async () => {
    await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(1) td:nth-child(1)')).click();
    await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(2) td:nth-child(1)')).click();

    expect(await element.all(by.css('.datagrid-row.is-selected')).count()).toEqual(1);

    element(by.css('.pager-next')).click();

    await browser.driver
      .wait(protractor.ExpectedConditions.elementToBeClickable(await element(by.css('.pager-prev'))), config.waitsFor);

    expect(await element.all(by.css('.datagrid-row.is-selected')).count()).toEqual(0);

    await element(by.css('.pager-prev')).click();

    await browser.driver
      .wait(protractor.ExpectedConditions.elementToBeClickable(await element(by.css('.pager-next'))), config.waitsFor);

    expect(await element.all(by.css('.datagrid-row.is-selected')).count()).toEqual(1);
  });
});

describe('Datagrid paging indeterminate multiple select tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/datagrid/test-paging-select-indeterminate-multiple');

    const datagridEl = await element(by.id('datagrid'));
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(datagridEl), config.waitsFor);
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  it('Should be able to select and have it clear when paging', async () => {
    await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(1) td:nth-child(1)')).click();
    await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(2) td:nth-child(1)')).click();

    expect(await element.all(by.css('.datagrid-row.is-selected')).count()).toEqual(2);

    element(by.css('.pager-next')).click();

    await browser.driver
      .wait(protractor.ExpectedConditions.elementToBeClickable(await element(by.css('.pager-prev'))), config.waitsFor);

    expect(await element.all(by.css('.datagrid-row.is-selected')).count()).toEqual(0);

    await element(by.css('.pager-prev')).click();

    await browser.driver
      .wait(protractor.ExpectedConditions.elementToBeClickable(await element(by.css('.pager-next'))), config.waitsFor);

    expect(await element.all(by.css('.datagrid-row.is-selected')).count()).toEqual(0);
  });
});

describe('Datagrid paging indeterminate single select tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/datagrid/test-paging-select-indeterminate-single');

    const datagridEl = await element(by.id('datagrid'));
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(datagridEl), config.waitsFor);
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  it('Should be able to select and have it clear when paging', async () => {
    await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(1) td:nth-child(1)')).click();
    await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(2) td:nth-child(1)')).click();

    expect(await element.all(by.css('.datagrid-row.is-selected')).count()).toEqual(1);

    element(by.css('.pager-next')).click();

    await browser.driver
      .wait(protractor.ExpectedConditions.elementToBeClickable(await element(by.css('.pager-prev'))), config.waitsFor);

    expect(await element.all(by.css('.datagrid-row.is-selected')).count()).toEqual(0);

    await element(by.css('.pager-prev')).click();

    await browser.driver
      .wait(protractor.ExpectedConditions.elementToBeClickable(await element(by.css('.pager-next'))), config.waitsFor);

    expect(await element.all(by.css('.datagrid-row.is-selected')).count()).toEqual(0);
  });
});

describe('Datagrid paging serverside multi select tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/datagrid/test-paging-select-serverside-multiple');

    const datagridEl = await element(by.id('datagrid'));
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(datagridEl), config.waitsFor);
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  it('Should be able to select and have selections clear when paging', async () => {
    await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(1) td:nth-child(1)')).click();
    await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(2) td:nth-child(1)')).click();

    expect(await element.all(by.css('.datagrid-row.is-selected')).count()).toEqual(2);

    element(by.css('.pager-next')).click();

    await browser.driver
      .wait(protractor.ExpectedConditions.elementToBeClickable(await element(by.css('.pager-prev'))), config.waitsFor);

    expect(await element.all(by.css('.datagrid-row.is-selected')).count()).toEqual(0);

    await element(by.css('.pager-prev')).click();

    await browser.driver
      .wait(protractor.ExpectedConditions.elementToBeClickable(await element(by.css('.pager-next'))), config.waitsFor);

    expect(await element.all(by.css('.datagrid-row.is-selected')).count()).toEqual(0);
  });
});

describe('Datagrid paging serverside single select tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/datagrid/test-paging-select-serverside-single');

    const datagridEl = await element(by.id('datagrid'));
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(datagridEl), config.waitsFor);
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  it('Should be able to select and have selections clear when paging', async () => {
    await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(1) td:nth-child(1)')).click();
    await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(2) td:nth-child(1)')).click();

    expect(await element.all(by.css('.datagrid-row.is-selected')).count()).toEqual(1);

    element(by.css('.pager-next')).click();

    await browser.driver
      .wait(protractor.ExpectedConditions.elementToBeClickable(await element(by.css('.pager-prev'))), config.waitsFor);

    expect(await element.all(by.css('.datagrid-row.is-selected')).count()).toEqual(0);

    await element(by.css('.pager-prev')).click();

    await browser.driver
      .wait(protractor.ExpectedConditions.elementToBeClickable(await element(by.css('.pager-next'))), config.waitsFor);

    expect(await element.all(by.css('.datagrid-row.is-selected')).count()).toEqual(0);
  });
});

describe('Datagrid select and focus row', () => {
  beforeEach(async () => {
    await utils.setPage('/components/datagrid/test-select-and-focus-row');

    const datagridEl = await element(by.id('datagrid'));
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(datagridEl), config.waitsFor);
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  it('Should focus and activate the first row', async () => {
    await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(1) td:nth-child(1)')).click();
    await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(2) td:nth-child(1)')).click();

    expect(await element.all(by.css('.is-selected.is-active-row')).count()).toEqual(1);
  });
});

describe('Datagrid select and filter tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/datagrid/test-select-filter-issue');

    const datagridEl = await element(by.id('datagrid'));
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(datagridEl), config.waitsFor);
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  it('Should focus and activate the first row', async () => {
    await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(1) td:nth-child(1)')).click();
    await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(2) td:nth-child(1)')).click();

    expect(await element.all(by.css('tr.is-selected')).count()).toEqual(2);

    await element(by.id('test-select-filter-issue-datagrid-1-header-filter-2')).sendKeys('love');
    await element(by.id('test-select-filter-issue-datagrid-1-header-filter-2')).sendKeys(protractor.Key.ENTER);

    await utils.checkForErrors();

    expect(await element.all(by.css('tbody tr')).count()).toEqual(1);
    expect(await element.all(by.css('tr.is-selected')).count()).toEqual(0);

    await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(1) td:nth-child(1)')).click();

    expect(await element.all(by.css('tr.is-selected')).count()).toEqual(1);
  });
});

describe('Datagrid select event tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/datagrid/test-selected-event');

    const datagridEl = await element(by.id('testing-datagrid'));
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(datagridEl), config.waitsFor);
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  it('Should fire a toast on select', async () => {
    await element(by.css('#testing-datagrid .datagrid-body tbody tr:nth-child(1) td:nth-child(2)')).click();
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(await element(by.id('toast-container'))), config.waitsFor);

    expect(await element.all(by.css('#toast-container .toast-message')).getText()).toEqual(['The row #1 containing the product name Compressor triggered a selected event']);
  });
});

describe('Datagrid select tree tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/datagrid/test-tree-multiselect');

    const datagridEl = await element(by.id('datagrid'));
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(datagridEl), config.waitsFor);
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  it('Should select parent nodes', async () => {
    await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(1) td:nth-child(1)')).click();

    expect(await element.all(by.css('tr.is-selected')).count()).toEqual(4);
  });

  it('Should partially select root nodes', async () => {
    await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(5) td:nth-child(1)')).click();

    expect(await element.all(by.css('tr.is-selected')).count()).toEqual(1);
    expect(await element.all(by.css('.is-partial')).count()).toEqual(1);
  });
});

describe('Datagrid tree do not select children tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/datagrid/test-tree-select-children');

    const datagridEl = await element(by.id('datagrid'));
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(datagridEl), config.waitsFor);
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  it('Should not select children', async () => {
    await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(1) td:nth-child(1)')).click();

    expect(await element.all(by.css('tr.is-selected')).count()).toEqual(1);

    await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(5) td:nth-child(1)')).click();

    expect(await element.all(by.css('tr.is-selected')).count()).toEqual(2);
  });
});

describe('Datagrid tree do not select siblings tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/datagrid/test-tree-select-siblings');

    const datagridEl = await element(by.id('datagrid'));
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(datagridEl), config.waitsFor);
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  it('Should select siblings', async () => {
    await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(1) td:nth-child(1)')).click();

    expect(await element.all(by.css('tr.is-selected')).count()).toEqual(5);

    await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(1) td:nth-child(1)')).click();

    expect(await element.all(by.css('tr.is-selected')).count()).toEqual(0);

    await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(8) td:nth-child(1)')).click();

    expect(await element.all(by.css('tr.is-selected')).count()).toEqual(3);
  });
});

describe('Datagrid tree single select tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/datagrid/test-tree-singleselect');

    const datagridEl = await element(by.id('datagrid'));
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(datagridEl), config.waitsFor);
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  it('Should single select', async () => {
    await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(5) td:nth-child(1)')).click();

    expect(await element.all(by.css('tr.is-selected')).count()).toEqual(1);

    await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(5) td:nth-child(1)')).click();

    expect(await element.all(by.css('tr.is-selected')).count()).toEqual(0);

    await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(6) td:nth-child(1)')).click();

    expect(await element.all(by.css('tr.is-selected')).count()).toEqual(1);

    await element(by.css('#datagrid .datagrid-body tbody tr:nth-child(5) td:nth-child(1)')).click();

    expect(await element.all(by.css('tr.is-selected')).count()).toEqual(1);
  });
});

describe('Datagrid tooltip tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/datagrid/example-tooltips');

    const datagridEl = await element(by.id('datagrid'));
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(datagridEl), config.waitsFor);
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  it('Should show tooltip on text cut off', async () => {
    await browser.actions().mouseMove(element(by.css('tbody tr[aria-rowindex="4"] td[aria-colindex="9"]'))).perform();
    await browser.driver
      .wait(protractor.ExpectedConditions.presenceOf(await element(by.css('.tooltip'))), config.waitsFor);
    let tooltip = await element(by.id('tooltip'));

    expect(await tooltip.getAttribute('class')).toContain('is-hidden');

    await browser.actions().mouseMove(element(by.css('tbody tr[aria-rowindex="5"] td[aria-colindex="9"]'))).perform();
    await browser.driver
      .wait(protractor.ExpectedConditions.visibilityOf(await element(by.css('.tooltip'))), config.waitsFor);
    tooltip = await element(by.id('tooltip'));

    expect(await tooltip.getAttribute('class')).not.toContain('is-hidden');
  });
});
