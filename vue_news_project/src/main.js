import Vue from 'vue';
import App from './App.vue';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import login from './components/accout/login.vue';
import register from './components/accout/register.vue';

import 'mint-ui/lib/style.min.css'
import Mint from 'mint-ui';

import '../statics/css/site.css';
Vue.use(Mint);

var router1 = new VueRouter({
        routes:[
            {path:'/login',component:login},
            {path:'/register',component:register}
        ]
    });

new Vue({
    el:'#app',
    router:router1,
    render:c=>c(App)
});