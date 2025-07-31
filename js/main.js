if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}

new Vue({
  el: "#app",
  data: {
    step: 1,
    digitHolder: '',
    win: 21,
    usersCounter: null,
    users: [],
    scores: []
  },
  methods: {
    validateStepOne() {
      const num = Number(this.digitHolder);
      if (num < 2 || num > 4) {
        alert("Je moet met 2 tot 4 spelers zijn om Ronda te spelen.");
        return;
      }
      if (this.win > 41) {
        alert("😂 بو لمطول");
        return;
      }
      this.usersCounter = num;
      this.step = 2;
    },
    getUserName({ name, index }) {
      this.$set(this.users, index, name);
    },
    proceedToScores() {
      this.scores = new Array(this.usersCounter).fill(0);
      this.step = 3;
    },
    updateScore({index, value}) {
      const newScore = this.scores[index] + value;
      
      if (newScore < 0) {
        alert("فين غادي ! فين أو غادي");
        this.$set(this.scores, index, 0);
        return;
      }
      
      this.$set(this.scores, index, newScore);
      
      if (newScore >= Number(this.win)) {
        alert(`${this.users[index]} heeft gewonnen met ${newScore} punten!`);
        this.$set(this.scores, index, 0);
      }
    },
    goBackToStep1() {
      this.users = [];
      this.scores = [];
      this.step = 1;
    },
    goBackToStep2() {
      this.scores = [];
      this.step = 2;
    }
  }
});