/* eslint-disable consistent-return */
import * as debug from '../../utils/debug';
import { utils } from '../../utils/utils';
import { Locale } from '../locale/locale';

// The name of this component
const COMPONENT_NAME = 'emptymessage';

/**
* The Empty Message is a message with an icon that can be used when no data is present.
* @class EmptyMessage
* @param {object} element The component element.
* @param {object} [settings] The component settings.
* @param {string} [settings.title = null] The Main text to show.
* @param {string} [settings.info = null] Longer paragraph text to show
* @param {string} [settings.icon = null] The name of the icon to use. See {@link ./icons/example-empty-widgets.html} for options.
* @param {boolean} [settings.button = null] The botton text and click event to add.
* @param {string} [settings.color = 'graphite']  Defaults to 'graphite' but can also be azure. Later may be expanded to all personalization colors.
*/
const EMPTYMESSAGE_DEFAULTS = {
  title: null,
  info: null,
  icon: null,
  button: null,
  color: 'graphite' // or azure for now until personalization works
};

function EmptyMessage(element, settings) {
  this.settings = utils.mergeSettings(element, settings, EMPTYMESSAGE_DEFAULTS);
  this.element = $(element);
  debug.logTimeStart(COMPONENT_NAME);
  this.init();
  debug.logTimeEnd(COMPONENT_NAME);
}

// Component Methods
EmptyMessage.prototype = {

  init() {
    this
      .setup()
      .build();
  },

  setup() {
    this.element.addClass('empty-message');
    return this;
  },

  build() {
    const opts = this.settings;

    if (opts.icon) {
      $(`<div class="empty-icon">
          <svg class="icon-empty-state is-${this.settings.color}" focusable="false" aria-hidden="true" role="presentation">
            <use xlink:href="#${opts.icon}"></use>
          </svg></div>`).appendTo(this.element);
    }

    if (opts.title) {
      // Re-evaluate the text
      if (opts.title === '[NoData]') {
        opts.title = Locale ? Locale.translate('NoData') : 'No Data Available';
      }

      $(`<div class="empty-title">${opts.title}</div>`).appendTo(this.element);
    }

    if (opts.info) {
      $(`<div class="empty-info">${opts.info}</div>`).appendTo(this.element);
    }

    if (opts.button) {
      $(`${'<div class="empty-actions">' +
          '<button type="button" class="btn-secondary hide-focus '}${opts.button.cssClass}" id="${opts.button.id}">` +
            `<span>${opts.button.text}</span>` +
          '</button>' +
        '</div>').appendTo(this.element);
    }

    return this;
  },

  /**
   * Update the component and optionally apply new settings.
   *
   * @param  {object} settings the settings to update to.
   * @returns {void}
   */
  updated(settings) {
    this.settings = utils.mergeSettings(this.element, settings, this.settings);
    this.element.empty();
    this.build();
  },

  /**
   * Teardown - Remove added markup and events
   * @returns {void}
   */
  destroy() {
    $.removeData(this.element[0], COMPONENT_NAME);
    this.element.empty();
  }
};

export { EmptyMessage, COMPONENT_NAME };
