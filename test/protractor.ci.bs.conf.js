/* eslint-disable */
const basePath = __dirname;
const { SpecReporter } = require('jasmine-spec-reporter');
const protractorImageComparison = require('protractor-image-comparison');
const specs = require('./helpers/detect-custom-spec-list')('e2e', process.env.PROTRACTOR_SPECS);

const theme = process.env.ENTERPRISE_THEME || 'soho'
const variant = process.env.ENTERPRISE_VARIANT || 'light'
let browserstackBuildID = `${Date.now()} : ${theme} theme : ${variant} variant : ci:bs e2e`;

if (process.env.TRAVIS_BUILD_NUMBER) {
  browserstackBuildID = `Travis Build No. ${process.env.TRAVIS_BUILD_NUMBER} : ${theme} theme: : ${variant} variant: ci:bs e2e`;
}

process.env.isBrowserStack = true;

exports.config = {
  params: {
    theme,
    variant
  },
  allScriptsTimeout: 12000,
  logLevel: 'INFO',
  specs: specs,
  seleniumAddress: 'http://hub-cloud.browserstack.com/wd/hub',
  SELENIUM_PROMISE_MANAGER: false,
  baseUrl: 'http://master-enterprise.demo.design.infor.com',
  jasmineNodeOpt: {
    defaultTimeoutInterval: 10000,
    showColors: true,
    random: false
  },
  commonCapabilities: {
    'browserstack.user': process.env.BROWSERSTACK_USERNAME,
    'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY,
    'browserstack.debug': true,
    'browserstack.video': true,
    'browserstack.local': false,
    'browserstack.networkLogs': false,
    'browserstack.timezone': 'New_York',
    build: browserstackBuildID,
    loggingPrefs: {
      driver: 'INFO',
      server: 'INFO',
      browser: 'SEVERE'
    },
    name: `${theme} theme ci:bs e2e tests`,
    project: 'ids-enterprise-e2e-ci'
  },
  multiCapabilities: [
    {
      browserName: 'chrome',
      resolution: '1280x800',
      os_version: '10',
      os: 'Windows'
    }
  ],
  onPrepare: () => {
    global.requireHelper = (filename) => require(`${basePath}/helpers/${filename}.js`);
    browser.ignoreSynchronization = true;
    browser.protractorImageComparison = new protractorImageComparison({
      baselineFolder: `${basePath}/baseline`,
      screenshotPath: `${basePath}/.tmp/`,
      autoSaveBaseline: false,
      ignoreAntialiasing: true,
      debug: false
    });

    jasmine.getEnv().addReporter(new SpecReporter({
      spec: { displayStacktrace: 'specs' }
    }));
  }
};

exports.config.multiCapabilities.forEach((caps) => {
  for (const i in exports.config.commonCapabilities) {
    caps[i] = caps[i] || exports.config.commonCapabilities[i];
  }
});
