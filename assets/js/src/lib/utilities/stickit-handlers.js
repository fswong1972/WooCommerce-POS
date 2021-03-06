var bb = require('backbone');
var _ = require('lodash');

/**
 * AutoGrow
 */
bb.Stickit.addHandler({
  selector: '.autogrow',
  afterUpdate: function($el){
    $el.trigger('input');
  }
});

/**
 * Default select value
 * - selects require a change event to update
 * - this can cause problems with gateways, eg: month 01
 */
bb.Stickit.addHandler({
  selector: 'select',
  initialize: function($el, model, opt){
    if( model.get(opt.observe) === undefined ){
      model.set(opt.observe, $el.val());
    }
  },
  afterUpdate: function( $el ){
    $el.trigger('change');
  }
});

/**
 * Select2
 */
bb.Stickit.addHandler({
  selector: 'select.select2',
  initialize: function($el, model, opt){
    $el.trigger('stickit:init', opt.observe); // on-the-fly select options
    var options = _.get( opt, ['view', 'select2', opt.observe ], {} );
    $el.select2( options );
  },
  getVal: function($el){
    /**
     * below is the default select getVal method
     * it relies on data-stickit-bind-val attr
     */

    //var selected = $el.find('option:selected');
    //
    //if ($el.prop('multiple')) {
    //  return _.map(selected, function(el) {
    //    return Backbone.$(el).data('stickit-bind-val');
    //  });
    //} else {
    //  return selected.data('stickit-bind-val');
    //}

    return $el.val();
  }
});

/**
 * Multiple selects with Select2
 * ... bit of a hack here, setting an array only registers a change
 * ie: if last element removed no change is registered
 */
bb.Stickit.addHandler({
  selector: 'select[multiple].select2',
  onSet: function(val, opts){
    if(_.isArray(val)){
      this.model.unset(opts.observe, {silent:true});
    }
    return val;
  }
});

/**
 * Default stickit updateMethod = 'html' for contenteditable
 * - change updateMethod to 'text'
 * - update on 'blur'
 * - filter html input
 */
bb.Stickit.addHandler({
  selector: '[contenteditable=true]',
  updateMethod: 'text',
  events: ['blur'],
  onSet: function(val, obj){
    if( val !== this.$(obj.selector).html() ){
      this.$(obj.selector).text( val );
    }
    return val;
  }
});