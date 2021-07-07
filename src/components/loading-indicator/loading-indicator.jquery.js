import { LoadingIndicator, COMPONENT_NAME } from './loading-indicator';

/**
 * jQuery Component Wrapper for the BusyIndicator
 * @param {object} [settings] incoming settings
 * @returns {jQuery[]} jQuery-wrapped components being acted on
 */
$.fn.loadingIndicator = function (settings) {
  return this.each(function () {
    let instance = $.data(this, COMPONENT_NAME);
    if (instance) {
      instance.updated(settings);
    } else {
      instance = $.data(this, COMPONENT_NAME, new LoadingIndicator(this, settings));
    }
  });
};