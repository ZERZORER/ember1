import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;
var originalConfirm;
var confirmCalledWith;

module('Acceptance: Recibo', {
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

test('visiting /recibos without data', function(assert) {
  visit('/recibos');

  andThen(function() {
    assert.equal(currentPath(), 'recibos.index');
    assert.equal(find('#blankslate').text().trim(), 'No Recibos found');
  });
});

test('visiting /recibos with data', function(assert) {
  server.create('recibo');
  visit('/recibos');

  andThen(function() {
    assert.equal(currentPath(), 'recibos.index');
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('create a new recibo', function(assert) {
  visit('/recibos');
  click('a:contains(New Recibo)');

  andThen(function() {
    assert.equal(currentPath(), 'recibos.new');

    fillIn('label:contains(Nombreusuario) input', 'MyString');
    fillIn('label:contains(Nombreproducto) input', 'MyString');
    fillIn('label:contains(Cantidad) input', 'MyString');
    fillIn('label:contains(Precio) input', 'MyString');
    fillIn('label:contains(Total) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('update an existing recibo', function(assert) {
  server.create('recibo');
  visit('/recibos');
  click('a:contains(Edit)');

  andThen(function() {
    assert.equal(currentPath(), 'recibos.edit');

    fillIn('label:contains(Nombreusuario) input', 'MyString');
    fillIn('label:contains(Nombreproducto) input', 'MyString');
    fillIn('label:contains(Cantidad) input', 'MyString');
    fillIn('label:contains(Precio) input', 'MyString');
    fillIn('label:contains(Total) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('show an existing recibo', function(assert) {
  server.create('recibo');
  visit('/recibos');
  click('a:contains(Show)');

  andThen(function() {
    assert.equal(currentPath(), 'recibos.show');

    assert.equal(find('p strong:contains(Nombreusuario:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Nombreproducto:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Cantidad:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Precio:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Total:)').next().text(), 'MyString');
  });
});

test('delete a recibo', function(assert) {
  server.create('recibo');
  visit('/recibos');
  click('a:contains(Remove)');

  andThen(function() {
    assert.equal(currentPath(), 'recibos.index');
    assert.deepEqual(confirmCalledWith, ['Are you sure?']);
    assert.equal(find('#blankslate').length, 1);
  });
});
