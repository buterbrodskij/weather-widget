<template>
  <div id="app">
    <Widget v-if="showWidget"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Widget from '@/components/Widget.vue';
import {IWidget} from '@/interfaces/widget.iterface';


@Component({
  components: {
    Widget
  },
})
export default class App extends Vue {

  showWidget: boolean = false;

  mounted() {
    this.init();
  }

  init() {
    const intervalId = setInterval(() => {
      const body = document.querySelector('body');

      if (body) {
        this.initWidget(body);
        clearInterval(intervalId);
      }
    }, 100)
  }

  async initWidget(body: HTMLElement) {
    body.style.position = 'relative';
    const storageList: IWidget.ICityWeather[] | [] = JSON.parse(window.localStorage.getItem(IWidget.LocalStorageKey.CITIES_ARRAY) || '[]');


    if (storageList.length) {
      this.$store.commit('widget/setPropertyInStore', {name: 'weather', value: storageList})
    } else {
     await this.$store.dispatch('widget/getUserPosition');
    }

    this.showWidget = true;
  }

}
</script>

<style lang="scss">
#app {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
