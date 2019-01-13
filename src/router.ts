import Vue from 'vue';
import Router from 'vue-router';
import Pink from './components/WriteArea.vue';
import Orange from './views/WriteAreaOrange.vue';
import Blue from './views/WriteAreaBlue.vue';
import Green from './views/WriteAreaGreen.vue';
import Purple from './views/WriteAreaPurple.vue';

Vue.use(Router);

export default new Router({
mode: 'history',
base: process.env.BASE_URL,
routes: [
    {
        path: '/',
        name: 'pinkSheet',
        component: Pink,
    },
    {
        path: '/orange',
        name: 'orangeSheet',
        component: Orange,
    },
    {
        path: '/blue',
        name: 'blueSheet',
        component: Blue,
    },
    {
        path: '/green',
        name: 'greenSheet',
        component: Green,
    },
    {
        path: '/purple',
        name: 'purpleSheet',
        component: Purple,
    },
],
});
