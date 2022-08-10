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
    <draggable
      v-model="cityArray"
      class="list"
    >
      <template
        v-for="city in cityArray"
        #item="city"
        :key="city.id"
      >
        <div class="list__element">
          <div class="list__burger-button"></div>
          <p class="list__text">{{ city.element.name }}</p>
          <div @click="removeCity(city)" class="list__dismiss-button">X</div>
        </div>
      </template>
    </draggable>
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
        { id: id++, name: "Berlin" },
        { id: id++, name: "London" },
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
    },
    removeCity(city) {
      this.cityArray = this.cityArray.filter((t) => t !== city);
    },
    toggleNav() {
      this.isInSettings = !this.isInSettings;
    }
  },
};
</script>

