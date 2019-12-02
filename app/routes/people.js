import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  store: service(),
  model() {
    const fullData = this.get('store').findAll('people');
    return this.get('store').findAll('people');
  }
});
