import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel() {
    this.dataWorker.setBattleType('starships');
    this.dataWorker.prepareDataForBattle();
  },
  model() {
    return this.dataWorker.starshipsForBattle;
  },
  afterModel() {
    this.dataWorker.updateRoute(false);
  }
});
