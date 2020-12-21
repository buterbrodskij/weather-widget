<template>
  <div class="card">
    <div class="card__header">
      <div class="card__header-title">
        {{weather.name}}
      </div>

      <div class="card__header-setting" v-if="showSettingIcon" @click="toggleEditMode">
        <i class="el-icon-s-tools"></i>
      </div>
    </div>
    <div class="card__body">
      <div class="card__body-temp">
        <div class="card__body-temp-img">
          <img :src="`${baseUrl}/img/wn/${weather.weather[0].icon}@2x.png`">
        </div>
        <span class="card__body-temp-value">{{convertToCelsius(weather.main.temp)}}&#8451;</span>
      </div>
      <div class="card__body-desk">
        Feels like {{convertToCelsius(weather.main.feels_like)}}, {{weather.weather[0].description}}, {{weather.weather[0].main}}
      </div>

      <div class="card__body-humidity">
        humidity {{weather.main.humidity}} %
      </div>

      <div class="card__body-visibility">
        humidity {{weather.visibility / 1000}} km
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import {IWidget} from '@/interfaces/widget.iterface';
import {baseUrl} from '@/interfaces/api.interface';

@Component({
  components: {},
})
export default class CityCard extends Vue {
  @Prop({required: true}) weather: IWidget.ICityWeather;
  @Prop({required: true}) showSettingIcon: boolean;
  baseUrl = baseUrl;

  convertToCelsius(temp: number): number {
    return Math.floor(temp - 273);
  }

  toggleEditMode() {
    this.$store.commit('widget/setPropertyInStore', {name: 'editMode', value: true});
  }
}
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  background-color: #eee;

  &__header {
    display: flex;
    padding: 10px 20px;
    justify-content: space-between;
  }

  &__header-setting {
    cursor: pointer;
  }

  &__body {
    padding: 20px;
  }

  &__body-temp {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__body-temp-value {
    font-size: 28px;
    font-weight: 600;
  }

  &__body-desk {
    font-weight: 400;
    margin-bottom: 10px;
  }

  &__body-humidity {
    margin-bottom: 10px;
  }
}
</style>
