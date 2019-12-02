import Model from '@ember-data/model';
import DS from "ember-data/addon/-private";

export default Model.extend({
  name: DS.attr(),
  starship_class: DS.attr(),
  crew: DS.attr()
});
