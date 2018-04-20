import * as debug from '../../utils/debug';
import { utils } from '../../utils/utils';
import { Locale } from '../locale/locale';

// jQuery components
import '../dropdown/dropdown.jquery';
import '../icons/icons.jquery';
import '../mask/mask-input.jquery';
import '../popover/popover.jquery';

// Component Name
const COMPONENT_NAME = 'timepicker';

// Timepicker Modes
const TIMEPICKER_MODES = ['standard', 'range'];

// Timepicker defaults
const TIMEPICKER_DEFAULTS = function () {
  return {
    timeFormat: Locale.calendar().timeFormat || 'h:mm a', // The time format
    minuteInterval: 5,
    secondInterval: 5,
    mode: TIMEPICKER_MODES[0],
    roundToInterval: true,
    parentElement: null,
    returnFocus: true
  };
};

/**
 * The Timepicker Component provides a click/touch user interface for setting a time.
 * @class TimePicker
 * @param {HTMLElement|jQuery[]} element the base element
 * @param {object} [settings] incoming settings
 * @param {string} [settings.timeFormat = 'h:mm a'] The time format, defaults to the current locales time format.
 * @param {number} [settings.minuteInterval = 5]  Integer from 1 to 60.  Multiples of this value
 *  are displayed as options in the minutes dropdown.
 * @param {number} [settings.secondInterval = 5]  Integer from 1 to 60.
 * @property {string} [settings.mode = 'standard']  Can be set to 'standard', 'range',
 * @property {boolean} [settings.roundToInterval = true]  if `false`, does not automatically round user-entered values
 * from the pickers to their nearest interval.
 * @param {null|jQuery[]} [settings.parentElement] if defined as a jQuery-wrapped element, will be used as the target element.
 * @property {string} [settings.returnFocus = true]  If set to false, focus will not be returned to
 *  the calling element. It usually should be for accessibility purposes.
 */
function TimePicker(element, settings) {
  this.element = $(element);
  this.settings = utils.mergeSettings(this.element[0], settings, TIMEPICKER_DEFAULTS);
  debug.logTimeStart(COMPONENT_NAME);
  this.init();
  debug.logTimeEnd(COMPONENT_NAME);
}

// Plugin Methods
TimePicker.prototype = {

  /**
   * @private
   * @returns {void}
   */
  init() {
    this
      .setup()
      .build()
      .handleEvents()
      .roundMinutes();
  },

  /**
   * Configure any settings for the Timepicker
   * @private
   * @returns {this} component instance
   */
  setup() {
    function sanitizeIntervals(value, type) {
      if (!type || ['minute', 'second'].indexOf(type) < 0) {
        type = 'minute';
      }

      const defaultInterval = TIMEPICKER_DEFAULTS()[(`${type}Interval`)];
      if (value === undefined || isNaN(value)) {
        return defaultInterval;
      }
      const intValue = parseInt(value, 10);
      return intValue > 0 && intValue < 60 ? intValue : defaultInterval;
    }

    function sanitizeTimeFormat(value) {
      if (!value || !value.toUpperCase().match('H') || !value.match('mm')) {
        return TIMEPICKER_DEFAULTS().timeFormat;
      }

      return value;
    }

    function sanitizeRoundToInterval(value) {
      return value === true;
    }

    function sanitizeMode(value) {
      const modes = ['standard', 'range'];
      return $.inArray(value, modes) > -1 ? value : TIMEPICKER_DEFAULTS().mode;
    }

    this.id = `${this.element.uniqueId('timepicker')}-id`;

    if (this.element.is('[data-round-to-interval]')) {
      this.settings.roundToInterval = sanitizeRoundToInterval(this.element.attr('data-round-to-interval'));
    }
    if (this.element.is('[data-minute-interval]')) {
      this.settings.minuteInterval = sanitizeIntervals(this.element.attr('data-minute-interval'), 'minute');
    }

    this.settings.timeFormat = sanitizeTimeFormat(parseInt(this.element.attr('data-force-hour-mode'), 10) === 24 ? 'HH:mm' : this.settings.timeFormat);
    this.settings.minuteInterval = sanitizeIntervals(this.settings.minuteInterval, 'minute');
    this.settings.secondInterval = sanitizeIntervals(this.settings.secondInterval, 'second');
    this.settings.mode = sanitizeMode(this.settings.mode);
    this.settings.roundToInterval = sanitizeRoundToInterval(this.settings.roundToInterval);

    this.dayPeriods = Locale.calendar().dayPeriods;

    return this;
  },

  /**
   * Add any markup
   * @private
   * @returns {this} component instance
   */
  build() {
    // With this option forgoe the input and append the dropdowns/popup to the parent element
    if (this.settings.parentElement) {
      this.trigger = $();
      this.buildStandardPopup();
      this.setupStandardEvents();
      return this;
    }

    // Append a Button
    this.trigger = this.element.next('svg.icon');
    if (this.trigger.length === 0) {
      this.trigger = $.createIconElement('clock').insertAfter(this.element);
    }

    this.addAria();

    // Add Mask and Validation plugins for time
    this.addMask();

    return this;
  },

  /**
   * Adds ARIA-related attributes
   * @private
   * @returns {void}
   */
  addAria() {
    this.element.attr({
      'aria-expanded': 'false',
      role: 'combobox'
    });

    // TODO: Confirm this with Accessibility Team
    this.label = $(`label[for="${this.element.attr('id')}"]`);
    this.label.append(`<span class="audible">${Locale.translate('UseArrow')}</span>`);
  },

  /**
   * Sets up a `keydown` event listener.
   * @private
   * @returns {void}
   */
  handleKeys() {
    const self = this;

    this.element.on('keydown.timepicker', (e) => {
      let handled = false;

      // Esc closes an open popup with no action
      if (e.which === 27 && self.isOpen()) {
        handled = true;
        self.closeTimePopup();
      }

      // Arrow Down or Alt first opens the dialog
      if (e.which === 40 && !self.isOpen()) {
        handled = true;
        self.openTimePopup();
      }

      if (handled) {
        e.stopPropagation();
        e.preventDefault();
        return false;
      }

      return true;
    });
  },

  /**
   * Sets up a `blur` event listener.
   * @private
  */
  handleBlur() {
    const self = this;

    this.element.on('blur.timepicker', () => {
      self.roundMinutes();

      // The action of closing the popup menu is set on a timer because technically
      // there are no fields focused on frame 0 of the popup menu's existence, which
      // would cause it to close immediately on open.
      setTimeout(() => {
        if (self.isOpen() && self.popup.find(':focus').length === 0) {
          self.closeTimePopup();
        }
      }, 20);
    });
  },

  /**
   * Checks a time format value to see if it is a Military (24-hour) format.
   * @private
   * @param {string} value - a string value representing a time format.
   * @returns {boolean} whether or not the time format is 24-hour
   */
  is24HourFormat(value) {
    if (!value) { value = this.settings.timeFormat; }
    return (value.match('H') || []).length > 0;
  },

  /**
   * @private
   * @param {number} value incoming value
   * @returns {string} the hour text
   */
  hourText(value) {
    return (((this.settings.timeFormat.toUpperCase().match('HH') || []).length > 0 && value < 10 ? '0' : '') + value);
  },

  /**
   * Checks a time format value to see if it includes seconds.
   * @private
   * @param {string} value a string value representing a time format.
   * @returns {boolean} whether or not seconds are included in the time format
   */
  hasSeconds(value) {
    if (!value) { value = this.settings.timeFormat; }
    return (value.match('ss') || []).length > 0;
  },

  /**
   * Checks to see if a time format contains a space for presenting the day period.
   * @private
   * @param {string} value a string value representing a time format.
   * @returns {boolean} whther or not the time format has day periods.
   */
  hasDayPeriods(value) {
    if (!value) { value = this.settings.timeFormat; }
    return (value.match('a') || []).length > 0;
  },

  /**
   * Gets a Locale-defined version of the time separator.
   * @returns {string} containing the time separator
   */
  getTimeSeparator() {
    return Locale.calendar().dateFormat.timeSeparator;
  },

  /**
   * Rounds the current value of the minutes picker to its nearest interval value.
   * @private
   */
  roundMinutes() {
    if (!this.getBoolean(this.settings.roundToInterval)) {
      return;
    }

    // separate out the minutes value from the rest of the value.
    const val = this.element.val();
    const timeSeparator = this.getTimeSeparator();
    const parts = val ? val.split(timeSeparator) : [];
    const interval = this.settings.minuteInterval;

    if (!parts[1]) {
      return;
    }

    if (!this.is24HourFormat(this.settings.timeFormat)) {
      const periodParts = parts[1].split(' ');
      parts[1] = periodParts[0];
      if (periodParts[1]) {
        parts.push(periodParts[1]);
      }
    }

    parts[1] = parseInt(parts[1], 10);
    if (parts[1] % interval === 0) {
      return;
    }

    parts[1] = Math.round(parts[1] / interval) * interval;

    parts[1] = parts[1].toString();
    parts[1] = (parts[1].length < 2 ? '0' : '') + parts[1];

    if (parts[1] === '60') {
      parts[1] = '00';
      parts[0] = (parseInt(parts[0], 10) + 1).toString();
    }

    const newVal = `${parts[0] + timeSeparator + parts[1]} ${parts[2] ? parts[2] : ''}`;
    this.element.val(newVal);
  },

  /**
   * Adds Masked Input and Validation components to the input field at build time.
   * @private
   * @returns {void}
   */
  addMask() {
    if (this.element.data('mask') && typeof this.element.data('mask') === 'object') {
      this.element.data('mask').destroy();
    }
    this.element.data('mask', undefined);

    const maskOptions = {
      keepCharacterPositions: true,
      process: 'date',
      patternOptions: {
        format: this.settings.timeFormat
      }
    };

    let validation = 'time';
    let events = { time: 'blur' };
    const customValidation = this.element.attr('data-validate');
    const customEvents = this.element.attr('data-validation-events');

    if (customValidation === 'required' && !customEvents) {
      validation = `${customValidation} ${validation}`;
      $.extend(events, {
        required: 'change blur'
      });
    } else if (!!customValidation && !!customEvents) {
      // Remove default validation, if found "no-default-validation" string in
      // "data-validate" attribute
      if (customValidation.indexOf('no-default-validation') > -1) {
        validation = customValidation.replace(/no-default-validation/g, '');
        events = $.fn.parseOptions(this.element, 'data-validation-events');
      } else {
        // Keep default validation along custom validation
        validation = `${customValidation} ${validation}`;
        $.extend(events, $.fn.parseOptions(this.element, 'data-validation-events'));
      }
    }

    this.element
      .attr('data-validate', validation)
      .attr('data-validation-events', JSON.stringify(events))
      .mask(maskOptions)
      .validate()
      .triggerHandler('updated');
  },

  /**
   * Constructs all markup and subcomponents needed to build the standard Timepicker popup.
   * @private
   * @returns {void}
   */
  buildStandardPopup() {
    const self = this;
    const popupContent = $('<div class="timepicker-popup-content"></div>');
    const timeSeparator = this.getTimeSeparator();
    let textValue = '';
    let selected;

    this.initValues = self.getTimeFromField();
    const timeParts = $('<div class="time-parts"></div>').appendTo(popupContent);

    // Build the inner-picker HTML
    const is24HourFormat = this.is24HourFormat();
    const hasSeconds = this.hasSeconds();
    const hasDayPeriods = this.hasDayPeriods();
    let hourCounter = is24HourFormat ? 0 : 1;
    const maxHourCount = is24HourFormat ? 24 : 13;

    this.hourSelect = $(`<select id="timepicker-hours-${this.id}" data-options="{'noSearch': 'true'}" class="hours dropdown"></select>`);

    while (hourCounter < maxHourCount) {
      selected = '';
      if (parseInt(self.initValues.hours, 10) === hourCounter) {
        selected = ' selected';
      }
      self.hourSelect.append($(`<option${selected}>${self.hourText(hourCounter)}</option>`));
      hourCounter++;
    }
    timeParts.append($(`<label for="timepicker-hours-${this.id}" class="audible">${Locale.translate('Hours')}</label>`));
    timeParts.append(this.hourSelect);
    timeParts.append($(`<span class="label colons">${timeSeparator}</span>`));

    // Minutes Picker
    let minuteCounter = 0;
    this.minuteSelect = $(`<select id="timepicker-minutes-${this.id}" data-options="{'noSearch': 'true'}" class="minutes dropdown"></select>`);

    while (minuteCounter <= 59) {
      textValue = minuteCounter < 10 ? `0${minuteCounter}` : minuteCounter;

      selected = '';
      if (parseInt(self.initValues.minutes, 10) === minuteCounter) {
        selected = ' selected';
      }
      self.minuteSelect.append($(`<option${selected}>${textValue}</option>`));
      minuteCounter += self.settings.minuteInterval;
    }

    // If the value inside the picker doesn't match an interval, add the value
    // as the currently selected option, right at the top
    if (!this.minuteSelect.find('option[selected]').length) {
      this.minuteSelect.prepend($(`<option selected>${self.initValues.minutes}</option>`));
    }

    timeParts.append($(`<label for="timepicker-minutes-${this.id}" class="audible">${Locale.translate('Minutes')}</label>`));
    timeParts.append(this.minuteSelect);

    // Seconds Picker
    if (hasSeconds) {
      let secondCounter = 0;
      this.secondSelect = $(`<select id="timepicker-seconds-${this.id}" data-options="{'noSearch': 'true'}" class="seconds dropdown"></select>`);

      while (secondCounter <= 59) {
        textValue = secondCounter < 10 ? `0${secondCounter}` : secondCounter;

        selected = '';
        if (parseInt(self.initValues.seconds, 10) === secondCounter || (!self.initValues.seconds && textValue === '00')) {
          selected = ' selected';
        }
        this.secondSelect.append($(`<option${selected}>${textValue}</option>`));
        secondCounter += self.settings.secondInterval;
      }

      // If the value inside the picker doesn't match an interval, add the value
      // as the currently selected option, right at the top
      if (!this.secondSelect.find('option[selected]').length) {
        this.secondSelect.prepend($(`<option selected>${self.initValues.seconds}</option>`));
      }

      timeParts.append($(`<span class="label colons">${timeSeparator}</span>`));
      timeParts.append($(`<label for="timepicker-seconds-${this.id}" class="audible">${Locale.translate('Seconds')}</label>`));
      timeParts.append(this.secondSelect);
    }

    if (!is24HourFormat && hasDayPeriods) {
      this.periodSelect = $(`<select id="timepicker-period-${this.id}" data-options="{'noSearch': 'true'}" class="period dropdown"></select>`);
      timeParts.append($('<span class="label colons"></span>'));
      const localeDays = Locale.calendar().dayPeriods;
      let localeCount = 0;
      const regexDay = new RegExp(self.initValues.period, 'i');
      let realDayValue = 'AM'; // AM

      while (localeCount < 2) {
        realDayValue = localeCount === 0 ? 'AM' : 'PM'; // ? AM : PM
        selected = '';
        if (regexDay.test(localeDays[localeCount])) {
          selected = ' selected';
        }
        this.periodSelect.append($(`<option value="${realDayValue}"${selected}>${localeDays[localeCount]}</option>`));

        localeCount++;
      }
      timeParts.append($(`<label for="timepicker-period-${this.id}" class="audible">${Locale.translate('TimePeriod')}</label>`));
      timeParts.append(this.periodSelect);
    }

    if (this.settings.parentElement) {
      this.settings.parentElement.append(popupContent);
      // self.afterShow(this.settings.parentElement);
      self.popup = this.settings.parentElement.find('.timepicker-popup-content').addClass('timepicker-popup').attr('id', 'timepicker-popup');
    } else {
      popupContent.append(`<div class="modal-buttonset"><button type="button" class="btn-modal-primary set-time">${Locale.translate('SetTime')}</button></div>`);

      let placementParent = this.element;
      let placementParentXAlignment = (Locale.isRTL() ? 'right' : 'left');
      const parent = this.element.parent();

      if (parent.is('.datagrid-cell-wrapper')) {
        placementParentXAlignment = 'center';
        placementParent = this.element.next('.icon');
      }

      this.trigger.popover({
        content: popupContent,
        trigger: 'immediate',
        placement: 'bottom',
        placementOpts: {
          parent: placementParent,
          parentXAlignment: placementParentXAlignment,
          strategies: ['flip', 'nudge', 'shrink']
        },
        tooltipElement: '#timepicker-popup'
      })
        .on('show.timepicker', (e, ui) => {
          self.afterShow(ui);
        }).on('hide.timepicker', () => {
          if (self.settings.returnFocus) {
            self.element.focus();
          }
        });
    }

    // Make adjustments to the popup HTML specific to the timepicker
    if (this.trigger.data('tooltip')) {
      self.popup = this.trigger.data('tooltip').tooltip;
      const tooltip = self.popup;
      tooltip.addClass('timepicker-popup');
    }
  },

  /**
   * Handler for the Timepicker Popover's custom `show` event.
   * @private
   * @param {object} ui timepicker popup element
   * @returns {void}
   */
  afterShow(ui) {
    const self = this;

    ui.find('button').button();

    // Set default values based on what's retrieved from the Timepicker's input field.
    this.hourSelect.val(this.initValues.hours);
    this.hourSelect.data('dropdown').pseudoElem.find('span').text(this.initValues.hours);
    this.minuteSelect.val(this.initValues.minutes);
    this.minuteSelect.data('dropdown').pseudoElem.find('span').text(this.initValues.minutes);

    if (this.secondSelect) {
      this.secondSelect.val(this.initValues.seconds);
      this.secondSelect.data('dropdown').pseudoElem.find('span').text(this.initValues.seconds);
    }

    if (self.hasDayPeriods()) {
      this.periodSelect.val(this.initValues.period);
      this.periodSelect.data('dropdown').pseudoElem.find('span').text(this.initValues.period);
    }

    ui.find('div.dropdown').first().focus();
    ui.find('.set-time').off('click.timepicker').on('click.timepicker', (e) => {
      e.preventDefault();
      self.setTimeOnField();
      self.closeTimePopup();
    });

    // Handle Tabbing on the dialog
    if (!this.settings.parentElement) {
      ui.on('keydown.timepicker', 'button, div.dropdown', (e) => {
        const key = e.keyCode || e.charCode || 0;

        if (key === 9) {
          self.containFocus(e);
          e.stopPropagation();
          e.preventDefault();
          return false;
        }
        return true;
      });
    }
  },

  /**
   * Focus the next prev focusable element on the popup
   * @private
   * @param {jQuery.Event} e the event object
   * @returns {void}
   */
  containFocus(e) {
    const reverse = e.shiftKey;

    // Set focus on (opt: next|prev) focusable element
    const focusables = this.popup.find(':focusable');
    let index = focusables.index($(':focus'));
    const next = ((index + 1) >= focusables.length ? 0 : (index + 1));
    const prev = ((index - 1) < 0 ? focusables.length : (index - 1));

    index = (!reverse) ? next : prev;

    focusables.eq(index).focus();
  },

  /**
   * Sets up events that need to be bound to a standard time picker.
   * @private
   * @returns {void}
   */
  setupStandardEvents() {
    const self = this;

    self.popup.on('touchend.timepicker touchcancel.timepicker', '.set-time', (e) => {
      e.preventDefault();
      e.target.click();
    }).on('keydown.timepicker', 'input.dropdown', function (e) {
      let handled = false;

      // Pressing Esc when focused on a closed dropdown menu causes the entire popup to close.
      if (e.which === 27) {
        handled = true;
        self.closeTimePopup();
        self.element.focus();
      }

      // Pressing Spacebar while the popup is open submits with the new time value.
      if (e.which === 32) {
        handled = true;
        self.popup.find('.set-time').click();
      }

      // Left & Right Arrows will switch between the available dropdowns
      if (e.which === 37 || e.which === 39) {
        handled = true;
        const inputs = self.popup.find('input[id$="-shdo"]');

        if (e.which === 37) {
          let prev = inputs.eq(inputs.index(this) - 1);
          if (!prev || prev.length === 0) {
            prev = inputs.eq(inputs.length);
          }
          prev.focus();
        }

        if (e.which === 39) {
          let next = inputs.eq(inputs.index(this) + 1);
          if (!next || next.length === 0) {
            next = inputs.eq(0);
          }
          next.focus();
        }
      }

      if (handled) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      return true;
    });

    // Listen to the popover/tooltip's "hide" event to properly close out the
    // popover's inner controls.
    self.trigger.on('hide.timepicker', () => {
      self.onPopupHide();
    });
  },

  /**
   * Constructs all markup and subcomponents needed to build a Timepicker popup
   * containing a time range.
   * @private
   * @returns {void}
   */
  buildRangePopup() {
    // TODO: Build this
  },

  /**
   * Sets up events that need to be bound to a range timepicker.
   * @private
   * @returns {void}
   */
  setupRangeEvents() {
    // TODO: Build this
  },

  /**
   * Gets the value of the Timepicker field as an object separated into hours,
   * minutes, (optional) seconds, and (optional) day period.
   * @param {string} [value] this method can optionally be passed
   * a string-based time value to calculate instead of the current field's value.
   * @returns {object} containing key/value pairs representing time parts.
   */
  getTimeFromField(value) {
    const self = this;
    let val = value || this.element.val();
    const sep = this.getTimeSeparator();
    let parts;
    let endParts;
    const timeparts = {};

    val = val.replace(/[T\s:.-]/g, sep).replace(/z/i, '');
    parts = val.split(sep);

    // Check the last element in the array for a time period, and add it as an array
    // member if necessary
    if (!this.is24HourFormat()) {
      endParts = parts[parts.length - 1].split(' ');
      parts.pop();
      parts = parts.concat(endParts);
    }

    function isDayPeriod(thisValue) {
      return self.dayPeriods.indexOf(thisValue) > -1;
    }

    function removeLeadingWhitespace(thisValue) {
      return thisValue.replace(/^\s+|\s+$/g, '');
    }

    function addLeadingZero(thisValue) {
      if (!thisValue || isNaN(thisValue)) {
        return '00';
      }
      thisValue = parseInt(thisValue, 10);
      thisValue = thisValue < 10 ? `0${thisValue}` : thisValue;
      return thisValue;
    }

    // Handle Hours
    if (!parts[0] || !parts[0].length || isNaN(parts[0])) {
      parts[0] = '1';
    }

    parts[0] = parseInt(parts[0], 10);
    if (!isNaN(parts[0])) {
      parts[0] = `${parseInt(parts[0], 10)}`;
    }
    timeparts.hours = self.hourText(parts[0]);

    // Handle Minutes
    if (parts[1]) {
      // remove leading whitespace
      parts[1] = removeLeadingWhitespace(parts[1]);
      parts[1] = addLeadingZero(parts[1]);
      timeparts.minutes = parts[1];
    } else {
      timeparts.minutes = '00';
    }

    // Handle Seconds/Period (slot 3)
    function handleSlot2(thisValue) {
      // Should not kick off at all if we don't pass it a value, OR if this field
      // is 24-hour display with no seconds
      if (!thisValue) {
        if (self.hasSeconds()) {
          thisValue = '00';
          timeparts.seconds = thisValue;
        }

        if (!self.is24HourFormat()) {
          thisValue = Locale.translateDayPeriod('AM');
          timeparts.period = thisValue;
        }

        return;
      }

      thisValue = removeLeadingWhitespace(thisValue);

      // Has seconds
      if (self.hasSeconds()) {
        thisValue = addLeadingZero(thisValue);
        timeparts.seconds = thisValue;
        return;
      }
      // No seconds, but has a day period
      if (!isDayPeriod(thisValue)) {
        thisValue = Locale.translateDayPeriod('AM');
      }
      timeparts.period = thisValue;
    }
    handleSlot2(parts[2]);

    // Handle Period after seconds (slot 4)
    if (parts[3]) {
      parts[3] = removeLeadingWhitespace(parts[3]);
      timeparts.period = parts[3];
    } else if (!this.is24HourFormat() && this.hasSeconds()) {
      timeparts.period = Locale.translateDayPeriod('AM');
    }

    return timeparts;
  },

  /**
   * Retrieves the values from the Timepicker popup's pickers and uses those values to set
   * the contents of the Timepicker field.
   * @returns {void}
   */
  setTimeOnField() {
    const hours = $(`#timepicker-hours-${this.id}`).val() || '';
    const minutes = $(`#timepicker-minutes-${this.id}`).val() || '';
    const seconds = $(`#timepicker-seconds-${this.id}`).val() || '';
    let period = ($(`#timepicker-period-${this.id}`).val() || '').toUpperCase();
    const sep = this.getTimeSeparator();
    let timeString = `${hours}${sep}${minutes}${this.hasSeconds() ? sep + seconds : ''}`;

    period = (!this.is24HourFormat() && period === '') ? $(`#timepicker-period-${this.id}-shdo`).val() : period;
    timeString += period ? ` ${Locale.translateDayPeriod(period)}` : '';

    /**
    * Fires when the value is changed by typing or the picker.
    * @event close
    * @memberof TimePicker
    * @property {object} event - The jquery event object
    */
    this.element.val(timeString)
      .trigger('change');

    this.element
      .focus();
  },

  /**
   * Return whether or not the Timepicker popup is open.
   * @returns {boolean} whether or not the Timepicker popup is open.
   */
  isOpen() {
    return (this.popup && !this.popup.hasClass('is-hidden'));
  },

  /**
   * Opens the Timepicker popup, intializing all the dropdown elements and
   * setting up internal events.
   * @returns {void}
   */
  openTimePopup() {
    const self = this;

    // Get all current settings.
    self.setup();

    if (this.element.is(':disabled') || this.element.attr('readonly')) {
      return;
    }

    if (this.popup && !this.popup.hasClass('is-hidden')) {
      self.closeTimePopup();
    }

    this.element.addClass('is-active is-open');

    // Build a different Time Popup based on settings
    if (self.settings.mode === 'range') {
      self.buildRangePopup();
      self.setupRangeEvents();
    } else {
      self.buildStandardPopup();
      self.setupStandardEvents();
    }

    this.element.attr({ 'aria-expanded': 'true' });
    this.popup.find('div.dropdown').first().focus();
  },

  /**
   * Triggers the "hide" method on the tooltip plugin.  The Timepicker officially
   * "closes" after the popover's hide event fully completes because certain events
   * need to be turned off and certain markup needs to be removed only AFTER
   * the popover is hidden.
   * @returns {void}
   */
  closeTimePopup() {
    if (this.trigger.data('tooltip')) {
      this.trigger.data('tooltip').hide();
    }
  },

  /**
   * Handles the time popover's "hide" event
   * @private
   * @returns {void}
   */
  onPopupHide() {
    if (this.settings.mode === 'standard') {
      $(`#timepicker-hours-${this.id}`).data('dropdown').destroy();
      $(`#timepicker-minutes-${this.id}`).data('dropdown').destroy();
      if (this.hasSeconds()) {
        $(`#timepicker-seconds-${this.id}`).data('dropdown').destroy();
      }
      if (this.hasDayPeriods()) {
        $(`#timepicker-period-${this.id}`).data('dropdown').destroy();
      }
      this.popup.off('click.timepicker touchend.timepicker touchcancel.timepicker keydown.timepicker');
    }
    this.element.attr({ 'aria-expanded': 'false' });
    this.trigger.off('hide.timepicker show.timepicker');
    this.trigger.data('tooltip').destroy();
    this.trigger.data('tooltip', undefined);
    $('#timepicker-popup').remove();
    this.element.removeClass('is-active is-open');
  },

  /**
   * Toggles the visibility of the Timepicker popup.
   * @returns {void}
   */
  toggleTimePopup() {
    if (this.isOpen()) {
      this.closeTimePopup();
    } else {
      this.openTimePopup();
    }
  },

  /**
   * Getter method for retrieving the value of the Timepicker.
   * @param {boolean} removePunctuation Gets rid of all the value's punctuation on return.
   * @returns {string} the current timepicker value
   */
  value(removePunctuation) {
    let val = this.element.val();
    if (!removePunctuation || removePunctuation === false) {
      return val;
    }

    const timeSeparator = Locale.calendar().dateFormat.timeSeparator;
    const sepRegex = new RegExp(timeSeparator, 'g');

    // Remove punctuation
    val = val.replace(sepRegex, '');

    // Add leading zero for times without a double digit hour
    const parts = val.split(' ');
    if (parts[0].length < 4) {
      val = `0${parts[0]}${parts[1] ? parts[1] : ''}`;
    }

    return val;
  },

  /**
   * Enables the Timepicker
   * @returns {void}
   */
  enable() {
    this.element.removeAttr('disabled readonly').closest('.field').removeClass('is-disabled');
  },

  /**
  * Set input to readonly.
  * @returns {void}
  */
  readonly() {
    this.enable();
    this.element.attr('readonly', 'readonly');
  },

  /**
   * Disables the Timepicker
   * @returns {void}
   */
  disable() {
    this.enable();
    this.element.attr('disabled', 'disabled').closest('.field').addClass('is-disabled');
  },

  /**
   * Detects whether or not the component is disabled
   * @returns {boolean} whether or not the component is disabled
   */
  isDisabled() {
    return this.element.prop('disabled');
  },

  /**
   * Convert a string to boolean
   * @private
   * @param {string} val a text string ("true" or "false") that can be converted to a boolean.
   * @returns {boolean}
   */
  // TODO: Move this to Soho.utils?
  getBoolean(val) {
    const num = +val;
    return !isNaN(num) ? !!num : !!String(val).toLowerCase().replace(!!0, '');
  },

  /**
   * Updates the component instance.  Can be used after being passed new settings.
   * @param {object} [settings] incoming settings
   * @returns {this} component instanceof
   */
  updated(settings) {
    if (settings) {
      this.settings = utils.mergeSettings(this.element[0], settings, this.settings);
    }

    return this
      .teardown()
      .init();
  },

  /**
   * Removes all event bindings, subcomponents and unnecessary markup from this component instance.
   * @private
   * @returns {this} component instance
   */
  teardown() {
    this.trigger.off('keydown.timepicker');
    this.element.off('focus.timepicker blur.timepicker keydown.timepicker');
    if (this.popup) {
      this.closeTimePopup();
    }

    this.trigger.remove();

    const mask = this.element.data('mask');
    if (mask && typeof mask.destroy === 'function') {
      mask.destroy();
    }

    $.removeData(this.element[0], 'validate');
    $.removeData(this.element[0], 'validationEvents');
    this.element.removeAttr('data-validate').removeData('validate validationEvents');

    this.label.find('.audible').remove();

    return this;
  },

  /**
   * Destroys the component instance.
   * @returns {void}
   */
  destroy() {
    this.teardown();
    $.removeData(this.element[0], COMPONENT_NAME);
  },

  /**
   * Sets up event listeners for the timepicker instance.
   * @fires TimePicker#events
   * @listens click  &nbsp;-&nbsp;
   * @listens touchstart  &nbsp;-&nbsp;
   * @listens touchmove  &nbsp;-&nbsp;
   * @listens touchend  &nbsp;-&nbsp;
   * @listens blur  &nbsp;-&nbsp;
   * @returns {this} component instance
   */
  handleEvents() {
    const self = this;
    this.trigger.on('click.timepicker', () => {
      self.toggleTimePopup();
    });

    this.handleKeys();
    this.handleBlur();

    return this;
  }
};

export { TimePicker, COMPONENT_NAME };
