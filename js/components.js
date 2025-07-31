// Player Count Form Component
Vue.component('player-count-form', {
  props: ['digitHolder', 'win'],
  template: `
    <div>
      <div class="form-floating mb-3">
        <input type="number" class="form-control" id="players" placeholder="Aantal spelers" 
               :value="digitHolder" @input="$emit('update-digit-holder', $event.target.value)">
        <label for="players">Aantal spelers | شحال من واحد نتوما</label>
      </div>
      <div class="form-floating mb-3">
        <input type="number" class="form-control" id="win" placeholder="Win score" 
               :value="win" @input="$emit('update-win', $event.target.value)">
        <label for="win">Tot hoeveel spelen jullie? | على شحال لاعبين</label>
      </div>
      <button class="btn btn-primary w-100" @click="$emit('validate')">Volgende</button>
    </div>
  `
});

// Player Names Form Component
Vue.component('player-names-form', {
  props: ['usersCounter', 'users'],
  template: `
    <div>
      <h3 class="mb-4">Gebruikersnamen invullen | شكون لي لاعب</h3>
      <div class="form-floating mb-3" v-for="index in Number(usersCounter)" :key="index">
        <input type="text" class="form-control" :id="'user-' + index" placeholder="Naam" 
               :value="users[index-1]" 
               @input="$emit('update-user', { name: $event.target.value, index: index-1 })">
        <label :for="'user-' + index">Naam speler {{ index }} | سميتك</label>
      </div>
      <div class="d-flex justify-content-between mt-3">
        <button class="btn btn-secondary" @click="$emit('go-back')">← Terug</button>
        <button class="btn btn-success" @click="$emit('proceed')" 
                :disabled="users.length < usersCounter">Verder naar scores →</button>
      </div>
    </div>
  `
});

// Score Board Component
Vue.component('score-board', {
  props: ['users', 'win', 'scores'],
  template: `
    <div>
      <h3 class="mb-4">Scores</h3>
      <div class="card mb-4 shadow-sm score-card" v-for="(user, index) in users" :key="index">
        <div class="card-body">
          <h5 class="card-title text-center" style="word-break: break-word;">{{ user }}</h5>
          <p class="text-center fs-4 score-display">Score: {{ scores[index] }}</p>
          
          <div class="row g-2">
            <div class="col-6 col-sm-3">
              <button class="btn btn-danger w-100" @click="$emit('update-score', {index, value: -1})">-1</button>
            </div>
            <div class="col-6 col-sm-3">
              <button class="btn btn-danger w-100" @click="$emit('update-score', {index, value: -2})">-2</button>
            </div>
            <div class="col-6 col-sm-3">
              <button class="btn btn-danger w-100" @click="$emit('update-score', {index, value: -5})">-5</button>
            </div>
            <div class="col-6 col-sm-3">
              <button class="btn btn-danger w-100" @click="$emit('update-score', {index, value: -10})">-10</button>
            </div>

            <div class="col-6 col-sm-3">
              <button class="btn btn-success w-100" @click="$emit('update-score', {index, value: 1})">+1</button>
            </div>
            <div class="col-6 col-sm-3">
              <button class="btn btn-success w-100" @click="$emit('update-score', {index, value: 2})">+2</button>
            </div>
            <div class="col-6 col-sm-3">
              <button class="btn btn-success w-100" @click="$emit('update-score', {index, value: 5})">+5</button>
            </div>
            <div class="col-6 col-sm-3">
              <button class="btn btn-success w-100" @click="$emit('update-score', {index, value: 10})">+10</button>
            </div>
          </div>
        </div>
      </div>
      <button class="btn btn-secondary mt-4 w-100" @click="$emit('go-back')">← Terug naar namen</button>
    </div>
  `
});