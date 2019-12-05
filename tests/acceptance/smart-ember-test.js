import { module, test } from 'qunit';
import {visit, currentURL, click, waitFor} from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | smart ember', function(hooks) {
  setupApplicationTest(hooks);
  
  test('visiting /people', async function(assert) {
    await visit('/');
    await waitFor('.js-button-people', {timeout: 90000});
    await click('.js-button-people');
  
    assert.equal(currentURL(), '/people', 'should navigate to people');
  });
  
  test('visiting /starships', async function(assert) {
    await visit('/');
    await waitFor('.js-button-starships', {timeout: 90000});
    await click('.js-button-starships');
    
    assert.equal(currentURL(), '/starships', 'should navigate to starships');
  });
});
