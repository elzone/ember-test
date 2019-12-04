import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel() {
    this.transitionTo('/');
    this.dataWorker.initDataWorker();
    this.dataWorker.preparePeopleData();
  },
  
  afterModel() {
    this.dataWorker.updateRoute(true);
  },
  
  actions: {
    newBattle() {
      this.dataWorker.prepareDataForBattle();
    }
  }
});
