import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  store: service(),
  model() {
    const fullData = this.store.findAll('people');
    console.log('people', fullData);
    return null;
  }
});
