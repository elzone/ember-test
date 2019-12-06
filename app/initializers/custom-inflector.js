import Inflector from 'ember-inflector';

export function initialize(/* application */) {
  // application.inject('route', 'foo', 'service:foo');
  
  const inflector = Inflector.inflector;
  
  inflector.uncountable('people');
}

export default {
  initialize
};
