// Icons Route
//= ====================================================
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const hbsRegistrar = require('handlebars-registrar');

hbsRegistrar('toUpperCase', str => str.toUowerCase());

const hbsTemplate = `
{{#each categories as |cat catKey|}}
  <div class="row top-padding">
    <div class="twelve columns">
      <h2 class="fieldset-title" style="text-transform: capitalize;">{{cat.name}} ({{cat.icons.length}} icons)</h2>
    </div>
  </div>

  <div class="row top-padding">
    <div class="twelve columns demo">
      {{#each cat.icons as |iconName iconKey|}}
        <div class="demo-svg" title="{{iconName}}">
          <svg class="icon {{../../additionalClass}}" focusable="false" aria-hidden="true" role="presentation">
            <use href="{{iconName}}"></use>
          </svg>
          <span class="audible">{{iconName}}</span>
        </div>
      {{/each}}
    </div>
  </div>
{{/each}}
`;
const template = handlebars.compile(hbsTemplate);

/**
 * Export the html templates for icons.
 * @param {string} url - The page url
 * @param {string} theme - The theme
 * @returns {string} The html
 */
module.exports = (url, theme) => {
  const fileName = path.basename(url, '.html');
  const iconSet = fileName.includes('example-empty-widgets') ? 'empty' : 'standard';

  if (iconSet === 'empty') { // Ids Identity just has one set of empty icons
    theme = 'soho';
  }
  const metaPath = `node_modules/ids-identity/dist/theme-${theme}/icons/${iconSet}/metadata.json`;
  const meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8').toString());

  if (iconSet === 'empty') {
    meta.additionalClass = 'icon-empty-state';
  }

  const html = template(meta);
  return html;
};
