// Global app imports
import Vue from 'vue';
import VueRouter from 'vue-router';

// Component imports
import App from './components/App.vue';
import Home from './components/Home.vue';
import About from './components/About.vue';

// Router
Vue.use(VueRouter);
var router = new VueRouter();

router.map({
    '/': {
        component: Home
    },
    '/about': {
        component: About
    }
})

Vue.config.debug = true;
router.start(App, '#app');
