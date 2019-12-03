import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel() {
    this.dataWorker.setBattleType('people');
    this.dataWorker.prepareForBattle();
  },
  afterModel() {
    console.log('route name: ', this.get('routeName'));
  },
  model() {
    return this.dataWorker.peopleForBattle;
  }
});
