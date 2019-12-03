import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel() {
    this.transitionTo('/');
    this.dataWorker.initDataWorker();
    this.dataWorker.preparePeopleData();
    this.dataWorker.prepareStarshipsData();
  },
  
  afterModel() {
    console.log('route name: ', this.get('routeName'));
  },
  
  actions: {
    newBattle() {
      this.dataWorker.prepareForBattle();
    }
  }
});
