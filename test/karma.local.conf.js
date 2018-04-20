const getSpecs = (listSpec) => {
  if (listSpec) {
    return listSpec.split(',');
  }

  return ['../test/components/**/*.spec.js'];
};

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      '../dist/css/light-theme.css',
      '../dist/js/jquery-3.3.1.js',
      '../node_modules/jasmine-jquery/lib/jasmine-jquery.js',
      '../dist/js/d3.v4.js',
      '../dist/js/sohoxi.js',
      '../dist/js/cultures/en-US.js'
    ].concat(getSpecs(process.env.KARMA_SPECS)),
    exclude: [
      'node_modules'
    ],
    preprocessors: {
      '../test/components/**/*.spec.js': ['webpack', 'sourcemap']
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
            }]
          }
        ]
      }
    },
    webpackMiddleware: {
      stats: 'errors-only'
    },
    reporters: ['mocha', 'junit'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['Chrome'],
    autoWatch: true,
    singleRun: false,
    concurrency: Infinity,
    junitReporter: {
      outputDir: 'test-reports', // results will be saved as $outputDir/$browserName.xml
      outputFile: 'junit-report.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile
      suite: '', // suite will become the package name attribute in xml testsuite element
      useBrowserName: true, // add browser name to report and classes names
      nameFormatter: undefined, // function (browser, result) to customize the name
      classNameFormatter: undefined, // function (browser, result) to customize the classname
      properties: {} // key value pair of properties to add to the section of the report
    }
  });
};
