import Component from '@ember/component';

export default Component.extend({
  isWon: false,
  actions: {
    toggleImageSize() {
      this.toggleProperty('isWon');
    }
  }
});
