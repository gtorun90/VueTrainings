<template>
  <div>
    <div>
      <p>{{getCurrentQuestion.name}}</p>
    </div>
      <app-letter
        v-for="(value,index) in letters"
        :key="index"
        :letter="value.letter"
        :isOpened="value.isOpened"
      >{{letter}}</app-letter>
    <div class="card-footer">
      <div class="input-group">
        <input
          class="form-control"
          type="text"
          placeholder="Cevapla"
          @keypress.enter="enterIleCevapVer($event)"
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
</template>

<script>
import Letter from "./Letter";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      letters: []
    };
  },
  components: {
    appLetter: Letter
  },
  computed: {
    ...mapGetters(["getCurrentAnswer", "getCurrentQuestion"])
  },
  created() {
    let arrayLetter = this.$store.getters.getCurrentAnswer.split("").map(x => {
      this.letters.push({
        letter: x,
        isOpened: false
      });
    });
  },
  methods: {
    giveLetter() {
      let index = Math.floor(Math.random() * this.letters.length);
      let letter = this.letters[index];
      while (letter.isOpened) {
        index = Math.floor(Math.random() * this.letters.length);
        letter = this.letters[index];
      }
      this.letters[index].isOpened = true;
    },
    reply() {}
  }
};
</script>

<style>

</style>