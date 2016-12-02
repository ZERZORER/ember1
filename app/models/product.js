import DS from 'ember-data';

export default DS.Model.extend({
  nombre: DS.attr(),
  descripcion: DS.attr(),
  tipo: DS.attr(),
  precio: DS.attr(),
  image: DS.attr()
});
