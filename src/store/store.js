import Vue from 'vue'
import Vuex from 'vuex'
import question from './modules/question'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
        totalPoint:0,

    },
    modules:{
        question
    },
    getters,
    mutations,
    actions
})