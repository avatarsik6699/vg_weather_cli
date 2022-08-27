import axios from "axios";
import { config } from "../weather.config.js";
import { logService } from "./log.service.js";
import { storageService } from "./storage.service.js";
import {example} from '../demo/example.js';

const { EXAMPLE } = config.constants;

export const apiService = {
  get: {
    weather: async (city) => {
      if (city === EXAMPLE) return example

      const token = await storageService.getToken();

      if (token) {
        try {
          const { lon, lat } = await apiService.get.city(city);
          const { data } = await axios.get(config.urls.getWeather, {
            params: {
              lat,
              lon,
              appid: token,
              lang: "ru",
              units: "metric",
            },
          });

          return data;
        } catch (error) {
          console.error(error);
        }
      } else {
        logService.print.error("token not found.");
      }
    },

    city: async (city) => {
      const token = await storageService.getToken();

      if (token) {
        try {
          const { data } = await axios.get(config.urls.getCity, {
            params: {
              q: city,
              appid: token,
            },
          });

          // TODO: доработать с возможностью передавать несколько городов.
          return {
            lat: data[0].lat,
            lon: data[0].lon,
          };
        } catch (error) {
          console.error(error);
        }
      } else {
        logService.print.error("token not found.");
      }
    },
  },

  _getUrl(path, params) {
    const url = new URL(path);

    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    return url;
  },
};
