import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel() {
    this.dataWorker.setBattleType('people');
    this.dataWorker.prepareDataForBattle();
  },
  model() {
    return this.dataWorker.peopleForBattle;
  },
  afterModel() {
    this.dataWorker.updateRoute(false);
  }
});
