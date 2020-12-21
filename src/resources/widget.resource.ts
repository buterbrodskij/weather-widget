import Axios, {AxiosResponse} from 'axios';
import {IWidget} from '@/interfaces/widget.iterface';
import {apiKey} from '@/interfaces/api.interface';



class WidgetResource {


  getUserPosition(): Promise<AxiosResponse<IWidget.IUserLocation>> {
    return (Axios.get('https://geolocation-db.com/json/') as Promise<AxiosResponse<IWidget.IUserLocation>>)
  }

  getCityWeather(cityName: string): Promise<AxiosResponse<IWidget.ICityWeather>> {
    return (Axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`) as Promise<AxiosResponse<IWidget.ICityWeather>>)
  }
}

export const widgetResource = new WidgetResource();
