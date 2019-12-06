import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  dataWorker: service(),
  
  beforeModel() {
    this.transitionTo('/');
    this.dataWorker.initDataWorker();
    this.dataWorker.prepareData('people');
  },
  
  afterModel() {
    this.dataWorker.updateRootRoute(true);
  }
});
