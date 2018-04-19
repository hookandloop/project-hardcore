module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'dist/css/light-theme.css',
      'dist/js/jquery-3.3.1.js',
      'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
      'dist/js/d3.v4.js',
      'dist/js/sohoxi.js',
      'dist/js/cultures/en-US.js',
      'components/**/*.spec.js'
    ],
    exclude: [
      'node_modules'
    ],
    browserStack: {
      username: process.env.BROWSER_STACK_USERNAME,
      accessKey: process.env.BROWSER_STACK_ACCESS_KEY,
      startTunnel: true,
      forcelocal: true,
      build: 'Unit',
      name: 'Unit tests'
    },
    customLaunchers: {
      bs_firefox_mac: {
        base: 'BrowserStack',
        browser: 'Firefox',
        browser_version: '58.0',
        os_version: 'High Sierra',
        os: 'OS X',
        resolution: '1024x768'
      },
      bs_safari_mac: {
        base: 'BrowserStack',
        browser: 'Safari',
        browser_version: '11.0',
        os_version: 'High Sierra',
        os: 'OS X',
        resolution: '1024x768'
      },
      bs_ie_windows: {
        base: 'BrowserStack',
        browser: 'IE',
        browser_version: '11.0',
        os_version: '10',
        os: 'Windows',
        resolution: '1024x768'
      },
      bs_chrome_windows: {
        base: 'BrowserStack',
        browser: 'Chrome',
        browser_version: '65',
        os_version: '10',
        os: 'Windows',
        resolution: '1024x768'
      }
    },
    preprocessors: {
      'components/**/*.spec.js': ['webpack'],
      'dist/js/sohoxi.js': ['coverage']
    },
    webpack: {
      module: {
        rules: [
          {
            test: /\.html$/,
            use: [{
              loader: 'html-loader'
            }],
          },
          {
            test: /\.js$/,
            use: [{
              loader: 'babel-loader',
              options: {
                presets: ['env']
              }
            }],
            exclude: /node_modules/
          }
        ]
      }
    },
    webpackMiddleware: {
      stats: 'errors-only'
    },
    reporters: ['mocha', 'coverage', 'BrowserStack'],
    coverageReporter: {
      includeAllSources: true,
      dir: 'coverage/',
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'text-summary' }
      ]
    },
    port: 9876,
    colors: true,
    logLevel: config.DEBUG,
    autoWatch: true,
    browsers: [
      'bs_firefox_mac',
      'bs_safari_mac',
      'bs_ie_windows',
      'bs_chrome_windows'
    ],
    singleRun: true,
    concurrency: 1
  });
};
