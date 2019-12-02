import Inflector from 'ember-inflector';

export function initialize(/* application */) {
  const inflector = Inflector.inflector;
  
  // Tell the inflector that the plural of "campus" is "campuses"
  // inflector.irregular('campus', 'campuses');
  
  inflector.uncountable('people');
  // application.inject('route', 'foo', 'service:foo');
}

export default {
  initialize
};
