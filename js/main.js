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
      this.step = 3;
    },
  },
  components: {
    username: {
      props: ['index', 'value'],
      template: `
        <div class="form-floating mb-3">
          <input type="text" class="form-control" :id="'user-' + index" placeholder="Naam" :value="value" @input="voegUser">
          <label :for="'user-' + index">Naam speler {{ index + 1 }} | سميتك</label>
        </div>
      `,
      methods: {
        voegUser(event) {
          this.$emit("get-user", { name: event.target.value, index: this.index });
        }
      }
    },
    score: {
  props: ['username', 'win'],
  data() {
    return {
      score: 0
    };
  },
  methods: {
    add(val) {
      this.score += val;
      this.checkWin();
    },
    sub(val) {
      this.score -= val;
      if (this.score < 0) {
        alert("فين غادي ! فين أو غادي");
        this.score = 0;
      }
    },
    checkWin() {
      if (this.score >= Number(this.win)) {
        alert(`${this.username} heeft gewonnen met ${this.score} punten!`);
        this.score = 0;
      }
    }
  },
  template: `
    <div class="card mb-4 shadow-sm">
      <div class="card-body">
        <h5 class="card-title text-center" style="word-break: break-word;">{{ username }}</h5>
        <p class="text-center fs-4">Score: {{ score }}</p>
        
        <div class="row g-2">
          <div class="col-6 col-sm-3">
            <button class="btn btn-danger w-100" @click="sub(1)">-1</button>
          </div>
          <div class="col-6 col-sm-3">
            <button class="btn btn-danger w-100" @click="sub(2)">-2</button>
          </div>
          <div class="col-6 col-sm-3">
            <button class="btn btn-danger w-100" @click="sub(5)">-5</button>
          </div>
          <div class="col-6 col-sm-3">
            <button class="btn btn-danger w-100" @click="sub(10)">-10</button>
          </div>

          <div class="col-6 col-sm-3">
            <button class="btn btn-success w-100" @click="add(1)">+1</button>
          </div>
          <div class="col-6 col-sm-3">
            <button class="btn btn-success w-100" @click="add(2)">+2</button>
          </div>
          <div class="col-6 col-sm-3">
            <button class="btn btn-success w-100" @click="add(5)">+5</button>
          </div>
          <div class="col-6 col-sm-3">
            <button class="btn btn-success w-100" @click="add(10)">+10</button>
          </div>
        </div>
      </div>
    </div>
  `
}
  }
});
