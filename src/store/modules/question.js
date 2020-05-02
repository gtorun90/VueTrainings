import Vue from 'vue'
const httpUrl = 'https://kelime-oyunu-f312d.firebaseio.com';

const state = {
    questions:[
      {name:'Halk Dilinde Hala',answer:'BİBİ',letterCount:4,isAsked:false},
      {name:'Garson kalfası',answer:'KOMİ',letterCount:4,isAsked:false}
    ]
}
const getters = {
 getAllQuestions(state){
    return state.questions.filter(q=>q.isAsked == false)
 },
 getCurrentQuestion(state){
    return state.questions.filter(q=>q.isAsked == false).find(q=>q.isAsked == false)
 },
 getCurrentAnswer(state){
    return state.questions.filter(q=>q.isAsked == false).find(q=>q.isAsked == false).answer
 }
}
const mutations = {
    updateQuestions(state,payload){
        state.questions.push(payload)
    }
}
 
const actions = {
    saveQuestionToDb({commit},payload){
        console.log('Burada')
     Vue.http.post(httpUrl+'/questions.json',payload)
     .then(response => {
         console.log(response)
         commit('updateQuestions',payload)
     })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}

