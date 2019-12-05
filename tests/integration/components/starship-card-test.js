import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import EmberObject from '@ember/object';

module('Integration | Component | starship-card', function(hooks) {
  setupRenderingTest(hooks);
  
  hooks.before(function () {
    this.shipItem = EmberObject.create({
      name: 'Star Line',
      'starship_class': 'Very Big',
      crew: '570'
    });
  });

  test('should render StarshipCard', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<StarshipCard @ship={{this.shipItem}}/>`);

    assert.equal(this.element.querySelector('.js-card-text1').textContent.trim(), 'Name: Star Line', 'Name: Star Line');
    assert.equal(this.element.querySelector('.js-card-text2').textContent.trim(), 'Class: Very Big', 'Class: Very Big');
    assert.equal(this.element.querySelector('.card-title').textContent.trim(), 'Crew: 570', 'Crew: 570');
  });
});
