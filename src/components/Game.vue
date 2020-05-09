<template>
  <section class="container mt-5">
    <app-animation v-if="isLoading"></app-animation>
    <div class="game-board" v-else>
      <div class="d-flex justify-content-between">
        <h4 class="mr-2">{{currentQuestion.name}}</h4>
        <button @click="giveNextQuestion" class="btn btn-info" v-if="isAnswered">Sonraki</button>
      </div>

      <div class="timer-section d-flex justify-content-between">
        <div class="totalSecond">
          <span>Toplam Süre</span>
          <div id="countdown">
            <div id="countdown-number" class="float-right">{{gameTime}}</div>
            <svg>
              <circle id="total" r="18" cx="20" cy="20" />
            </svg>
          </div>
        </div>
        <div class="mr-4" v-if="!isAnswered">
          <span>Cevap Süresi</span>
          <div id="countdown">
            <div id="countdown-number" class="float-right">{{answerTime}}</div>
            <svg>
              <circle id="single" r="18" cx="20" cy="20" />
            </svg>
          </div>
        </div>
      </div>
      <div class="justify-content-center">
        <app-letter
          v-for="(obj,index) in currentAnswerLetters"
          :key="index"
          :letter="obj.letter"
          :isOpened="obj.isOpened"
        ></app-letter>
      </div>
      <div class="input-group mt-5">
        <button :disabled="false" class="btn btn-danger" @click="giveLetter()">
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
        <button :disabled="answer.length == 0" @click="reply()" class="btn btn-success">
          <span>Cevap Ver</span>
        </button>
      </div>
    </div>
    <app-info :messageType="messageType"></app-info>
  </section>
</template>

<script>
import Letter from "./Letter";
import Info from "./Info";
import Animation from "./Animation.vue";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      letters: [],
      isLoading: true,
      point: 0,
      answer: "",
      messageType: "",
      maxLength: 0,
      isAnswered: false,
      answerTime: 30,
      gameTime: 300,
      answerInterval: "",
      gameInterval: ""
    };
  },
  components: {
    appLetter: Letter,
    appAnimation: Animation,
    appInfo: Info
  },
  computed: {
    ...mapGetters({
      currentAnswerLetters: "getCurrentAnswerLetters",
      currentAnswer: "getCurrentAnswer",
      currentQuestion: "getCurrentQuestion",
      points: "getPoints"
    }),
    makeItUpper() {
      return this.currentAnswer.toLocaleUpperCase("tr-TR");
    }
  },
  created() {
    this.$store.dispatch("getQuestions").then(response => {
      this.letters = [...this.currentAnswerLetters];
      let questionPoint = this.letters.length * 100;
      this.point = questionPoint;
      this.maxLength = this.letters.length;
      setTimeout(() => {
        this.$store.dispatch("setCurrentQuestionPoint", questionPoint);
        this.isLoading = false;
        this.showAnswerTime();
        this.showGameTime();
      }, 3000);
    });
  },
  methods: {
    giveLetter() {
      let questionPoint = this.points.currentQuestionPoint;
      if (questionPoint <= 100) {
        alert("Harf Alma Hakkınız Tükendi");
        return;
      }
      this.openLetter();
      questionPoint -= 100;
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
        .filter(x => x.isOpened == false)
        .forEach(x => {
          this.openLetter();
        });
    },
    changeMessageType(messageType) {
      this.messageType = messageType;
      setTimeout(() => {
        this.messageType = "";
      }, 3000);
    },
    reply() {
      if (this.isAnswered) {
        return;
      }
      if (this.letters.length !== this.answer.length) {
        this.changeMessageType("info");
        return;
      }
      this.isAnswered = true;
      clearInterval(this.answerInterval);
      if (this.answer === this.makeItUpper) {
        this.$store.dispatch("setTotalPoint", this.point);
        this.changeMessageType("success");
      } else {
        this.$store.dispatch("setTotalPoint", 0);
        this.changeMessageType("danger");
      }
      this.openAllLetters();
      if (!this.currentQuestion) {
        setTimeout(() => {
          finishGame("success");
        }, 3000);
      }
    },
    giveNextQuestion() {
      this.$store.dispatch("setQuestionStatus", this.currentQuestion);
      this.letters = [...this.currentAnswerLetters];
      let questionPoint = this.letters.length * 100;
      this.point = questionPoint;
      this.$store.dispatch("setCurrentQuestionPoint", questionPoint);
      this.answer = "";
      this.isAnswered = false;
      this.showAnswerTime();
      this.maxLength = this.letters.length;
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
    }
  }
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
}
.timer-section {
  padding: 20px;
}
#countdown {
  position: relative;
  height: 40px;
  width: 40px;
  text-align: center;
}

#countdown-number {
  color: white;
  display: inline-block;
  line-height: 40px;
}

svg {
  position: absolute;
  width: 40px;
  height: 40px;
  transform: rotateY(-180deg) rotateZ(-90deg);
}

svg circle {
  stroke-dasharray: 113px;
  stroke-dashoffset: 0px;
  stroke-linecap: round;
  stroke-width: 2px;
  stroke: #fa1570;
  fill: none;
  animation: countdown 30s linear infinite forwards;
}

#total {
  animation: countdown 300s linear infinite forwards !important;
}
.totalSecond {
  margin-right: 8rem !important;
}
@keyframes countdown {
  from {
    stroke-dashoffset: 0px;
  }
  to {
    stroke-dashoffset: 113px;
  }
}
</style>