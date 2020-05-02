import Vue from 'vue'
import VueRouter from 'vue-router'
import AddQuestion from '../components/AddQuestion.vue'
import Game from '../components/Game.vue'

Vue.use(VueRouter)

const routes = [
    {path:'/', component:Game,name:"game"},
    {path:'/new-question', component:AddQuestion,name:"new-question"},
    {path:'*',redirect:'/'}
];

export const router = new VueRouter({
    mode:'history',
    routes
});