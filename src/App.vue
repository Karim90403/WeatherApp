<template>
<img v-if="isInSettings" src="./components/icons/back.png" alt="Settings" class="navigation__icon" @click="toggleNav"/>
<img v-else src="./components/icons/settings.png" alt="Settings" class="navigation__icon" @click="toggleNav"/>
<div v-if="isInSettings"> 
  <h1 class="navigation__title">Settings</h1>
  <form @submit.prevent="addSity" class="settings__form">
    <input v-model="newSity" class="settings__input" type="text" name="newSity" placeholder="New Sity" required>
    <button class="settings__button">Add</button>    
  </form>
  <div v-for='sity in sityArray' :key="sity.id" class="list">
    {{sity.name}}
    <div @click="removeSity(sity)">X</div>
  </div>
</div>
<sity v-else
  v-for='sity in sityArray' :key="sity.id"
  v-bind:sity="sity.name"
></sity>
</template>

<script>
import sity from './components/sity.vue';
let id = 0
export default{
  data() {
    return {
      isInSettings: false,
      newSity: '',
      sityArray: [
        {id: id++, name: 'Moscow'},
        {id: id++, name: 'Berlin'},
        {id: id++, name: 'London'}
      ]
    }
  },
  components: {
    sity
  },
  methods: {
    addSity() {
      this.sityArray.push({ id: id++, name: this.newSity })
      this.newSity = ''
    },
    removeSity(sity) {
      this.sityArray = this.sityArray.filter((t) => t !== sity)
    },
    toggleNav(){
      this.isInSettings = !this.isInSettings
    }
  }
}
</script>

