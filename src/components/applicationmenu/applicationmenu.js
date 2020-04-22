/* eslint-disable no-underscore-dangle, prefer-arrow-callback */
import { utils } from '../../utils/utils';
import { Environment as env } from '../../utils/environment';
import { breakpoints } from '../../utils/breakpoints';
import { Locale } from '../locale/locale';

// jQuery Components
import '../../utils/lifecycle/lifecycle.jquery';
import '../accordion/accordion.jquery';
import '../searchfield/searchfield.jquery';

// Name of the component in this file.
const COMPONENT_NAME = 'applicationmenu';

/**
 * The Application Menu provides access to all the functions, pages, and forms in an application.
 * @class ApplicationMenu
 * @param {object} element The element that gets the plugin established on it.
 * @param {object} [settings] The settings to use on this instance.
 * @param {string} [settings.breakpoint='phone-to-tablet'] Can be 'tablet' or 'phone-to-tablet' (+767),
 * 'phablet (+610)', 'desktop' +(1024) or 'tablet-to-desktop' (+1280). Default is 'phone-to-tablet' (767)
 * @param {boolean} [settings.dismissOnClickMobile=false] If true, causes a clicked menu option to dismiss on click when the responsive view is shown.
 * @param {boolean} [settings.filterable=false] If true a search / filter option will be added.
 * @param {boolean} [settings.filterMode='contains'] corresponds to a ListFilter component's `filterMode` for matching results.
 * @param {boolean} [settings.openOnLarge=false]  If true, will automatically open the Application Menu when a large screen-width breakpoint is met.
 * @param {array} [settings.triggers=[]]  An Array of jQuery-wrapped elements that are able to open/close this nav menu.
 */
const APPLICATIONMENU_DEFAULTS = {
  breakpoint: 'phone-to-tablet',
  dismissOnClickMobile: false,
  filterable: false,
  filterMode: 'contains',
  openOnLarge: false,
  triggers: ['.application-menu-trigger'],
  onExpandSwitcher: null,
  onCollapseSwitcher: null,
};

function ApplicationMenu(element, settings) {
  this.element = $(element);
  this.settings = utils.mergeSettings(this.element[0], settings, APPLICATIONMENU_DEFAULTS);

  return this.init();
}

// Plugin Methods
ApplicationMenu.prototype = {

  /**
   * @returns {SearchField|undefined} an IDS SearchField API, if one exists.
   */
  get searchfieldAPI() {
    if (!this.searchfield || !this.searchfield.length) {
      return undefined;
    }
    return this.searchfield.data('searchfield');
  },

  /**
   * Initialize the plugin.
   * @private
   * @returns {void}
   */
  init() {
    this
      .setup()
      .handleEvents();
  },

  /**
   * @private
   * @returns {this} component instance
   */
  setup() {
    this.hasTrigger = false;
    this.isAnimating = false;

    if (this.element.find('.application-menu-footer').length) {
      this.element.addClass('has-menu-footer');
    }

    if (!this.hasTriggers()) {
      this.triggers = $();
    }

    this.menu = this.element;

    const openOnLarge = this.element.attr('data-open-on-large');
    this.settings.openOnLarge = openOnLarge !== undefined ? openOnLarge === 'true' : this.settings.openOnLarge;

    const dataBreakpoint = this.element.attr('data-breakpoint');
    this.settings.breakpoint = breakpoints[dataBreakpoint] !== undefined ?
      dataBreakpoint : this.settings.breakpoint;

    // Pull in the list of Nav Menu trigger elements and store them internally.
    this.modifyTriggers(this.settings.triggers, false, true);

    this.scrollTarget = this.menu.parents('.header');
    const masthead = this.menu.prevAll('.masthead');
    const moduleTabs = this.menu.prevAll('.module-tabs');

    if (masthead.length > 0) {
      this.scrollTarget = masthead;
      this.menu.addClass('short');
    }
    if (moduleTabs.length > 0) {
      this.scrollTarget = moduleTabs;
    }

    this.element.find('.application-menu-switcher-panel .accordion').accordion();
    this.accordion = this.menu.find('.accordion').last();
    this.accordion.addClass('panel').addClass('inverse');

    // Check to make sure that the internal Accordion Control is invoked
    let accordion = this.accordion.data('accordion');
    if (!accordion) {
      this.accordion.accordion();
      accordion = this.accordion.data('accordion');
    }
    this.accordionAPI = accordion;

    // detect the presence of a searchfield
    this.searchfield = this.element.find('.searchfield, .searchfield-wrapper');

    // Setup filtering, if applicable.
    if (this.settings.filterable && typeof $.fn.searchfield === 'function') {
      if (this.searchfield.length) {
        if (this.searchfield.is('.searchfield-wrapper')) {
          this.searchfield = this.searchfield.children('.searchfield');
        }
      } else {
        this.searchfield = $(`${'<div class="searchfield-wrapper">' +
          '<label for="application-menu-searchfield">'}${Locale.translate('Search')}</label>` +
          '<input id="application-menu-searchfield" class="searchfield" /></div>').prependTo(this.element);
      }

      this.element.addClass('has-searchfield');
      const self = this;
      this.searchfield.searchfield({
        clearable: true,
        filterMode: this.settings.filterMode,
        source(term, done, args) {
          done(term, self.accordion.data('accordion').toData(true, true), args);
        },
        searchableTextCallback(item) {
          return item.text || item.contentText || '';
        },
        resultIteratorCallback(item) {
          item.highlightTarget = 'text';
          return item;
        },
        clearResultsCallback() {
          if (self.searchfieldAPI && !self.searchfieldAPI.isFocused) {
            self.accordionAPI.unfilter();
          }
        },
        displayResultsCallback(results, done, term) {
          return self.filterResultsCallback(results, done, term);
        }
      });

      this.searchfield.on(`cleared.${COMPONENT_NAME}`, () => {
        self.accordionAPI.unfilter();
      });
    }

    // Sync with application menus that have an 'is-open' CSS class.
    // Otherwise, just adjust the height.
    if (this.isOpen()) {
      this.openMenu(false, false, true);
    } else {
      this.adjustHeight();
    }

    // Handle Role Switcher with events and classes
    const switchTrigger = this.element.find('.application-menu-switcher-trigger');
    if (switchTrigger.length > 0) {
      this.switcherPanel = switchTrigger.next('.expandable-area');

      const expandableArea = this.switcherPanel.data('expandablearea');
      if (!expandableArea) {
        this.switcherPanel.expandablearea();
      }

      this.switcherPanel.on('beforeexpand.applicationmenu', () => {
        const height = this.element.height();

        this.element.addClass('has-open-switcher');
        this.switcherPanel.find('.content').height(height - 71); // The height of the visible header part

        if (this.settings.onExpandSwitcher) {
          this.settings.onExpandSwitcher(this, this.element, this.settings);
        }
      }).on('aftercollapse.applicationmenu', () => {
        this.element.removeClass('has-open-switcher');
        if (this.settings.onCollapseSwitcher) {
          this.settings.onCollapseSwitcher(this, this.element, this.settings);
        }
      });
    }
    return this;
  },

  /**
   * Gets a reference to this Application Menu's adjacent container element.
   * @returns {jQuery[]} the adjacent container element
   */
  getAdjacentContainerElement() {
    let container = this.element.next('.page-container');
    if (!container.length) {
      container = $('body');
    }
    return container;
  },

  /**
   * Setup click events on this.element if it's not the menu itself.
   * (this means that it's a trigger button).
   * @returns {void}
   */
  handleTriggerEvents() {
    const self = this;

    function triggerClickHandler(e) {
      // Don't allow hamburger buttons that have changed state to activate/deactivate the app menu.
      if ($(e.currentTarget).find('.icon.app-header').hasClass('go-back')) {
        return false;
      }

      if (self.isAnimating) {
        return false;
      }

      const isOpen = self.menu.hasClass('is-open');
      if (!isOpen) {
        self.openMenu(undefined, true);
      } else {
        self.closeMenu(true);
      }
      return true;
    }

    if (this.triggers.length) {
      this.triggers.off('click.applicationmenu').on('click.applicationmenu', triggerClickHandler);
    }

    $(document).on('keydown.applicationmenu', (e) => {
      self.handleKeyDown(e);
    });
  },

  /**
   * Handles Keydown Events on the App Menu
   * @param {jQuery.Event} e `keydown` events
   * @returns {boolean} whether or not the keydown event was successful
   */
  handleKeyDown(e) {
    const key = e.which;

    if (key === 121 && !e.shiftKey) { // F10 - opens the menu
      e.preventDefault();

      if (this.isOpen()) {
        this.closeMenu(true);
        if (this.triggers.length) {
          this.triggers.eq(0).focus();
        }
      } else {
        this.openMenu();
      }

      return false;
    }

    return true;
  },

  /**
   * Adds a visual badge-style notification to an Application Menu accordion header
   * @param {jQuery[]} anchor the anchor to target
   * @param {number} value the numeric value to attach
   * @returns {jQuery[]|undefined} a reference to the new tag markup, if applicable
   */
  notify(anchor, value) {
    if (!anchor || anchor === undefined) {
      return undefined;
    }
    if (anchor instanceof HTMLElement) {
      anchor = $(anchor);
    }
    if (!anchor.is('a')) {
      return undefined;
    }

    let tag = anchor.find('.tag');

    // Close the tag if an undefined or '0' value is passed
    if (!value || value === undefined || parseInt(value, 10) === 0) {
      if (tag.length) {
        tag.remove();
      }
      return undefined;
    }

    if (!tag.length) {
      tag = $('<span class="tag"></span>').appendTo(anchor);
    }

    tag.text(value.toString());
    return tag;
  },

  /**
   * Adjusts the application menu's height to fit the page.
   * @private
   * @returns {void}
   */
  adjustHeight() {
    const isSticky = this.scrollTarget.is('.is-sticky');
    const totalHeight = this.scrollTarget.outerHeight(true);
    let offset = totalHeight - (!isSticky ? $(window).scrollTop() : 0);

    if (this.scrollTarget.prev().is('.masthead')) {
      offset += this.scrollTarget.prev().outerHeight(true);
    }

    this.menu[0].style.height = offset > 0 ? (`calc(100% - ${offset}px)`) : '100%';
  },

  /**
   * Toggle scroll css class on ie11.
   * @private
   * @returns {void}
   */
  toggleScrollClass() {
    if (env.browser.name === 'ie' && env.browser.version === '11') {
      const el = this.element[0];
      if (el && el.classList.contains('has-menu-footer')) {
        if (el.scrollHeight > el.clientHeight) {
          el.classList.add('has-scrollbar');
        } else {
          el.classList.remove('has-scrollbar');
        }
      }
    }
  },

  /**
   * Checks the window size against the defined breakpoint.
   * @private
   * @returns {boolean} whether or not the window size is larger than the
   *  settings-defined breakpoint
   */
  isLargerThanBreakpoint() {
    return breakpoints.isAbove(this.settings.breakpoint);
  },

  /**
   * Detects whether or not the application menu is open
   * @returns {boolean} whether or not the application menu is open
   */
  isOpen() {
    return this.menu[0].classList.contains('is-open');
  },

  /**
   * Detects a change in breakpoint size that can cause the Application Menu's state to change.
   * @returns {void}
   */
  testWidth() {
    if (this.isOpen()) {
      if (breakpoints.isAbove(this.settings.breakpoint)) {
        this.element[0].classList.remove('show-shadow');
        return;
      }

      this.element[0].classList.add('show-shadow');

      if (this.isAnimating) {
        return;
      }

      if (!this.userOpened) {
        this.closeMenu();
      }
      return;
    }

    if (breakpoints.isBelow(this.settings.breakpoint)) {
      return;
    }

    if (this.userClosed || !this.settings.openOnLarge || this.isAnimating) {
      return;
    }

    this.openMenu(true);
  },

  /**
   * Opens the Application Menu
   * @param {boolean} noFocus If true, sets focus on the first item in the application menu.
   * @param {boolean} [userOpened] If true, notifies the component that the menu was
   *  manually opened by the user.
   * @param {boolean} [openedByClass] If true, only adjusts bare-miniumum requirements
   *  for the application menu to appear open (should be used in cases where the application
   *  menu has the `is-open` CSS appended to it via markup).  This skips events, animation, etc.
   */
  openMenu(noFocus, userOpened, openedByClass) {
    if (this.isAnimating === true) {
      return;
    }

    const self = this;
    const transitionEnd = $.fn.transitonEndName;

    if (!openedByClass) {
      this.isAnimating = true;
    }
    this.adjustHeight();

    function isOpen() {
      if (self.timeout !== null) {
        clearTimeout(self.timeout);
        self.timeout = null;
      }

      if (userOpened) {
        self.userOpened = true;
        self.userClosed = undefined;
      }

      /**
      * Fires the menu is opened
      *
      * @event applicationmenuopen
      * @memberof ApplicationMenu
      * @param {object} event - The jquery event object
      */
      if (!openedByClass) {
        self.isAnimating = false;
        self.element.trigger('applicationmenuopen');
        $('body').triggerHandler('resize');
      }

      self.toggleScrollClass();
      self.menu.removeClass('no-transition');
      $('.page-container').removeClass('no-transition');
    }

    this.triggers.each(function () {
      const trig = $(this);
      if (trig.parents('.header').length > 0 || trig.parents('.masthead').length > 0) {
        const header = trig.parents('.header, .masthead');
        if (header.parents('.page-container').length) {
          return;
        }

        trig.find('.icon.app-header').removeClass('go-back').addClass('close');
        trig.trigger('icon-change');
      }
    });

    // Animate the application menu open.
    // If opened by class, `is-open` is already applied to the app menu at this
    // point in the render cycle, and should not be re-applied.
    if (!openedByClass) {
      this.menu.off(`${transitionEnd}.applicationmenu`);
      this.menu[0].style.display = '';
      // next line forces a repaint
      // eslint-disable-next-line
      this.menu[0].offsetHeight;
      this.menu.addClass('is-open');
      if (env.features.touch) {
        $('body').addClass('is-open-touch');
      }
    }

    if (breakpoints.isBelow(this.settings.breakpoint)) {
      this.menu.addClass('show-shadow');
    }

    if (!noFocus || noFocus !== true) {
      this.menu.find('.is-selected > a').focus();
    }

    if (env.os.name === 'ios') {
      const container = this.getAdjacentContainerElement();
      container.addClass('ios-click-target');
    }

    if (!openedByClass) {
      this.menu.one(`${transitionEnd}.applicationmenu`, isOpen);
      this.timeout = setTimeout(isOpen, 300);
    } else {
      isOpen();
    }

    // Events that will close the nav menu
    // On a timer to prevent conflicts with the Trigger button's click events
    setTimeout(() => {
      $(document).on('click.applicationmenu', (e) => {
        if ($(e.target).parents('.application-menu').length < 1 && !self.isLargerThanBreakpoint()) {
          self.closeMenu(true);
        }
      });
    }, 0);
  },

  /**
   * Closes the Application Menu
   * @param {boolean} [userClosed] if true, sets a flag notifying the component
   *  that the user was responsible for closing.
   */
  closeMenu(userClosed) {
    if (this.isAnimating === true) {
      return;
    }

    const self = this;
    const transitionEnd = $.fn.transitionEndName();

    this.isAnimating = true;

    function close() {
      if (self.timeout !== null) {
        clearTimeout(self.timeout);
        self.timeout = null;
      }

      self.menu.off(`${transitionEnd}.applicationmenu`);
      self.menu[0].style.display = 'none';
      self.isAnimating = false;

      if (userClosed) {
        self.userOpened = undefined;
        self.userClosed = true;
      }

      /**
      * Fires the menu is closed
      *
      * @event applicationmenuclose
      * @memberof ApplicationMenu
      * @param {object} event - The jquery event object
      */
      self.element.trigger('applicationmenuclose');
      $('body').triggerHandler('resize');
    }

    this.triggers.each(function () {
      const trig = $(this);
      if (trig.parents('.header').length > 0 || trig.parents('.masthead').length > 0) {
        trig.find('.icon.app-header').removeClass('close');
        trig.trigger('icon-change');
      }
    });

    if (env.os.name === 'ios') {
      const container = this.getAdjacentContainerElement();
      container.removeClass('ios-click-target');
    }

    this.menu.one(`${transitionEnd}.applicationmenu`, close);
    this.timeout = setTimeout(close, 300);

    this.menu.removeClass('is-open show-shadow').find('[tabindex]');
    $(document).off('click.applicationmenu');

    if (env.features.touch) {
      $('body').removeClass('is-open-touch');
    }
  },

  /**
   * Detects whether or not the Application Menu has external trigger buttons setup to control it.
   * @returns {boolean} whether or not external triggers have been defined.
   */
  hasTriggers() {
    return (this.triggers !== undefined && this.triggers instanceof $ && this.triggers.length);
  },

  /**
   * Externally Facing function that can be used to add/remove application nav menu triggers.
   * @param {Array[]} triggers an array of HTMLElements or jQuery-wrapped elements that
   *  will be used as triggers.
   * @param {boolean} [remove] if defined, triggers that are defined will be removed
   *  internally instead of added.
   * @param {boolean} [norebuild] if defined, this control's events won't automatically
   *  be rebound to include the new triggers.
   */
  modifyTriggers(triggers, remove, norebuild) {
    if (!triggers || !triggers.length) {
      return;
    }
    let changed = $();

    $.each(triggers, (i, obj) => {
      changed = changed.add($(obj));
    });

    this.triggers = this.triggers[!remove ? 'add' : 'not'](changed);
    this.handleTriggerEvents();

    if (norebuild && norebuild === true) {
      return;
    }

    this.updated();
  },

  /**
   * @param {array} results list of items that passed the filtering process.
   * @param {function} done method to be called when the display of filtered items completes.
   * @param {string} term the filter term.
   * @returns {void}
   */
  filterResultsCallback(results, done) {
    if (!results || !results.length) {
      this.accordionAPI.unfilter();
      done();
      return;
    }

    const targets = $(results.map(item => item.element));
    this.accordionAPI.filter(targets, true);

    this.element.triggerHandler('filtered', [results]);
    done();
  },

  /**
   * handles the Searchfield Input event
   * @param {jQuery.Event} e jQuery `input` event
   */
  handleSearchfieldInputEvent() {
    if (!this.searchfield || !this.searchfield.length) {
      return;
    }

    const val = this.searchfield.val();

    if (!val || val === '') {
      const filteredParentHeaders = this.accordion.find('.has-filtered-children');
      this.accordionAPI.headers.removeClass('filtered has-filtered-children');
      this.accordionAPI.collapse(filteredParentHeaders);
      this.accordionAPI.updated();
      this.element.triggerHandler('filtered', [[]]);
    }
  },

  /**
   * @returns {void}
   */
  handleDismissOnClick() {
    if (!this.settings.dismissOnClickMobile) {
      return;
    }

    this.userOpened = false;
    if (this.isLargerThanBreakpoint()) {
      return;
    }

    this.closeMenu();
  },

  /**
   * Closes the switcher panel area controlled by switcher
   */
  closeSwitcherPanel() {
    if (this.switcherPanel) {
      const expandableArea = this.switcherPanel.data('expandablearea');
      if (expandableArea) {
        expandableArea.close();
        if (this.settings.dismissOnClickMobile) {
          this.userOpened = false;
          if (this.isLargerThanBreakpoint()) {
            return;
          }

          this.closeMenu();
        }
      }
    }
  },

  /**
   * Unbinds event listeners and removes extraneous markup from the Application Menu.
   * @returns {this} component instance
   */
  teardown() {
    this.menu
      .off('animateopencomplete animateclosedcomplete')
      .removeClass('short')
      .removeAttr('style');

    $(window).off('scroll.applicationmenu');
    $('body').off('resize.applicationmenu');

    $(document).off([
      'click.applicationmenu',
      'open-applicationmenu',
      'close-applicationmenu',
      'dismiss-applicationmenu',
      'keydown.applicationmenu'
    ].join(' '));

    this.element.find('.expandable-area').off([
      'beforeexpand.applicationmenu',
      'aftercollapse.applicationmenu'
    ].join(' '));

    this.accordion.off([
      'blur.applicationmenu',
      'selected.applicationmenu',
      'followlink.applicationmenu',
      'afterexpand.applicationmenu',
      'aftercollapse.applicationmenu'
    ].join(' '));

    if (this.accordionAPI && typeof this.accordionAPI.destroy === 'function') {
      if (this.isFiltered) {
        this.accordionAPI.collapse();
      }
      this.accordionAPI.destroy();
    }

    if (this.switcherPanel) {
      this.switcherPanel.off([
        'beforeexpand.applicationmenu',
        'aftercollapse.applicationmenu'
      ].join(' '));
    }

    if (this.searchfield && this.searchfield.length) {
      this.searchfield.off([
        'input.applicationmenu',
        `cleared.${COMPONENT_NAME}`
      ].join(' '));
      const sfAPI = this.searchfield.data('searchfield');
      if (sfAPI) {
        sfAPI.destroy();
      }
    }

    if (this.hasTriggers()) {
      this.triggers.off('click.applicationmenu');
    }

    return this;
  },

  /**
   * Triggers a UI Resync.
   * @param {object} [settings] incoming settings
   * @returns {this} component instance
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
   * Teardown - Remove added markup and events
   * @returns {void}
   */
  destroy() {
    this.teardown();
    $.removeData(this.element[0], COMPONENT_NAME);
  },

  /**
   * This component fires the following events.
   * @fires Applicationmenu#events
   * @listens applicationmenuopen  Fires when the menu is opened.
   * @listens applicationmenuclose  Fires as the menu is closed.
   * @returns {this} component instance
   */
  handleEvents() {
    const self = this;

    this.handleTriggerEvents();

    // Setup notification change events
    this.menu.on('notify.applicationmenu', (e, anchor, value) => {
      self.notify(anchor, value);
    }).on('updated.applicationmenu', () => {
      self.updated();
    });

    // Fix: ie11 scrollbar causing to not calculate right height
    if (env.browser.name === 'ie' && env.browser.version === '11') {
      self.element.find('.expandable-area')
        .on('beforeexpand.applicationmenu', () => {
          self.element[0].classList.remove('has-scrollbar');
        })
        .on('aftercollapse.applicationmenu', () => {
          self.toggleScrollClass();
        });
    }

    this.accordion.on('blur.applicationmenu', () => {
      self.closeMenu();
    }).on('selected.applicationmenu', () => {
      self.handleDismissOnClick();
    }).on('followlink.applicationmenu', () => {
      self.handleDismissOnClick();
    }).on('afterexpand.applicationmenu aftercollapse.applicationmenu', () => {
      self.toggleScrollClass();
    });

    $(document).on('open-applicationmenu', () => {
      self.openMenu(undefined, true);
    }).on('close-applicationmenu', () => {
      self.closeMenu();
    }).on('dismiss-applicationmenu', () => {
      self.handleDismissOnClick();
    });

    $(window).on('scroll.applicationmenu', () => {
      self.adjustHeight();
    });

    $('body').on('resize.applicationmenu', () => {
      self.testWidth();
      self.toggleScrollClass();
    });

    if (this.settings.filterable === true && this.searchfield && this.searchfield.length) {
      this.searchfield.on('input.applicationmenu', (e) => {
        self.handleSearchfieldInputEvent(e);
      });
    }

    if (this.settings.openOnLarge && this.isLargerThanBreakpoint()) {
      this.menu.addClass('no-transition');
      $('.page-container').addClass('no-transition');
    }
    this.testWidth();

    // Remove after initial transition
    setTimeout(() => {
      self.menu.removeClass('no-transition');
      $('.page-container').removeClass('no-transition');
    }, 800);

    return this;
  }

};

export { ApplicationMenu, COMPONENT_NAME };
