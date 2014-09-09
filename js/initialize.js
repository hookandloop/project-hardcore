/**
* Page Bootstrapper
*/
(function (factory) {
  if (typeof define === 'function' && define.amd) {
      // AMD. Register as an anonymous module depending on jQuery.
      define(['jquery'], factory);
  } else {
      // No AMD. Register plugin with global jQuery object.
      factory(jQuery);
  }
}(function ($) {

  $.fn.initialize = function() {
    return this.each(function() {
      var elem = $(this);

      //Tabs
      elem.find('.tab-container').tabs();

      //Select / DropDowns
      elem.find('select, .dropdown').dropdown();

      //Modals
      elem.find('#modal-1').modal();

      //Buttons Linked to Message Dialogs
      elem.find('button[data-message]').on('click', function () {
        var opts = $(this).attr('data-message');
        $('body').message(opts);
      });

      //Sliders
      elem.find('.slider').slider();

      //Editors
      elem.find('.editor').editor();

      //Menu Buttons
      elem.find('.btn-menu').popupmenu();

      //Context Menu
      elem.find('[data-popupmenu]').each(function () {
        var obj = $(this);
        obj.popupmenu({menuId: obj.attr('data-popupmenu'), trigger: 'rightClick'});
        console.log('x');
      });

      //Tooltips
      elem.find('[title]').tooltip();

      //Popovers
      elem.find('[data-popover]').each(function () {
        var obj = $(this),
          trigger = obj.attr('data-trigger'),
          title = obj.attr('data-title');

        obj.popover({content: $('#'+ obj.attr('data-popover')),
            trigger: trigger ? trigger : 'click',
            title: title ? title : 'Title Missing',
            placement: 'right'
        });
      });

      //Tree
      elem.find('.tree').tree();

      //Rating
      elem.find('.rating').rating();

      //Format
      elem.find('input[data-mask]').mask();

      //Validation
      elem.find('[data-validate]').validate();
      elem.find('[data-validate-on="submit"]').validate();
      console.log(elem.find('[data-validate]'), elem.find('[data-validate-on="submit"]'))
    });
  };

  // Init Stuff on Document Ready
  $(function() {
    $('body').initialize();
  });

}));
