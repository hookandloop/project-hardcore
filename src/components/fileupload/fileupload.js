import * as debug from '../../utils/debug';
import { utils } from '../../utils/utils';
import { Locale } from '../locale/locale';

// Component Name
const COMPONENT_NAME = 'fileupload';

/**
* A list of items with add/remove/delete and sort functionality.
* @class FileUpload
* @constructor
*
* @param {jQuery[]|HTMLElement} element The component element.
* @param {object} [settings] The component settings.
*/

const FILEUPLOAD_DEFAULTS = {
};

function FileUpload(element, settings) {
  this.element = $(element);
  this.settings = utils.mergeSettings(this.element[0], settings, FILEUPLOAD_DEFAULTS);
  debug.logTimeStart(COMPONENT_NAME);
  this.init();
  debug.logTimeEnd(COMPONENT_NAME);
}

// FileUpload Methods
FileUpload.prototype = {

  init() {
    this.build();
  },

  // Example Method
  build() {
    const self = this;
    const elem = this.element;
    const hasInlineLabel = !elem.is('input.fileupload');

    this.fileInput = hasInlineLabel ? elem.find('input') : elem;

    elem.closest('.field').addClass('field-fileupload');

    // append markup
    let id = elem.find('input').attr('name');
    if (!hasInlineLabel) {
      id = elem.attr('id') || elem.attr('name');
    }

    let elemClass = !hasInlineLabel ? elem.attr('class') : elem.find('input').attr('class');
    elemClass = elemClass ? ` ${elemClass}` : '';

    const instructions = Locale.translate('FileUpload');
    let label = $(`<label for="${id}-filename">${elem.text()} <span class="audible">${instructions}</span></label>`);
    const shadowField = $(`<input readonly id="${id}-filename" class="fileupload-background-transparent${elemClass}" type="text">`);
    const svg = `<span class="trigger" tabindex="-1">${$.createIcon('folder')}</span>`;
    const svgClose = `<span class="trigger-close" tabindex="-1">${$.createIcon('close')}</span>`;

    if (!hasInlineLabel) {
      let orgLabel = elem.prev('label');

      // Could be wrapped (angular)
      if (orgLabel.length === 0) {
        orgLabel = elem.parent().prev('label');
      }

      label = $(`<label for="${(elem.attr('id') || elem.attr('name'))}-filename">${orgLabel.text()}</label>`);
      elem.before(label, shadowField);
      this.fileInput.after(svgClose);
      this.fileInput.after(svg);
      orgLabel.addClass('audible').append(`<span class="audible">${instructions}</span>`);
    } else {
      elem.before(label, shadowField);
      this.fileInput.after(svgClose);
      this.fileInput.after(svg);
    }

    // if there is a value attribute, then this will be used as the current value since unable to set files[0].name
    // move it to the text input and remove it off the file input
    const fileInputValue = this.fileInput.attr('value');
    if (fileInputValue && fileInputValue.length > 0) {
      shadowField.val(fileInputValue);
      this.fileInput.attr('value', '');
    }

    this.textInput = shadowField;
    this.svg = elem.parent().find('.trigger');
    this.svgClose = elem.parent().find('.trigger-close');

    /*
    * Added Keydown for Keyboard Backspace and remove Keypress because it doesn't detect Backspace
    */
    this.textInput.on('keydown.fileupload', (e) => {
      let handle = false;
      if (e.which === 13 || e.which === 32) {
        elem.parent().find('[type="file"]').trigger('click');
        handle = true;
      } else if (e.which === 8) {
        this.clearUploadFile();
        handle = true;
      }
      if (handle) {
        e.stopPropagation();
      }
    });

    this.svg.on('click.fileupload', (e) => {
      this.fileInput.trigger('click');
      if (hasInlineLabel) {
        this.fileInput.data(`handleEvent${[(e.type || '')]}`, e.handleObj);
      }
    });

    this.svgClose.on('click.fileupload', (e) => {
      this.clearUploadFile();
      if (hasInlineLabel) {
        this.fileInput.data(`handleEvent +${[(e.type || '')]}`, e.handleObj);
      }
    });

    if (this.fileInput.is(':disabled')) {
      this.textInput.prop('disabled', true);
    }

    if (elem.hasClass('required')) {
      label.addClass('required');
      elem.removeClass('required');
    }

    if (this.fileInput.attr('data-validate')) {
      this.textInput.attr('data-validate', this.fileInput.attr('data-validate'));
      this.textInput.validate();
    }

    if (this.fileInput.attr('readonly')) {
      this.textInput.prop('disabled', false);
      this.textInput[0].classList.remove('fileupload-background-transparent');
      this.fileInput.attr('disabled', 'disabled');
    }

    /*
    * New Event for File Upload Change
    */
    this.fileInput.on('change.fileupload', function () {
      if (this.files.length > 0) {
        self.textInput.val(this.files[0].name);
        self.svgClose.show().addClass('is-visible');
      } else {
        self.clearUploadFile();
      }
    });

    // Fix - Not to buble events when clicked on trigger/close icons
    this.fileInput.on('click.fileupload', (e) => {
      const handleEventData = this.fileInput.data(`handleEvent${[(e.type || '')]}`);
      if (handleEventData &&
          handleEventData.type === e.type &&
          e.handleObj.namespace === 'fileupload') {
        this.fileInput.data(`handleEvent${[(e.type || '')]}`, null);
        e.preventDefault();
      }
    });

    // Fix: not sure why, but some browser(ie. safari) need to rerender,
    // some rules were not applying from css file
    self.fileInput.css({ position: 'static', left: 0 });
    setTimeout(() => {
      self.fileInput.css({ position: 'fixed', left: '-10000px' });
    }, 0);
  },

  /*
  * Clear the Input Upload File
  */
  clearUploadFile() {
    const val = this.fileInput.val();
    this.fileInput.add(this.textInput).val('');
    this.svgClose.hide().removeClass('is-visible');
    if (val !== '') {
      this.fileInput.triggerHandler('change');
    }
  },

  // Unbind all events
  unbind() {
    this.svg.add(this.svgClose).off('click.fileupload');
    this.fileInput.off('change.fileupload');
    this.textInput.off('keydown.fileupload');

    this.element.closest('.field-fileupload')
      .removeClass('field-fileupload')
      .find('>label:first, >[type="text"]:first, .trigger, .trigger-close, .icon-dirty, .msg-dirty').remove();

    return this;
  },

  /**
   * Resync the UI and Settings.
   * @param {object} settings The settings to apply.
   * @returns {object} The api
   */
  updated(settings) {
    if (typeof settings !== 'undefined') {
      this.settings = utils.mergeSettings(this.element, settings, FILEUPLOAD_DEFAULTS);
    }
    // Nothing to do here as there are no settings.
    return this;
  },

  /**
  * Teardown process for this plugin
  * @returns {void}
  */
  destroy() {
    this.unbind();
    $.removeData(this.element[0], COMPONENT_NAME);
  },

  /**
  * Disable the input and button.
  * @returns {void}
  */
  disable() {
    this.textInput.prop('disabled', true);
    this.fileInput.prop('disabled', true);
  },

  /**
  * Enable the input and button.
  * @returns {void}
  */
  enable() {
    this.textInput.prop('disabled', false).prop('readonly', false);
    this.fileInput.removeAttr('disabled');
  },

  /**
  * Make the input readonly and disable the button.
  * @returns {void}
  */
  readonly() {
    this.textInput.prop('readonly', true);
    this.fileInput.prop('disabled', true);

    this.textInput.prop('disabled', false);
    this.textInput.removeClass('fileupload-background-transparent');
  }

};

export { FileUpload, COMPONENT_NAME };
