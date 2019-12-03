import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel() {
    this.dataWorker.setBattleType('starships');
    this.dataWorker.prepareForBattle();
  },
  model() {
    return this.dataWorker.starshipsForBattle;
  }
});
