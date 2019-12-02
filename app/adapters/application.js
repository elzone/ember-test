import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { computed } from '@ember/object';

export default JSONAPIAdapter.extend({
  host: 'https://swapi.co',
  namespace: 'api',
  
  headers: computed('session.token', function() {
    const headers = {};
    
    headers.Accept = 'application/json';
    
    return headers;
  }),
});
