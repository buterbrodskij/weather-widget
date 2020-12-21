export namespace IWidgetStore {
  export interface IWidget {
    weather: IWidget.ICityWeather[],
    editMode: boolean;
  }
}


export namespace IWidget {
  export enum LocalStorageKey {
    CITIES_ARRAY = 'citiesArray'
  }

  export interface IUserLocation {
    IPv4: string;
    city: string;
    country_code: string;
    country_name: string;
    latitude: number;
    longitude: number;
    postal: string;
    state: string;
  }

  export interface ICityWeather {
    base: string;
    clouds: IClouds;
    cod: number;
    coord: ICoord;
    dt: number;
    id: number;
    main: ITemp;
    name: string;
    sys: ISys;
    weather: IWeatherItem[];
    wind: IWind;
    visibility: number;
  }

  export interface IClouds {
    all: number;
  }

  export interface ICoord {
    lat: number;
    long: number;
  }

  export interface ITemp {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  }

  export interface ISys {
    country: string;
    id: number;
    sunrise: number;
    sunset: number;
    type: number;
  }

  export interface IWeatherItem {
    description: string;
    icon: string;
    id: number;
    main: string;
  }

  export interface IWind {
    deg: number;
    speed: number;
  }
}
