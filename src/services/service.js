import Vue from 'vue'
const httpUrl = 'https://kelime-oyunu-f312d.firebaseio.com';

export const getData = async(endPoint) => {
  return await  Vue.http.get(httpUrl+endPoint);
}

export const postData = async(endPoint,payload) => {
  return await Vue.http.post(httpUrl+endPoint,payload)  
}