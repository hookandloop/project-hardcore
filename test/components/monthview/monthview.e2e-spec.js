const { browserStackErrorReporter } = requireHelper('browserstack-error-reporter');
const utils = requireHelper('e2e-utils');
requireHelper('rejection');

jasmine.getEnv().addReporter(browserStackErrorReporter);

describe('MonthView index tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/monthview/example-index');
  });

  it('Should render without error', async () => {
    expect(await element.all(by.css('.monthview-table td')).count()).toEqual(42);
    await utils.checkForErrors();
  });

  it('Should be able to change months', async () => {
    const nextButton = await element(by.css('button.next'));
    const prevButton = await element(by.css('button.prev'));
    const monthDesc = await element(by.css('[data-month]'));
    const testDate = new Date();

    expect(monthDesc.getText()).toEqual(testDate.toLocaleDateString('en-US', { month: 'long' }));

    await nextButton.click();
    testDate.setMonth(testDate.getMonth() + 1);

    expect(monthDesc.getText()).toEqual(testDate.toLocaleDateString('en-US', { month: 'long' }));

    await prevButton.click();
    testDate.setMonth(testDate.getMonth() - 1);

    expect(monthDesc.getText()).toEqual(testDate.toLocaleDateString('en-US', { month: 'long' }));
    expect(await prevButton.getText()).toEqual('Previous Month');
    expect(await nextButton.getText()).toEqual('Next Month');
  });
});

describe('MonthView disable day tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/monthview/example-disable-weeks.html');
  });

  it('Should render without error', async () => {
    expect(await element.all(by.css('.monthview-table td')).count()).toEqual(42);
    await utils.checkForErrors();
  });

  it('Should disable weekends', async () => {
    expect(await element.all(by.css('.monthview-table td')).count()).toEqual(42);
    expect(await element.all(by.css('.monthview-table td.is-disabled')).count()).toEqual(12);
  });
});

describe('MonthView disable month selection tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/monthview/example-restrict-month-selection.html');
  });

  it('Should render without error', async () => {
    expect(await element.all(by.css('.monthview-table td')).count()).toEqual(42);
    await utils.checkForErrors();
  });

  it('Should disable specified days', async () => {
    expect(await element.all(by.css('.monthview-table td.is-disabled')).first().getText()).toEqual('1');
  });

  it('Should disable next and previous buttons', async () => {
    const nextButton = await element(by.css('.btn-icon.next'));
    const prevButton = await element(by.css('.btn-icon.prev'));

    expect(await nextButton.getAttribute('disabled')).toBeFalsy();
    expect(await prevButton.getAttribute('disabled')).toBeTruthy();

    await nextButton.click();

    expect(await nextButton.getAttribute('disabled')).toBeFalsy();
    expect(await prevButton.getAttribute('disabled')).toBeFalsy();

    await nextButton.click();

    expect(await nextButton.getAttribute('disabled')).toBeTruthy();
    expect(await prevButton.getAttribute('disabled')).toBeFalsy();
  });
});
