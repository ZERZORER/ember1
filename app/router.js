import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('users', function() {
    this.route('new');

    this.route('edit', {
      path: ':user_id/edit'
    });

    this.route('show', {
      path: ':user_id'
    });
  });
  this.route('about');
  this.route('conctact');
  this.route('products', function() {
    this.route('new');

    this.route('edit', {
      path: ':product_id/edit'
    });

    this.route('show', {
      path: ':product_id'
    });
  });
  this.route('usuarios', function() {
    this.route('new');

    this.route('edit', {
      path: ':usuario_id/edit'
    });

    this.route('show', {
      path: ':usuario_id'
    });
  });
  this.route('recibos', function() {
    this.route('new');

    this.route('edit', {
      path: ':recibo_id/edit'
    });

    this.route('show', {
      path: ':recibo_id'
    });
  });
});

export default Router;
