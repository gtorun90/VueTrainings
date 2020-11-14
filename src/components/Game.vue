<template>
  <section class="container mt-5">
    <app-animation v-if="isLoading"></app-animation>
    <div
      class="game-board"
      v-else
    >
      <div>
        <h4 class="mr-2">{{getCurrentData.currentQuestion.name}}</h4>
        <!-- <button @click="giveNextQuestion" class="btn btn-info" v-if="isAnswered">Sonraki</button> -->
      </div>
      <div class="timer-section d-flex justify-content-between">
        <div class="totalSecond">
          <span>Toplam Süre</span>
          <app-timer
            :timeType="timeType.game"
            :time="gameTime"
          ></app-timer>
        </div>
        <div
          class="mr-4"
          v-if="!isAnswered"
        >
          <span>Cevap Süresi</span>
          <app-timer
            :timeType="timeType.answer"
            :time="answerTime"
          ></app-timer>
        </div>
      </div>
      <div class="justify-content-center">
        <app-letter
          v-for="(obj,index) in getCurrentData.letters"
          :key="index"
          :letter="obj.letter"
          :isOpened="obj.isOpened"
        ></app-letter>
      </div>
      <div class="input-group mt-5">
        <button
          :disabled="canTakeLetter"
          class="btn btn-danger"
          @click="giveLetter()"
        >
          <span>Harf Ver</span>
        </button>
        <input
          class="form-control ml-2 mr-2"
          type="text"
          placeholder="Cevapla"
          v-model="answer"
          :maxlength="this.maxLength"
          @input="answer = $event.target.value.toLocaleUpperCase('tr-TR')"
          @keypress.enter="reply()"
        />
        <button
          :disabled="answer.length == 0"
          @click="reply()"
          class="btn btn-success"
        >
          <span>Cevap Ver</span>
        </button>
      </div>
    </div>
    <app-info
      :messageType="messageType"
      :message="message"
    ></app-info>
  </section>
</template>

<script>
import Letter from "./Letter";
import Info from "./Info";
import Animation from "./Animation.vue";
import Timer from "./Timer.vue";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      letters: [],
      isLoading: true,
      point: 0,
      answer: "",
      messageType: "",
      message: "",
      maxLength: 0,
      isAnswered: false,
      answerInterval: "",
      gameInterval: "",
      canTakeLetter: false,
      gameTime: 300,
      answerTime: 30,
      timeType: {
        game: 1,
        answer: 2,
      },
    };
  },
  components: {
    appLetter: Letter,
    appAnimation: Animation,
    appInfo: Info,
    appTimer: Timer,
  },
  computed: {
    ...mapGetters({
      getCurrentData: "getCurrentData",
      points: "getPoints",
    }),
    doUpper() {
      return this.getCurrentData.currentAnswer.toLocaleUpperCase("tr-TR");
    },
  },
  created() {
    this.$store.dispatch("getQuestions").then((response) => {
      let totalPoint = this.points.totalPoint;
      this.$store.dispatch("setTotalPoint", -totalPoint);
      this.letters = [...this.getCurrentData.letters];
      let questionPoint = this.letters.length * 100;
      this.point = questionPoint;
      this.maxLength = this.letters.length;
      setTimeout(() => {
        this.$store.dispatch("setCurrentQuestionPoint", questionPoint);
        this.isLoading = false;
        this.clearIntervals();
        this.showAnswerTime();
        this.showGameTime();
      }, 3000);
    });
  },
  methods: {
    giveLetter() {
      let questionPoint = this.points.currentQuestionPoint;
      this.openLetter();
      questionPoint -= 100;
      if (questionPoint <= 100) {
        this.canTakeLetter = true;
      }
      this.$store.dispatch("setCurrentQuestionPoint", questionPoint);
      this.point = questionPoint;
    },
    openLetter() {
      let index = Math.floor(Math.random() * this.letters.length);
      let letter = this.letters[index];
      while (letter.isOpened) {
        index = Math.floor(Math.random() * this.letters.length);
        letter = this.letters[index];
      }
      this.letters[index].isOpened = true;
    },
    openAllLetters() {
      this.letters
        .filter((x) => x.isOpened == false)
        .forEach((x) => {
          this.openLetter();
        });
    },
    changeMessageType(messageType, message) {
      this.messageType = messageType;
      this.message = message;
      setTimeout(() => {
        this.messageType = "";
        this.message = "";
      }, 3000);
    },
    reply() {
      if (this.isAnswered) {
        return;
      }
      if (this.letters.length !== this.answer.length) {
        this.changeMessageType("info", "Harf Sayıları Tutmuyor!");
        return;
      }
      this.isAnswered = true;
      clearInterval(this.answerInterval);
      if (this.answer === this.doUpper) {
        this.$store.dispatch("setTotalPoint", this.point);
        this.changeMessageType("success", "Tebrikler Doğru Bildiniz!");
      } else {
        this.$store.dispatch("setTotalPoint", -this.point);
        this.changeMessageType("danger", "Cevap Yanlış!");
      }
      this.openAllLetters();
      this.clearIntervals();
      setTimeout(() => {
        this.giveNextQuestion();
      }, 3000);
    },
    giveNextQuestion() {
      this.$store.dispatch(
        "setQuestionStatus",
        this.getCurrentData.currentQuestion
      );
      this.letters = [...this.getCurrentData.letters];
      let questionPoint = this.letters.length * 100;
      this.point = questionPoint;
      this.$store.dispatch("setCurrentQuestionPoint", questionPoint);
      this.answer = "";
      this.isAnswered = false;
      this.canTakeLetter = false;
      this.showAnswerTime();
      this.showGameTime();
      this.maxLength = this.letters.length;
      if (!this.getCurrentData.currentQuestion) {
        if (this.points.totalPoint === 0) {
          this.finishGame("fail");
        } else {
          this.finishGame("success");
        }
      }
    },
    showAnswerTime() {
      if (this.answerTime !== 30) {
        this.answerTime = 30;
      }
      this.answerInterval = setInterval(() => {
        this.answerTime--;
        if (this.answerTime === 0) {
          this.finishGame("fail");
        }
      }, 1000);
    },
    showGameTime() {
      this.gameInterval = setInterval(() => {
        this.gameTime--;
        if (this.gameTime === 0) {
          this.finishGame("fail");
        }
      }, 1000);
    },
    finishGame(finishingType) {
      if (finishingType == "success") {
        this.$router.push("/celebrate");
      } else {
        this.$router.push("/failure");
      }
      this.$store.dispatch("setCurrentQuestionPoint", 0);
      this.clearIntervals();
    },
    clearIntervals() {
      clearInterval(this.answerInterval);
      clearInterval(this.gameInterval);
    },
  },
};
</script>

<style scoped>
.form-control {
  border: 1px solid #fa1570;
  color: #fa1570;
  border-radius: 0.25rem !important;
}
.game-board {
  background-color: #221539;
  padding: 20px;
  margin-top: 100px;
}
.timer-section {
  padding: 20px;
}
.totalSecond {
  margin-right: 8rem !important;
}
</style>