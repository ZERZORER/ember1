import Ember from 'ember';

const communityPropertyTypes = [
  'Fastfood',
  'Guisado',
  'Bebidas',
  'Postres'
];

export function productPropertyType([tipo]/*, hash*/) {
  if (communityPropertyTypes.includes(tipo)) {
    return '1';
  }

  return '2';
}

export default Ember.Helper.helper(productPropertyType);
