export const setTotalPoint = ({commit},payload) => {
   /*Mutation will be triggered to update total points which in state*/ 
   commit('updateTotalPoint',payload);
}
export const setCurrentQuestionPoint = ({commit},payload) => {
   /*Mutation will be triggered to update current question points which in state*/ 
   commit('updateCurrentQuestionPoint',payload);
}