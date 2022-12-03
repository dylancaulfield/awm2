import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

const vuetify = new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#9c27b0',
                secondary: '#42a5f5',
                accent: '#ffeb3b',
                error: '#b71c1c',
            },
        },
    },
});

export default vuetify;