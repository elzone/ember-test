import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  dataWorker: service(),
  
  actions: {
    newBattle() {
      this.dataWorker.updateDataForBattle();
    }
  }
});
