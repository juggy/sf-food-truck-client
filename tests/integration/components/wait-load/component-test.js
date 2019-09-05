import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | wait-load', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    this.loading = true;

    await render(hbs`
      <WaitLoad @isLoading={{loading}}>
        template block text
      </WaitLoad>
    `);

    // shows loading
    assert.ok(this.element.getElementsByClassName("spinner").length > 0);

    this.set("loading", false);
    // now it should show content
    assert.equal(this.element.textContent.trim(), 'template block text');
  });
});
