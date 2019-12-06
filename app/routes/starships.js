import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  dataWorker: service(),
  
  beforeModel() {
    this.dataWorker.setBattleType('starships');
    this.dataWorker.updateDataForBattle();
  },
  
  model() {
    return this.dataWorker.starshipsForBattle;
  },
  
  afterModel() {
    this.dataWorker.updateRootRoute(false);
  }
});
