<template>
  <div class="container">
    <div v-if="isSaved == 'success'" class="alert alert-success mt-5" role="alert">Soru Kaydedildi!</div>
    <div v-if="isSaved == 'error'" class="alert alert-danger mt-5" role="alert">Bir Hata Oluştu!</div>
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
    <button @click="saveQuestion(question)" class="btn btn-primary">Kaydet</button>
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
        isAsked: false,
      },
      isSaved: "",
    };
  },
  methods: {
    saveQuestion(question) {
      this.$store
        .dispatch("saveQuestionToDb", question)
        .then((response) => {
          this.isSaved = "success";
          setTimeout(() => {
            this.isSaved = "";
          }, 3000);
        })
        .catch((err) => {
          this.isSaved = "error";
        });
      this.clearFormData();
    },
    clearFormData() {
      this.question = {
        name: "",
        answer: "",
        letterCount: null,
        isAsked: false,
      };
    },
  },
};
</script>

<style>
</style>