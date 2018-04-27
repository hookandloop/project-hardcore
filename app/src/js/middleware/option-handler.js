const extend = require('extend');

const logger = require('../../../../scripts/logger');

// Option Handling - Custom Middleware
// Writes a set of default options the 'req' object.  These options are always eventually passed to the HTML template.
// In some cases, these options can be modified based on query parameters.  Check the default route for these options.
module.exports = function (app, defaults) {
  return function optionHandler(req, res, next) {
    res.opts = extend({}, defaults);

    // Change Locale (which also changes right-to-left text setting)
    if (req.query.locale && req.query.locale.length > 0) {
      res.opts.locale = req.query.locale;
      logger('info', `Changing Route Parameter "locale" to be "${res.opts.locale}".`);
    }

    // Normally we will use an external file for loading SVG Icons and Patterns.
    // Setting 'inlineSVG' to true will use the deprecated method of using SVG icons, which was to bake them into the HTML markup.
    res.opts.inlineSVG = true;

    // Global settings for forcing a 'no frills' layout for test pages.
    // This means no header with page title, hamburger, theme swap settings, etc.
    if (req.query.nofrills && req.query.nofrills.length > 0) {
      res.opts.nofrillslayout = true;
      logger('info', '"No-frills" layout active.');
    }

    // Set the theme and colorScheme
    // Fx: http://localhost:4000/controls/modal?colors=9279a6,ffffff&theme=dark
    if (req.query.theme && req.query.theme.length > 0) {
      res.opts.theme = req.query.theme;
      logger('info', `Setting Theme to ${res.opts.theme}`);
    } else {
      res.opts.theme = 'light';
    }

    if (req.query.colors && req.query.colors.length > 0) {
      res.opts.colors = req.query.colors;
      logger('info', `Setting Colors to ${res.opts.colors}`);
    }

    // Sets a simulated response delay for API Calls
    if (req.query.delay && !isNaN(req.query.delay) && req.query.delay.length > 0) {
      res.opts.delay = req.query.delay;
    }

    // Uses the minified version of the Soho library instead of the uncompressed version
    if (req.query.minify && req.query.minify.length > 0) {
      res.opts.minify = true;
      logger('info', 'Using the minified version of "sohoxi.js"');
    }

    if (req.query.font && req.query.font.length > 0) {
      res.opts.font = req.query.font;
      logger('info', `Using the ${req.query.font} font`);
    }

    if (res.opts.csp || req.query.csp) {
      res.opts.nonce = Math.random().toString(12).replace(/[^a-z0-9]+/g, '').substr(0, 8);
      res.setPolicy({
        policy: {
          directives: {
            'default-src': ['self'],
            'script-src': ['self', `nonce-${res.opts.nonce}`],
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
};
