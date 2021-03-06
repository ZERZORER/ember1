import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
    filterByType(param) {
      if (param !== '') {
        return this.get('store').query('product', { type: param });
      } else {
        return this.get('store').findAll('product');
      }
    }
  }
});
