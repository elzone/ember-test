import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return null;//this.get('store').findAll('starships');
  }
});