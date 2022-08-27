import { config } from "../weather.config.js";
import { apiService } from "./api.service.js";
import { logService } from "./log.service.js";
import { storageService } from "./storage.service.js";

const { CITY, TOKEN, STORAGE } = config.constants;

export const actions = [
  {
    arg: "help",
    short: true,
    action: (values) => {
      logService.print.help();
    },
  },
  {
    arg: "token",
    short: true,
    action: async (values) => {
      const token = values.shift();

      if (token) {
        await storageService.saveKeyValue(TOKEN, token);
        logService.print.success("token successfully saved.");
      } else {
        logService.print.error("after the [-t, --token] arg, you must pass the token.");
      }
    },
  },
  {
    arg: "set",
    short: true,
    action: async (values) => {
      // TODO: добавить обработку всех городов
      const city = values.shift();

      if (city) {
        await storageService.saveKeyValue(CITY, city);
        logService.print.success("city successfully saved.");
      } else {
        logService.print.error("after the [-s, --set] arg, you must pass the city.");
      }
    },
  },
  {
    arg: "get",
    short: true,
    action: async (values) => {
      // TODO: добавить обработку всех городов
      const city = values.shift() || (await storageService.getValueByKey(CITY));

      if (city) {
        const weatherInfo = await apiService.get.weather(city);
        if (weatherInfo) logService.print.weather(weatherInfo);
      } else {
        logService.print.error(`city not found in ${STORAGE}`);
      }
    },
  },
];
