import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import Evented from '@ember/object/evented';

export default Controller.extend(Evented, {
  dataWorker: service(),
  isLoading: true,
  
  init() {
    this._super(...arguments);
    this.dataWorker.on('loadingFinish', this, this.onLoadingFinish);
  },
  
  onLoadingFinish() {
    this.dataWorker.off('loadingFinish', this, this.onLoadingFinish);
    this.set('isLoading', false);
  }
});
