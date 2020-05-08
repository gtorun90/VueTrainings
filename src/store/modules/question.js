import * as service from '../../services/service' 
const letterPoint = 100;
const state = {
    questions:[],
    questionPoint : null
}
const getters = {
 getAllQuestions(state){
    return state.questions.filter(q=>q.isAsked == false);
 },
 getCurrentQuestion(state){
    let currentQuestion = state.questions.filter(q=>q.isAsked == false).find(q=>q);
    return currentQuestion;
 },
 getCurrentAnswerLetters(state){
    let currentAnswer = state.questions.filter(q=>q.isAsked == false).find(q=>q.isAsked == false).answer;
    let letters = [];
    currentAnswer.split("").map(x => {
        letters.push({
          letter: x,
          isOpened: false
        });
      });
    return letters;
 },
 getQuestionPoint(state){
     return state.questionPoint;
 }
}
const mutations = {
    updateQuestions(state,payload){
        state.questions.push(payload);
    },
    updateQuestionPoint(state,payload){
        state.questionPoint = payload;
    }
}
 
const actions = {
    saveQuestionToDb({commit},payload){
     return service.postData('/questions.json',payload)
     .then(response => {
         commit('updateQuestions',payload)
     }).catch(err => console.log(err))
    },
    getQuestions({commit}){
        return service.getData('/questions.json').then(response => {
            let data = response.body;
            for(let key in data){
              commit('updateQuestions',data[key]);
            }
            
        }).catch(err => console.log(err))
    },
    changeQuestionPoint({commit},payload){
        commit('updateQuestionPoint',payload);
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}

