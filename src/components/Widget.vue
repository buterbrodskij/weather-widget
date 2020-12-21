<template>
  <div class="widget" v-loading="loading">
    <template v-if="!editMode">
      <template v-if="cityWeather.length">
        <div v-for="(weather, index) in cityWeather">
          <CityCard :weather="weather"
                    :key="index"
                    :showSettingIcon="index === 0"/>
        </div>
      </template>
      <div v-else class="widget__empty">
        <span>Добавте города в настройках</span>
        <span @click="openSettings">
          <i class="el-icon-s-tools"></i>
        </span>
      </div>
    </template>

    <WidgetSetting v-else/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import CityCard from '@/components/CityCard.vue';
import WidgetSetting from '@/components/WidgetSetting.vue';
import {IWidget} from '@/interfaces/widget.iterface';


@Component({
  components: {
    CityCard,
    WidgetSetting
  },
})
export default class Widget extends Vue {
  loading = false;

  async mounted() {
    this.loading = true;
    await Promise.all(this.cityWeather.map((city: IWidget.ICityWeather) => this.$store.dispatch('widget/getCityWeather', city.name)));
    this.loading = false;
  }

  get editMode(): boolean {
    return this.$store.state.widget.editMode;
  }

  get cityWeather(): IWidget.ICityWeather[] {
    return this.$store.state.widget.weather;
  }

  openSettings() {
    this.$store.commit('widget/setPropertyInStore', {name: 'editMode', value: true})
  }

  @Watch('cityWeather')
  onCityListChange() {
    window.localStorage.setItem(IWidget.LocalStorageKey.CITIES_ARRAY, JSON.stringify(this.cityWeather));
  }
}
</script>

<style lang="scss">
  .widget {
    max-width: 250px;
    max-height: 400px;
    overflow-y: scroll;

    &__empty {
      display: flex;
      align-items: center;
      padding: 10px;
      justify-content: space-between;
      border-bottom: 1px solid #000;
    }
  }
</style>
