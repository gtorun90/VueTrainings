import Vue from 'vue'
import VueRouter from 'vue-router'
import AddQuestion from '../components/AddQuestion.vue'
import Game from '../components/Game.vue'
import Failure from '../components/Failure.vue'
import Celebrate from '../components/Celebrate.vue'

Vue.use(VueRouter)

const routes = [
    {path:'/', component:Game},
    {path:'/celebrate', component:Celebrate,name:'celebrate'},
    {path:'/failure', component:Failure},
    {path:'/new-question', component:AddQuestion},
    {path:'*',redirect:'/'}
];

export const router = new VueRouter({
    mode:'history',
    routes
});