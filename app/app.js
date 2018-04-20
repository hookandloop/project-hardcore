/* eslint-disable */

// set variables for environment
const chalk = require('chalk');
const express = require('express');
const extend = require('extend'); // equivalent of $.extend()
const logger = require('../scripts/logger');

const app = express();
const path = require('path');
const mmm = require('mmm');
const fs = require('fs');
const http = require('http');
const BASE_PATH = process.env.BASEPATH || '/';

function fullBasePath(req) {
  const fullPath = (`${req.protocol}://${req.headers.host.replace('/', '')}${BASE_PATH}`);
  return fullPath;
};

const getJSONFile = require(path.resolve(__dirname, 'src', 'js', 'getJSONFile'));
const packageJSON = getJSONFile(path.resolve(__dirname, '..', 'package.json'));

app.set('view engine', 'html');
app.set('views', path.resolve(__dirname, 'views'));

mmm.setEngine('hogan.js');
app.engine('html', mmm.__express);

// Because you're the type of developer who cares about this sort of thing!
app.enable('strict routing');

// Serve static assets
app.use(express.static('www')); // non-generated
app.use('/ids-css', express.static(path.join('..', 'node_modules', 'ids-css', 'dist'))); // ids-css
app.use(express.static(path.join('..', 'docs', 'static-website'))); // generated by building documentation
app.use(express.static('dist')); // app (generated by build)
app.use(express.static(path.join('..', 'dist'), { // project-level (generated by build)
  etag: false
}));

// Create the express router with the same settings as the app.
const router = express.Router({
  strict: true
});

// ===========================================
// Default Options / Custom Middleware
// ===========================================
const defaults = {
  enableLiveReload: true,
  layout: 'layout',
  locale: 'en-US',
  title: 'SoHo XI',
  basepath: BASE_PATH,
  version: packageJSON.version,
  csp: true,
  nonce: null
};

// Add csp header
const csp = require('express-csp');
csp.extend(app);
const uuidv4 = require('uuid/v4')

// Makes a simple timestamp log of each request in the console
const requestLogger = function(req, res, next) {
  const type = `${chalk.yellow((req.method).toUpperCase())}`;
  const url = `${req.originalUrl}`;

  logger('timestamp', `${type}: ${url}`);
  next();
};

// Option Handling - Custom Middleware
// Writes a set of default options the 'req' object.  These options are always eventually passed to the HTML template.
// In some cases, these options can be modified based on query parameters.  Check the default route for these options.
const optionHandler = function (req, res, next) {
  res.opts = extend({}, defaults);

  // Change Locale (which also changes right-to-left text setting)
  if (req.query.locale && req.query.locale.length > 0) {
    res.opts.locale = req.query.locale;
    console.log(`Changing Route Parameter "locale" to be "${res.opts.locale}".`);
  }

  // Normally we will use an external file for loading SVG Icons and Patterns.
  // Setting 'inlineSVG' to true will use the deprecated method of using SVG icons, which was to bake them into the HTML markup.
  res.opts.inlineSVG = true;

  // Global settings for forcing a 'no frills' layout for test pages.
  // This means no header with page title, hamburger, theme swap settings, etc.
  if (req.query.nofrills && req.query.nofrills.length > 0) {
    res.opts.nofrillslayout = true;
    console.log('"No-frills" layout active.');
  }

  // Set the theme and colorScheme
  // Fx: http://localhost:4000/controls/modal?colors=9279a6,ffffff&theme=dark
  if (req.query.theme && req.query.theme.length > 0) {
    res.opts.theme = req.query.theme;
    console.log(`Setting Theme to ${res.opts.theme}`);
  } else {
    res.opts.theme = 'light';
  }

  if (req.query.colors && req.query.colors.length > 0) {
    res.opts.colors = req.query.colors;
    console.log(`Setting Colors to ${res.opts.colors}`);
  }

  // Sets a simulated response delay for API Calls
  if (req.query.delay && !isNaN(req.query.delay) && req.query.delay.length > 0) {
    res.opts.delay = req.query.delay;
  }

  // Uses the minified version of the Soho library instead of the uncompressed version
  if (req.query.minify && req.query.minify.length > 0) {
    res.opts.minify = true;
    console.log(`Using the minified version of "sohoxi.js"`);
  }

  if (req.query.font && req.query.font.length > 0) {
    res.opts.font = req.query.font;
    console.log(`Using the ${req.query.font} font`);
  }

  if (res.opts.csp || req.query.csp) {
    res.opts.nonce = Math.random().toString(12).replace(/[^a-z0-9]+/g, '').substr(0, 8);
    res.setPolicy({
      policy: {
        directives: {
          'default-src': ['self'],
          'script-src': ['self', 'nonce-' + res.opts.nonce],
          'object-src': ['none'],
          'style-src': ['* data: http://* \'unsafe-inline\''],
          'img-src': ['self', 'https://randomuser.me', 'http://placehold.it']
        }
      }
    });
  }

  // Disable live reload for IE
  const ua = req.headers['user-agent'];
  const isIE = /Windows NT/.test(ua) && (/Trident/.test(ua) || /Edge/.test(ua));
  if (isIE || res.opts.csp || req.query.csp) {
    res.opts.enableLiveReload = false;
  }
  next();
};

// Simple Middleware that simulates a delayed response by setting a timeout before returning the next middleware.
const responseThrottler = function (req, res, next) {
  if (!res.opts.delay) {
    return next();
  }

  function delayedResponse() {
    console.log('Delayed request continuing...');
    return next();
  }

  console.log(`Delaying the response time of this request by ${res.opts.delay}ms...`);
  setTimeout(delayedResponse, res.opts.delay);
};

// Simple Middleware that passes API data back as a template option if we're on a certain page
const globalDataHandler = function (req, res, next) {
  const url = req.url;

  function isComponentRoute(componentName) {
    return new RegExp(componentName, 'g').test(url);
  }

  if (isComponentRoute('dropdown')) {
    res.opts.dropdownListData = require(path.resolve('src', 'js', 'getJunkDropdownData'));
  }

  next();
};

// Simple Middleware for handling errors
const errorHandler = function (err, req, res, next) {
  if (!err) {
    return next();
  }

  console.error(err.stack);

  if (res.headersSent) {
    return next(err);
  }

  res.status(500).send(`<h2>Internal Server Error</h2><p>${err.stack}</p>`);
};

// place optionHandler() first to augment all 'res' objects with an 'opts' object
app.use(requestLogger);
app.use(optionHandler);
app.use(globalDataHandler);
app.use(responseThrottler);
app.use(router);
app.use(errorHandler);

// Strips the '.html' from a file path and returns the target route name without it
function stripHtml(routeParam) {
  const noHtml = routeParam.replace(/\.html/, '');
  return noHtml;
}

function setHtml(routeParam) {
  return `${stripHtml(routeParam)}.html`;
}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

/**
 * Adds a stored "nonce" attribute to all script tags to conform with security policy.
 */
function addNonceToScript(html, nonce) {
  if (!html || !html.length) {
    return '';
  }
  return html.replace(/<script/ig, `<script nonce="${nonce}"`);
}

/**
 * Checks the target file path for its type (is it a file, a directory, etc)
 * http://stackoverflow.com/questions/15630770/node-js-check-if-path-is-file-or-directory
 * @param {string} type - 'file' or 'folder'
 * @param {string} filePath - a string representing the relative path of the item to be checked
 * @returns {boolean}
 */
function is(type, filePath) {
  let types = ['file', 'folder'],
    defaultType = types[0],
    mappings = {
      file: { methodName: 'isFile' },
      directory: { methodName: 'isDirectory' }
      // TODO: Add More (symbolic link, etc)
    };

  if (!type) {
    console.warn(`No type defined. Using the default type of "${defaultType}".`);
    type = defaultType;
  }

  if (!mappings[type]) {
    console.error(`Provided type "${type}" is not in the list of valid types.`);
    return false;
  }

  // Add beginning slash if it doesn't exist
  if (filePath.indexOf('/') !== 0) {
    filePath = `/${filePath}`;
  }

  let targetPath = __dirname + filePath,
    methodName = mappings[type].methodName;

  try {
    return fs.statSync(targetPath)[methodName]();
  } catch (e) {
    console.info(`File Path "${targetPath}" is not a ${type}.`);
    return false;
  }
}

/**
   * Checks a path to see if it has a trailing slash.
   * @param {string} path
   * @returns {boolean}
   */
function hasTrailingSlash(path) {
  if (!path || typeof path !== 'string') {
    return false;
  }

  return path.substr(path.length - 1) === '/';
}

/**
   * Filters an array of paths and detects if they actually exist
   * @private
   * @param {Object[]} pathDefs -
   * @param {string} link -
   * @param {string} directoryPrepender - prepends the "link" portion with a directory that is not processed by the filter
   */
function filterUnusablePaths(pathDefs, excludes, directoryPrepender) {
  const truePaths = [];
  if (excludes === undefined) {
    excludes = [];
  }

  pathDefs.forEach((pathDef) => {
    pathDef.link = pathDef.link.replace(/\/\//g, '/');
    // console.log('Checking path: "' + pathDef.link + '"');

    let match = false;
    excludes.forEach((exclude) => {
      if (pathDef.link.match(exclude)) {
        match = true;
      }
    });

    if (match) {
      return;
    }

    // Add the directory into the link.
    if (directoryPrepender) {
      pathDef.link = directoryPrepender + pathDef.link;
    }

    truePaths.push(pathDef);
  });

  return truePaths;
}

/**
 * @private
 * @param {string} text
 */
function formatPath(text) {
  return text.replace(/-/g, ' ').replace(/\.html/, '');
}

/**
 * @private
 * @param {object} pathDef
 * @param {string} pathDef.link
 * @param {string} pathDef.type
 * @param {string} pathDef.labelColor
 */
function pathMapper(pathDef) {
  if (!pathDef || !pathDef.link) {
    return;
  }

  let href = pathDef.link.replace(/\\/g, '/').replace(/\/\//g, '/'),
    icon;

  if (href.indexOf(BASE_PATH) !== 0) {
    href = BASE_PATH + href;
  }

  if (is('directory', href.replace(BASE_PATH, ''))) {
    icon = '#icon-folder';

    if (href.charAt(href.length - 1) !== '/') {
      href = `${href}/`;
    }
  }

  const mappedPath = {
    href,
    text: formatPath(pathDef.link)
  };

  if (pathDef.text) {
    mappedPath.text = pathDef.text;
  }

  if (icon) {
    mappedPath.icon = icon;
  }

  if (pathDef.type && pathDef.type.length) {
    mappedPath.pageType = pathDef.type;
    mappedPath.labelColor = pathDef.labelColor || 'graphite07';
  }

  return mappedPath;
}

/**
 * Excluded file names that should never appear in the DemoApp List Pages
 */
const GENERAL_LISTING_EXCLUDES = [
  /(_)?(layout)(\s)?(\.html)?/gm, // matches any filename that begins with "layout" (fx: "layout***.html")
  /footer\.html/,
  /_header\.html/,
  /(api.md$)/,
  /(api.html$)/,
  /partial/,
  /functional/,
  /unit/,
  /\.DS_Store/
];

/**
 * @private
 * @param {string} type
 */
function getFolderContents(type, dir) { // type, dir, folderName
  let paths = [];
  try {
    paths = fs.readdirSync(dir);
  } catch (e) {
    // Handle 'No Directory' errors
    if (e.code === 'ENOENT') {
      // console.log('No '+ folderName +' Folder found for "' + type + '');
      paths = [];
    } else {
      throw e;
    }
  }
  return paths;
}

/**
 * Returns a listing of both "examples" and "tests" for a particular type of component.
 * @param {string} type - the component/layout/pattern type
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @param {array} [extraExcludes]
 * @returns {?}
 */
function getFullListing(type, req, res, next, extraExcludes) {
  let allPaths = [],
    componentPaths,
    testPaths;

  if (!extraExcludes) {
    extraExcludes = [];
  }

  // Add Component-specific file name filters
  // (\D|\W|\S).*?('+ type +')\.(html)+ - pick up all files that end with 'type' before the extension.
  extraExcludes = extraExcludes.concat([
    new RegExp(`[^-](_)?(${type})\.(html)`),
    new RegExp('(\d|\w|\s|-)*?\.(scss|js|md)')
  ]);

  function componentTextFormatter(path) {
    path = path.replace('test-', '').replace('example-', '');
    return formatPath(path);
  }

  // Search the "/components/<type>" folder for all tests/examples located here
  componentPaths = getFolderContents(type, `app/views/components/${type}/`, 'Components');
  componentPaths.forEach((path, i) => {
    const isTest = path.substr(0, 5) === 'test-';

    componentPaths[i] = {
      text: componentTextFormatter(path),
      link: `components/${type}/${path}`,
      type: isTest ? 'test' : 'example',
      labelColor: isTest ? 'azure07' : 'ruby07'
    };
  });
  componentPaths = filterUnusablePaths(componentPaths, GENERAL_LISTING_EXCLUDES.concat(extraExcludes).concat([
    /[^-.]index\.html/,
  ]));

  // Combine the arrays and filter out the junk
  allPaths = allPaths.concat(componentPaths).concat(testPaths);

  const opts = extend({}, res.opts, {
    subtitle: `All Examples & Tests for ${type}`,
    paths: allPaths.map(pathMapper)
  });

  res.render('listing', opts, function(err, html) {
    if (res.opts.csp || req.query.csp) {
      html = addNonceToScript(html, res.opts.nonce);
    }
    res.send(html);
  });

  next();
}

/**
 * Returns a directory listing as page content with working links
 * @param {string} directory
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @param {array} [extraExcludes] - List of files names to exclude
 */
function getDirectoryListing(directory, req, res, next, extraExcludes) {
  if (!extraExcludes) {
    extraExcludes = [];
  }

  fs.readdir(`./views/${directory}`, (err, paths) => {
    if (err) {
      res.render(err);
      return next();
    }

    const strippedDir = hasTrailingSlash(directory) ? directory.substring(0, (directory.length - 1)) : directory;

    // Strip out paths that aren't going to ever work
    paths.forEach((path, i) => {
      paths[i] = {
        text: path,
        link: path
      };
    });

    const directoryPrepender = `/${strippedDir}/`;

    paths = filterUnusablePaths(paths, GENERAL_LISTING_EXCLUDES.concat(extraExcludes), directoryPrepender);

    const opts = extend({}, res.opts, {
      subtitle: `Listing for ${directory}`,
      paths: paths.filter((item) => {
        return item !== undefined && item.link !== undefined;
      }).map(pathMapper)
    });

    res.render('listing', opts);
    next();
  });
}

// ======================================
//  Main Routing and Param Handling
// ======================================

router.get('/', (req, res, next) => {
  const opts = res.opts;
  opts.basepath = fullBasePath(req);
  res.redirect(`${BASE_PATH}kitchen-sink`);
  next();
});

router.get('/index', (req, res, next) => {
  const opts = res.opts;
  opts.basepath = fullBasePath(req);
  res.redirect(`${BASE_PATH}`);
  next();
});

router.get('/kitchen-sink', (req, res, next) => {
  const opts = res.opts;
  opts.basepath = fullBasePath(req);
  res.render('kitchen-sink', res.opts, function(err, html) {
    if (res.opts.csp || req.query.csp) {
      html = addNonceToScript(html, res.opts.nonce);
    }
    res.send(html);
  });
  next();
});

// ======================================
//  Components Section
// ======================================

const componentOpts = {
  layout: 'layout',
  subtitle: 'Style',
};

  /**
   * Detects the existence of a layout file inside of a subfolder that should be used
   * instead of the default layout file in the root.
   * @param {object} opts - Express's res.opts
   * @param {string} component - the name of the component
   * @returns {object}
   */
function addDefaultFolderLayout(opts, component) {
  let layoutFileNames = ['_layout.html', 'layout.html'],
    layoutPath;

  for (let i = 0; i < layoutFileNames.length; i++) {
    layoutPath = `components/${component}/${layoutFileNames[i]}`;
    if (fs.existsSync(layoutPath)) {
      opts.layout = stripHtml(`${component}/${layoutFileNames[i]}`);
      console.log(`layout for this folder changed to "${opts.layout}".`);
    }
  }

  return opts;
}

/**
 * Reroutes '/components/{componentName}' and `/components/{componentName}/index` to
 * the generated Docs folder.
 */
function defaultDocsRoute(req, res, next) {
  const opts = extend({}, res.opts, componentOpts);
  opts.layout = null;
  opts.basepath = fullBasePath(req);

  const componentName = stripHtml(req.params.component);

  res.render(`${opts.basepath}${componentName}.html`, opts);
  next();
}

/**
 * Handles routing to the Components/Docs section.
 */
function componentRoute(req, res, next) {
  let componentName = '';
  let exampleName = '';
  let opts = extend({}, res.opts, componentOpts);

  opts.basepath = fullBasePath(req);

  if (!req.params.component) {
    return defaultDocsRoute(req, res, next);
  }

  componentName = stripHtml(req.params.component);
  opts.subtitle = toTitleCase(componentName.charAt(0).toUpperCase() + componentName.slice(1).replace('-', ' '));

  // If no example, end on the main component docs page.
  if (!req.params.example) {
    return defaultDocsRoute(req, res, next);
  }

  exampleName = req.params.example;

  if (req.params.example !== undefined && exampleName.substr(0, 7) === 'partial') {
    opts.layout = '';
  }

  if (exampleName === 'list') {
    return getFullListing(componentName, req, res, next);
  }

  // Double check this folder for an alternative layout file.
  opts = addDefaultFolderLayout(opts, componentName);

  if (componentName === 'applicationmenu' && (exampleName.indexOf('example-') > -1 || exampleName.indexOf('test-') > -1)) {
    opts.layout = null;
  }

  if (componentName === 'header') {
    if (exampleName.indexOf('test-header-gauntlet') > -1) {
      opts.layout = 'header/layout-header-gauntlet';
    }
  }

  // Override any of these changes to layouts if the "No Frills" option was set by the user.
  if (res.opts.nofrillslayout) {
    opts.layout = 'tests/layout-noheader';
  }

  if (req.params.example !== undefined) {
    logger('timestamp', `Rendering View "views/components/${componentName}/${req.params.example}"`)
    res.render(`components/${componentName}/${req.params.example}`, opts, function(err, html) {
      if (res.opts.csp || req.query.csp) {
        html = addNonceToScript(html, res.opts.nonce);
      }
      res.send(html);
    });
  }


  next();
}

function reDirectSlashRoute(req, res, next) {
  if (req.url.substr(-1) === '/' && req.url.length > 1) {
    let componentName = stripHtml(req.params.component);
    let exampleName = req.params.example;

    if (exampleName !== undefined) {
      res.redirect(301, `${fullBasePath(req) + componentName}/${exampleName}`);
    } else if (componentName !== undefined) {
      res.redirect(301, fullBasePath(req) + componentName);
    } else {
      res.redirect(301, fullBasePath(req));
    }
  }
  next();
}

// Redirect "/component/component{.html}" to "/component.html"
app.get('/components/:component', function(req, res, next) {
  let opts = extend({}, res.opts, componentOpts);
  var compName = stripHtml(req.params.component);
  opts.basepath = fullBasePath(req);
  console.log(`${chalk.cyan('Redirect')}: ${BASE_PATH}components/${compName}.html`)
  res.redirect(`${BASE_PATH}components/${compName}/example-index.html`);
});

router.get('/components/:component/:example', componentRoute);
router.get('/components/:component/:example/', reDirectSlashRoute);
router.get('/components/', reDirectSlashRoute);
router.get('/components', function(req, res, next) {
  res.redirect(301, fullBasePath(req) + '/');
});

// ======================================
//  Patterns Section
// ======================================

router.get('/patterns*', (req, res, next) => {
  let opts = extend({}, res.opts, {
      layout: 'patterns/layout',
      subtitle: 'Patterns'
    }),
    end = req.url.replace(/\/patterns(\/)?/g, '');

    // Don't capture any query params for the View Render
  end = end.replace(/\?(.*)/, '');

  if (!end || !end.length || end === '/') {
    const exclude = [
      'step-process.html',
      'step-process-markup.html'
    ];
    getDirectoryListing('patterns/', req, res, next, exclude);
    return;
  }

  res.render(`patterns/${end}`, opts);
  next();
});

// =========================================
// Test Pages
// =========================================

const testOpts = {
  subtitle: 'Tests',
  layout: 'tests/layout'
};

function testsRouteHandler(req, res, next) {
  let opts = extend({}, res.opts, testOpts),
    end = req.url.replace(/\/tests(\/)?/, '');

    // remove query params for our checking
  end = end.replace(/\?(.*)/, '');

  if (!end || !end.length || end === '/') {
    getDirectoryListing('tests/', req, res, next);
    return;
  }

  let directory = `tests/${end}`;
  if (hasTrailingSlash(directory)) {
    if (is('directory', `/views/${directory}`)) {
      getDirectoryListing(directory, req, res, next);
      return;
    }

    directory = directory.substr(0, directory.length - 1);
  }

  // Custom configurations for some test folders
  if (directory.match(/components\/base-tag/)) {
    opts.usebasehref = true;
  }
  if (directory.match(/tests\/composite-form/)) {
    opts.layout = 'tests/composite-form/_layout';
  }
  if (directory.match(/tests\/call-to-action-header/)) {
    opts.layout = 'tests/call-to-action-header/layout';
  }
  if (directory.match(/tests\/distribution/)) {
    opts.amd = true;
    opts.layout = null; // No layout for this one on purpose.
    opts.subtitle = 'AMD Tests';
  }

  if (directory.match(/tests\/datagrid-fixed-header/)) {
    opts.layout = 'tests/layout-noscroll';
  }
  if (directory.match(/tests\/masthead/)) {
    opts.layout = 'tests/masthead/layout';
  }
  if (directory.match(/tests\/place\/scrolling\/container-is-body/)) {
    opts.layout = 'tests/place/scrolling/layout-body';
  }
  if (directory.match(/tests\/place\/scrolling\/container-is-nested/)) {
    opts.layout = 'tests/place/scrolling/layout-nested';
  }
  if (directory.match(/tests\/signin/)) {
    opts.layout = 'tests/layout-noheader';
  }
  if (directory.match(/tests\/tabs-module/)) {
    opts.layout = 'tests/tabs-module/layout';
  }
  if (directory.match(/tests\/tabs-header/)) {
    opts.layout = 'tests/tabs-header/layout';
  }
  if (directory.match(/tests\/tabs-vertical/)) {
    opts.layout = 'tests/tabs-vertical/layout';
  }

  // Global 'no-header' layout setting takes precedent
  if (res.opts.nofrillslayout || directory.match(/tests\/patterns/)) {
    opts.layout = 'tests/layout-noheader';
  }

  // No trailing slash.  Check for an index file.  If no index file, do directory listing
  if (is('directory', `/views/${directory}`)) {
    if (is('file', `/views/${directory}/index`)) {
      res.render(`${directory}/index`, opts);
      return next();
    }

    getDirectoryListing(directory, req, res, next);
    return;
  }

  // Handle Redirects to new Structure
  let component = req.params.component,
    example = req.params.example;

  if (example && component) {
    let path = `components/${component}/example-${setHtml(example)}`;
    if (fs.existsSync(path)) {
      res.redirect(BASE_PATH + path);
      next();
      return;
    }

    path = `components/${component}/test-${setHtml(example)}`;
    if (fs.existsSync(path)) {
      res.redirect(BASE_PATH + path);
      next();
      return;
    }
  }

  res.render(directory, opts);
  next();
}

// Tests Index Page and controls sub pages
router.get('/tests/:component/:example', testsRouteHandler);
router.get('/tests/:component/', testsRouteHandler);
router.get('/tests/:component', testsRouteHandler);
router.get('/tests/', testsRouteHandler);
router.get('/tests', testsRouteHandler);

// =========================================
// Layouts Pages
// =========================================

const layoutOpts = {
  subtitle: 'Layouts',
  layout: 'layouts/layout'
};

function defaultLayoutRouteHandler(req, res, next) {
  const exclude = [
    '_masthead.html',
    'header-only.html',
    'header-scroll.html',
    'header-sticky.html'
  ];

  getDirectoryListing('layouts/', req, res, next, exclude);
}

function layoutRouteHandler(req, res, next) {
  let pageName = '',
    opts = extend({}, res.opts, layoutOpts),
    layout = req.params.layout;

  if (!layout || !layout.length) {
    return defaultLayoutRouteHandler(req, res, next);
  }

  pageName = stripHtml(req.params.layout);
  opts.subtitle = toTitleCase(pageName.charAt(0).toUpperCase() + pageName.slice(1).replace('-', ' '));
  res.render(`layouts/${layout}`, opts);
  next();
}

router.get('/layouts/:layout', layoutRouteHandler);
router.get('/layouts', defaultLayoutRouteHandler);

// =========================================
// Examples Pages
// =========================================

const exampleOpts = {
  subtitle: 'Examples',
  layout: 'examples/layout'
};

function exampleRouteHandler(req, res, next) {
  let opts = extend({}, res.opts, exampleOpts),
    folder = req.params.folder,
    example = req.params.example,
    path = req.url;

    // A missing category means both no category and no test page.  Simply show the directory listing.
  if (!folder || !folder.length) {
    getDirectoryListing('examples/', req, res, next);
    return;
  }

  // A missing testpage with a category defined will either:
  // - Show a directory listing if there is no test page associated with the current path
  // - Show a test page
  if (!example || !example.length) {
    if (hasTrailingSlash(path)) {
      if (is('directory', `examples/${folder}/`)) {
        getDirectoryListing(`examples/${folder}/`, req, res, next);
        return;
      }
    }

    res.render(`examples/${folder}`, opts);
    next();
    return;
  }

  // if testpage and category are both defined, should be able to show a valid testpage
  res.render(`examples/${folder}/${example}`, opts);
  next();
}

router.get('/examples/:folder/:example', exampleRouteHandler);
router.get('/examples/:folder/', exampleRouteHandler);
router.get('/examples/:folder', exampleRouteHandler);
router.get('/examples/', exampleRouteHandler);
router.get('/examples', exampleRouteHandler);

// =========================================
// Collection of Performance Tests Pages
// =========================================

router.get('/performance-tests', (req, res, next) => {
  let performanceOpts = { subtitle: 'Performance Tests' },
    opts = extend({}, res.opts, performanceOpts);

  res.render('performance-tests/index', opts);
  next();
});

// =========================================
// Angular Support Test Pages
// =========================================

const angularOpts = {
  subtitle: 'Angular',
  layout: 'angular/layout'
};

router.get('/angular*', (req, res, next) => {
  let opts = extend({}, res.opts, angularOpts),
    end = req.url.replace(/\/angular(\/)?/, '');

  if (!end || !end.length || end === '/') {
    getDirectoryListing('angular/', req, res, next);
    return;
  }

  res.render(`angular/${end}`, opts);
  next();
});


// =========================================
// Fake 'API' Calls for use with AJAX-ready Controls
// =========================================


require('./data')(app);

module.exports = app;
