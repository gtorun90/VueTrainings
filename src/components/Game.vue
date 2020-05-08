<template>
  <section>
    <app-animation v-if="isLoading"></app-animation>
    <div class="container mt-5" v-else>
      <div>
        <h4>{{currentQuestion.name}}</h4>
      </div>
      <app-letter
        v-for="(obj,index) in currentAnswerLetters"
        :key="index"
        :letter="obj.letter"
        :isOpened="obj.isOpened"
      ></app-letter>
      <div>
        <div class="input-group">
          <input
            class="form-control"
            type="text"
            placeholder="Cevapla"
            @keypress.enter="enterIleCevapVer()"
            @keyup="yarismaciCevap = yarismaciCevap.toLocaleUpperCase('tr')"
          />
          <div class="input-group-append">
            <button :disabled="false" class="btn btn-danger" @click="giveLetter()">
              <span>Harf Ver</span>
            </button>
            <button :disabled="false" @click="reply()" class="btn btn-success">
              <span>Cevap Ver</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Letter from "./Letter";
import { mapGetters } from "vuex";
import Animation from "./Animation.vue";
export default {
  data() {
    return {
      letters: [],
      isLoading : true,
    };
  },
  components: {
    appLetter: Letter,
    appAnimation: Animation
  },
  computed: {
    ...mapGetters({
      currentAnswerLetters : 'getCurrentAnswerLetters', 
      currentQuestion :'getCurrentQuestion',
      questionPoint : 'getQuestionPoint'

    }),
  },
  created() {
      this.$store.dispatch("getQuestions").then(response => {
        this.letters = [...this.currentAnswerLetters] 
        setTimeout(() => {
          this.isLoading = false;
        },3000)
        
      });
  },
  methods: {
    giveLetter() {
      let questionPoint = this.questionPoint ? this.questionPoint: this.letters.length*100;
      if(questionPoint <=100){
        alert('Harf Alma Hakkınız Tükendi');
        return;
      }
      let index = Math.floor(Math.random() * this.letters.length);
      let letter = this.letters[index];
      while (letter.isOpened) {
        index = Math.floor(Math.random() * this.letters.length);
        letter = this.letters[index];
      }
      this.letters[index].isOpened = true;
      questionPoint -= 100;
      this.$store.dispatch('changeQuestionPoint',questionPoint)
    },
    reply() {
      this.$store.dispatch('changeQuestionPoint',null)
    },
  }
};
</script>

<style>
</style>