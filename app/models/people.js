import DS from 'ember-data';
// import { hasMany } from '@ember-data/model';

const { Model } = DS;

export default Model.extend({
  next: DS.attr('string', { defaultValue: null }),
  previous: DS.attr('string', { defaultValue: null }),
  count: DS.attr('number'),
  results: DS.attr()
});
