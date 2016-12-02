import DS from 'ember-data';

export default DS.Model.extend({
  nombre: DS.attr(),
  paterno: DS.attr(),
  materno: DS.attr(),
  direccion: DS.attr(),
  correo: DS.attr(),
  telefono: DS.attr()
});
