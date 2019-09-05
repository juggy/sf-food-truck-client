import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import Pretender from 'pretender';

module('Integration | Component | food-map', function(hooks) {
  setupRenderingTest(hooks);

  let foodCartHandler;
  hooks.beforeEach(function(){
    this.server = new Pretender(function() {
      foodCartHandler = this.get('/api/food_carts.json', () => {
        return [200,
                {'content-type': 'application/javascript'},
                JSON.stringify({carts: [{
                  address: "1028 MISSION ST",
                  food_items: ["Filipino Food"],
                  id: 1334734,
                  latitude: 37.7806943774082,
                  longitude: -122.409668813219,
                  name: "Rita's Catering"
                }]})
              ];
      });
    });
  });

  test('it renders with a map', async function(assert) {
    await render(hbs`<FoodMap />`);
    assert.ok(this.element.getElementsByClassName("leaflet-tile").length > 0);
  });


  test('it queries the backend for food carts', async function(assert){
    await render(hbs`<FoodMap />`);
    assert.ok(foodCartHandler.numberOfCalls === 1);
  });

  test('it shows marker on the map', async function(assert){
    await render(hbs`<FoodMap />`);
    assert.ok(this.element.getElementsByClassName("leaflet-marker-icon").length > 0);
  });

});
