import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify'
import 'leaflet/dist/leaflet.css';

// Fix for markers not showing because of webpack
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

Vue.config.productionTip = false

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
