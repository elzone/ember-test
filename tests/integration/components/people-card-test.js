import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import EmberObject from '@ember/object';

module('Integration | Component | people-card', function(hooks) {
  setupRenderingTest(hooks);
  
  hooks.before(function () {
    this.peopleItem = EmberObject.create({
      name: 'Jon Small',
      gender: 'Male',
      mass: '77'
    });
  });

  test('should render PeopleCard', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    assert.expect(3);

    await render(hbs`<PeopleCard @people={{this.peopleItem}} />`);
    
    assert.equal(this.element.querySelector('.card-component_param1').textContent.trim(), 'Name: Jon Small', 'Name: Jon Small');
    assert.equal(this.element.querySelector('.card-component_param2').textContent.trim(), 'Gender: Male', 'Gender: Male');
    assert.equal(this.element.querySelector('.card-component_param3').textContent.trim(), 'Mass: 77', 'Mass: 77');
  });
});
