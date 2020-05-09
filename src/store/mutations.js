export const updateTotalPoint = (state,payload) =>{
    /*Total points which in state will be updated here*/
    state.totalPoint += payload;
}
export const updateCurrentQuestionPoint = (state,payload) =>{
    /*current question points which in state will be updated here*/
    state.currentQuestionPoint = payload;
}
