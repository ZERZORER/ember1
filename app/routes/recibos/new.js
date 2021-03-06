import Ember from 'ember';
import SaveModelMixin from 'ember1/mixins/recibos/save-model-mixin';

export default Ember.Route.extend(SaveModelMixin, {
  model: function() {
    return this.store.createRecord('recibo');
  }
});
