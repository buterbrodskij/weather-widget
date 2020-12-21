import {IAppState} from '@/interfaces/app-state.iterface';
import {ActionContext} from "vuex";
import {IWidget, IWidgetStore} from '@/interfaces/widget.iterface';
import {widgetResource} from '@/resources/widget.resource';
import {AxiosResponse} from 'axios';
import Vue from 'vue';
type WidgetStore = ActionContext<IWidgetStore.IWidget, IAppState>;

export default {
  namespaced: true,

  state: {
    cityList: [],
    weather: [],
    editMode: false,
  },

  mutations: {
    setPropertyInStore(state: IWidgetStore.IWidget, { name, value }: { name: string; value: any}) {
      Vue.set(state, name, value);
    },
  },

  actions: {
    async getUserPosition({dispatch}: WidgetStore) {
      try {
        const {data}: AxiosResponse<IWidget.IUserLocation> = await widgetResource.getUserPosition();

        dispatch('getCityWeather', data.city);
      } catch (error) {
        console.log(error)
      }
    },

   async getCityWeather({commit, dispatch}: WidgetStore, cityName: string) {
      try {
        const {data}: AxiosResponse<IWidget.ICityWeather> = await widgetResource.getCityWeather(cityName);
        dispatch('setWeather', data);
      } catch (error) {
        console.log(error)
      }
    },

    setWeather({state, commit}: WidgetStore, cityWeather: IWidget.ICityWeather) {
      const weather = state.weather;

      if (!(weather.find((weatherItem: IWidget.ICityWeather) => weatherItem.name === cityWeather.name))) {
        weather.push(cityWeather);
      } else {
        return
      }

      commit('setPropertyInStore', {name: 'weather', value: weather});
    }
  }
};
