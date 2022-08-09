<template>
<img v-if="isInSettings" src="./components/icons/back.png" alt="Settings" class="navigation__icon" @click="toggleNav"/>
<img v-else src="./components/icons/settings.png" alt="Settings" class="navigation__icon" @click="toggleNav"/>
<div v-if="isInSettings"> 
  <h1 class="navigation__title">Settings</h1>
  <form @submit.prevent="addSity" class="settings__form">
    <input v-model="newSity" class="settings__input" type="text" name="newSity" placeholder="New Sity" required>
    <button class="settings__button">Add</button>    
  </form>
  <div class="list" @drop="onDrop(event, 1)" @dragenter.prevent @dragover.prevent>
    <div v-for='sity in sityArray' :key="sity.id" class="list__element" 
    draggable="true" @dragstart="startDrag($event, sity)">
      <div class="list__burger-button"></div>
      <div class="list__text">{{sity.name}}</div>
      <div @click="removeSity(sity)" class="list__dismiss-button">X</div>
    </div>
  </div>
</div>
<sity v-else
  v-for='sity in sityArray' :key="sity.id"
  v-bind:sity="sity.name"
></sity>
</template>

<script>
import draggable from 'vuedraggable'
import sity from './components/sity.vue'
let id = 0
export default{
  data() {
    return {
      isInSettings: false,
      newSity: '',
      sityArray: [
        {id: id++, name: 'Moscow', list: 1},
        {id: id++, name: 'Berlin', list: 1},
        {id: id++, name: 'London', list: 1}
      ],
    }
  },
  components: {
    draggable,
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
    },
    startDrag(event, sity){
      console.log(sity)
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('sityID', sity.id)
      console.log(event.dataTransfer.getData('sityID'))
    },
    onDrop(event, list){
      console.log(list)
      const sityID = event.dataTransfer.getData('sityID')

      const sity = sityArray.vale.find((sity) => sity.id == sityID)
      sity.list = list
    }
  }
}
</script>

