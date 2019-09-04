import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';
import fetch from 'fetch';
import { serializeQueryParams } from 'ember-fetch/utils/serialize-query-params';

export default Component.extend({

  classNames: ["food-map"],

  lng: -122.4194,
  lat: 37.7749,
  zoom: 14,
  radius: 0,
  carts: null,

  loadFromApiTask: task(function * () {

    try{
      // debounceable task
      yield timeout(500);

      const radius = this.getRadius(),
            {lat, lng} = this.getProperties("lat", "lng"),
            params = {lng, lat, radius};

      const response = yield fetch(`/food_carts.json?${serializeQueryParams(params)}}`),
            {carts} = yield response.json();

      this.set("carts", carts);

    } catch (e){
      console.error(e);
    }

  }).restartable(),

  getRadius(){
    const map = this.map,
          northEast = map.getBounds().getNorthEast(),
          center = map.getCenter();
    return map.distance(northEast, center);
  },

  actions: {

    zoomEnd(e){
      const map = e.target,
            zoom = map.getZoom();
      this.set("map", map);
      this.set("zoom", zoom);
    },

    moveEnd(e){
      const map = e.target,
            center = map.getCenter();
      this.set("map", map);
      this.set('lat', center.lat);
      this.set('lng', center.lng);
      this.loadFromApiTask.perform();
    }
  }

});
