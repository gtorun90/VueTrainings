import * as service from '../../services/service' 
const letterPoint = 100;
const state = {
    questions:[]
}
const getters = {
 getAllQuestions(state){
    return state.questions.filter(q=>q.isAsked == false);
 },
 getCurrentQuestion(state){
    let currentQuestion = state.questions.filter(q=>q.isAsked == false).find(q=>q);
    return currentQuestion;
 },
 getCurrentAnswer(state){
    return state.questions.filter(q=>q.isAsked == false).find(q=>q.isAsked == false).answer;
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
 }
}
const mutations = {
    /**The question array will be filled with values in payload */
    updateQuestions(state,payload){
        state.questions.push(payload);
    },
    /**The status of current question will be updated with "isAsked = true"*/
    updateQuestionStatus(state,payload){
        let questionIndex = state.questions.indexOf(payload)
        state.questions[questionIndex].isAsked = true;
    }
}
 
const actions = {
    /** Adding a new question to DataBase*/
    saveQuestionToDb({commit},payload){
     return service.postData('/questions.json',payload)
     .then(response => {
         commit('updateQuestions',payload)
     }).catch(err => console.log(err))
    },
    /** Mutation will be triggered to able to change of the question status like "isAsked = true"  in state after current question was asked. */
    setQuestionStatus({commit},payload){
       commit('updateQuestionStatus',payload)
    },
    
    /** getting all questions from DataBase*/
    getQuestions({commit}){
        return service.getData('/questions.json').then(response => {
            let data = response.body;
            for(let key in data){
              commit('updateQuestions',data[key]);
            }
            
        }).catch(err => console.log(err))
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}

