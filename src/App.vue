<template>
  <img
    v-if="isInSettings"
    src="./components/icons/back.png"
    alt="Settings"
    class="navigation__icon"
    @click="toggleNav"
  />
  <img
    v-else
    src="./components/icons/settings.png"
    alt="Settings"
    class="navigation__icon"
    @click="toggleNav"
  />
  <div v-if="isInSettings">
    <h1 class="navigation__title">Settings</h1>
    <form @submit.prevent="addCity" class="settings__form">
      <input
        v-model="newCity"
        class="settings__input"
        type="text"
        name="newCity"
        placeholder="New City"
        required
      />
      <button class="settings__button">Add</button>
    </form>
    <div class="list">
      <draggable
        v-model="cityArray"
        handle=".list__burger-button"
        item-key="id"
        class="list__part1"
        
      >
        <template
          #item="city"
          :key="city.id"
        >
          <div class="list__item">
            <div class="list__burger-button"><div class="list__burger"></div></div>
            <p class="list__text">{{ city.element.name }}</p>
          </div>
        </template>
      </draggable>
      <div class="list__part2">
        <div v-for="city in cityArray" @click="removeCity(city)" class="list__dismiss-button">X</div>
      </div>
    </div>
  </div>
  <city
    v-else
    v-for="city in cityArray"
    :key="city.id"
    v-bind:city="city.name"
  ></city>
</template>

<script>
import draggable from "vuedraggable";
import city from "./components/city.vue";
let id = 0;
export default {
  data() {
    let id = 0
    return {
      drag: false,
      isInSettings: false,
      newCity: "",
      cityArray: [
        { id: id++, name: "Moscow" },
      ],
    };
  },
  components: {
    draggable,
    city,
  },
  methods: {
    addCity() {
      this.cityArray.push({ id: id++, name: this.newCity });
      this.newCity = "";
      localStorage.setItem("cityArray", JSON.stringify(this.cityArray))
    },
    removeCity(city) {
      this.cityArray = this.cityArray.filter((t) => t !== city);
      localStorage.setItem("cityArray", JSON.stringify(this.cityArray))
    },
    toggleNav() {
      this.isInSettings = !this.isInSettings;
    }
  },
  created() {
    this.$getLocation()
      .then((coordinates) => {
        console.log(coordinates);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  // mounted(){
  //   if (localStorage.getItem("cityArray").length > 0){
  //     this.cityArray = JSON.parse(localStorage.getItem("cityArray"))
  //   }
  // },
  unmounted(){
    localStorage.setItem("cityArray", JSON.stringify(this.cityArray))
  },
};
</script>

