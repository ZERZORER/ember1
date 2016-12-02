import DS from 'ember-data';

export default DS.Model.extend({
  nombreusuario: DS.attr(),
  nombreproducto: DS.attr(),
  cantidad: DS.attr(),
  precio: DS.attr(),
  total: DS.attr()
});
