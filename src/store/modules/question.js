import * as service from "../../services/service";
const letterPoint = 100;
const state = {
  questions: []
};
const getters = {
//   getAllQuestions(state) {
//     return state.questions.filter(q => q.isAsked == false);
//   },
  getCurrentData(state) {
      let questionArray = [...state.questions.filter(q => q.isAsked == false)]
      ? state.questions.filter(q => q.isAsked == false).sort((a,b) => a.letterCount-b.letterCount)
      : [];
      /**sorting ascending  */
     // newQuestionArray.sort((a,b) => a.letterCount-b.letterCount)
      let currentQuestion = '';
      let currentAnswer = '';
      let letters = [];
      if(questionArray[0]){
        currentQuestion = questionArray.find(q => q);
        currentAnswer = questionArray.find(q => q).answer;
        currentAnswer.split("").map(x => {
            letters.push({
              letter: x,
              isOpened: false
            });
          });
      }
   
    return {
        currentQuestion,
        currentAnswer,
        letters
    };
  },
};
const mutations = {
  /**The question array will be filled with values in payload */
  updateQuestions(state, payload) {
    let questionArray = [];
    for(let i=4;i<=10;i++){ /**An answer can be min 4, max 10 character  */
        let topLimit = payload.filter(x=>x.letterCount == i).length -1
        let firstIndex = Math.abs(Math.floor(Math.random()*topLimit))
        /**Getting random two questions from the same category */
        let randomArray = payload.filter(x=>x.letterCount == i && x.isAsked == false).sort(function(a, b){return 0.5 - Math.random()})
                   .slice(firstIndex,firstIndex+2) 
        /**Creating a new question array with these random array */
        randomArray.map(x=>{  
            questionArray.push({
                name:x.name,
                answer:x.answer,
                letterCount:x.letterCount,
                isAsked:x.isAsked
            })
        })
    } 
    state.questions = [...questionArray];
  },
  /**The status of current question will be updated with "isAsked = true"*/
  updateQuestionStatus(state, payload) {
    let questionIndex = state.questions.indexOf(payload);
    state.questions[questionIndex].isAsked = true;
  }
};

const actions = {
  /** Adding a new question to DataBase*/
  saveQuestionToDb({ commit }, payload) {
    return service
      .postData("/questions.json", payload)
      .then(response => {
        commit("updateQuestions", payload);
      })
      .catch(err => console.log(err));
  },
  /** Mutation will be triggered to able to change of the question status like "isAsked = true"  in state after current question was asked. */
  setQuestionStatus({ commit }, payload) {
    commit("updateQuestionStatus", payload);
  },

  /** getting all questions from DataBase*/
  getQuestions({ commit }) {
    return service
      .getData("/questions.json")
      .then(response => {
        let data = response.body;
        let arr = [];
        for (let key in data) {
          arr.push(data[key]);
        }
        
        commit("updateQuestions", arr);
      })
      .catch(err => console.log(err));
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
