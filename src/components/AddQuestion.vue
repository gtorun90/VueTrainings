<template>
  <div class="container">
    <!-- <form class="mt-5" @submit.prevent> -->
      <!-- <div *ngIf="mesajTur == 'success'" class="alert alert-success" role="alert">
        Soru Veritabanına Eklendi!
    </div>
    <div *ngIf="mesajTur == 'error'" class="alert alert-danger" role="alert">
        Kayıt Sırasında Bir Hata Oluştu!
      </div>-->
      <div class="form-group mt-5">
        <label>Soru</label>
        <input type="text" v-model="question.name" class="form-control" placeholder="Soru" />
      </div>
      <div class="form-group">
        <label>Cevap</label>
        <input type="text" v-model="question.answer" class="form-control" placeholder="Cevap" />
      </div>
      <div class="form-group">
        <label>Cevap Harf Sayisi</label>
        <input
          type="text"
          v-model="question.letterCount"
          class="form-control"
          placeholder="Cevap Harf Sayisi"
        />
      </div>
      <button  @click="saveQuestion(question)" class="btn btn-primary">Kaydet</button>
    <!-- </form> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      question: {
        name: "",
        answer: "",
        letterCount: null,
        isAsked: false
      }
    };
  },
  methods: {
      saveQuestion(question){
        this.$store.dispatch("saveQuestionToDb", question);
        this.clearFormData();
      },
      clearFormData(){
        this.question = {name:"",answer:"",letterCount:null,isAsked:false};
      }
  },
};
</script>

<style>
</style>