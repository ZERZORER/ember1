import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;
var originalConfirm;
var confirmCalledWith;

module('Acceptance: Usuario', {
  beforeEach: function() {
    application = startApp();
    originalConfirm = window.confirm;
    window.confirm = function() {
      confirmCalledWith = [].slice.call(arguments);
      return true;
    };
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
    window.confirm = originalConfirm;
    confirmCalledWith = null;
  }
});

test('visiting /usuarios without data', function(assert) {
  visit('/usuarios');

  andThen(function() {
    assert.equal(currentPath(), 'usuarios.index');
    assert.equal(find('#blankslate').text().trim(), 'No Usuarios found');
  });
});

test('visiting /usuarios with data', function(assert) {
  server.create('usuario');
  visit('/usuarios');

  andThen(function() {
    assert.equal(currentPath(), 'usuarios.index');
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('create a new usuario', function(assert) {
  visit('/usuarios');
  click('a:contains(New Usuario)');

  andThen(function() {
    assert.equal(currentPath(), 'usuarios.new');

    fillIn('label:contains(Nombre) input', 'MyString');
    fillIn('label:contains(Paterno) input', 'MyString');
    fillIn('label:contains(Materno) input', 'MyString');
    fillIn('label:contains(Direccion) input', 'MyString');
    fillIn('label:contains(Correo) input', 'MyString');
    fillIn('label:contains(Telefono) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('update an existing usuario', function(assert) {
  server.create('usuario');
  visit('/usuarios');
  click('a:contains(Edit)');

  andThen(function() {
    assert.equal(currentPath(), 'usuarios.edit');

    fillIn('label:contains(Nombre) input', 'MyString');
    fillIn('label:contains(Paterno) input', 'MyString');
    fillIn('label:contains(Materno) input', 'MyString');
    fillIn('label:contains(Direccion) input', 'MyString');
    fillIn('label:contains(Correo) input', 'MyString');
    fillIn('label:contains(Telefono) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('show an existing usuario', function(assert) {
  server.create('usuario');
  visit('/usuarios');
  click('a:contains(Show)');

  andThen(function() {
    assert.equal(currentPath(), 'usuarios.show');

    assert.equal(find('p strong:contains(Nombre:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Paterno:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Materno:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Direccion:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Correo:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Telefono:)').next().text(), 'MyString');
  });
});

test('delete a usuario', function(assert) {
  server.create('usuario');
  visit('/usuarios');
  click('a:contains(Remove)');

  andThen(function() {
    assert.equal(currentPath(), 'usuarios.index');
    assert.deepEqual(confirmCalledWith, ['Are you sure?']);
    assert.equal(find('#blankslate').length, 1);
  });
});
