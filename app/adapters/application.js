import JSONAPIAdapter from '@ember-data/adapter/json-api';

export default JSONAPIAdapter.extend({
  host: 'https://swapi.co',
  namespace: 'api'
});
