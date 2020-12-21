<template>
  <div class="setting">
    <div class="setting__header">
      <h4 class="setting__title">Settings</h4>
      <span @click="closeSetting" class="setting__header-close"><i class="el-icon-close"></i></span>
    </div>

    <div class="setting__body">
      <ul class="setting__body-list">
        <draggable v-model="cityWeather" handle=".setting__body-item-drag">
        <li class="setting__body-item" v-for="(item, index) in cityWeather" :key="index">
          <span class="setting__body-item-drag">
            <i class="el-icon-menu"></i>
          </span>
          <span class="setting__body-item-name">{{item.name}}</span>
          <span class="setting__body-item-delete" @click="deleteCity(item.name)">
            <i class="el-icon-delete"></i>
          </span>
        </li>
        </draggable>
      </ul>
    </div>

    <div class="setting__footer">
      <el-input placeholder="Enter the name of the city" @keyup.enter="addCity" v-model="newCity"></el-input>
      <el-button class="setting__footer-btn" @click="addCity"><i class="el-icon-plus"></i></el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import draggable from 'vuedraggable'
import {IWidget} from '@/interfaces/widget.iterface';
@Component({
  components: {
    draggable
  },
})
export default class WidgetSetting extends Vue {

  newCity = '';

  get cityWeather(): IWidget.ICityWeather[] {
    return this.$store.state.widget.weather;
  }

  set cityWeather(value: IWidget.ICityWeather[]) {
    this.$store.commit('widget/setPropertyInStore', {name: 'weather', value})
  }

  closeSetting() {
    this.$store.commit('widget/setPropertyInStore', {name: 'editMode', value: false})
  }

  async addCity() {
    if (!this.newCity.trim()) return;

    await this.$store.dispatch('widget/getCityWeather', this.newCity);
    this.newCity = '';
  }

  deleteCity(name: string) {
    const items: IWidget.ICityWeather[] = this.cityWeather;
    this.$store.commit('widget/setPropertyInStore', {name: 'weather', value: items.filter((item: IWidget.ICityWeather) => item.name !== name)});
  }

}
</script>

<style lang="scss" scoped>
  .setting {

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px;
      border-bottom: 1px solid #000;
    }

    &__header-close {
      cursor: pointer;
    }

    &__title {
      margin: 0;
    }

    &__body {
      padding: 10px;
      display: flex;
      flex-direction: column;
    }

    &__body-list {
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
    }

    &__body-item {
      list-style-type: none;
      display: flex;
      align-items: center;
    }

    &__body-item-delete {
      margin-left: auto;
      cursor: pointer;
    }

    &__body-item-drag {
      margin-right: 10px;
      cursor: pointer;
    }

    &__footer {
      padding: 10px;
      display: flex;
      align-items: center;
    }

    &__footer-btn {
      margin-left: 10px;
      cursor: pointer;
    }
  }
</style>
