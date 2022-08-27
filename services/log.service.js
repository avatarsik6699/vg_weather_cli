import chalk from "chalk";
import dedent from "dedent-js";
import { config } from "../weather.config.js";

export const logService = {
  print: {
    error(msg) {
      console.log(`${chalk.bgRed(" ERROR ")} ${chalk.redBright.bold(msg)}`);
    },

    success(msg) {
      console.log(`${chalk.bgGreen(" SUCCESS ")} ${chalk.greenBright.bold(msg)}`);
    },

    help() {
      console.log(
        dedent(
          `${chalk.bgCyan.bold(" HELP ")}
        ${chalk.italic.yellowBright("no params")} -> print weather.
        ${chalk.italic.yellowBright("-s|--set")} ${chalk.magenta.bold("[CITY]")} -> set city. 
        ${chalk.italic.yellowBright("-h|--help ")}-> print help info.
        ${chalk.italic.yellowBright("-t|--token")} ${chalk.magenta.bold("[API_KEY]")} -> save api token.
        ${chalk.italic.yellowBright("-g|--get")} ${chalk.magenta.bold(
            "[CITY] | []"
          )} -> get weather CITY. if the CITY is not passed, then displays the weather based on the saved cities in the ${
            config.constants.STORAGE
          }.
      `
        )
      );
    },

    weather(weatherInfo) {
      console.log(
        dedent(`
        ${chalk.bold.bgBlueBright(" WEATHER ")} 
        Погода в городе ${chalk.bgGrey(weatherInfo.name)} - ${logService._getIcon(weatherInfo.weather[0].main)}  ${weatherInfo.weather[0].description}
        ${chalk.bold.redBright('Температура')}: ${weatherInfo.main.temp} град. (ощущается как ${weatherInfo.main.feels_like} град.)
        ${chalk.bold.blueBright('Влажность')}: ${weatherInfo.main.humidity}%
        ${chalk.bold.greenBright('Скорость ветра')}: ${weatherInfo.wind.speed}м/c
      `)
      );
    },
  },

  _getIcon(weatherMain) {
    const correctWeatherMain = weatherMain.toLowerCase();
    const icons = [
      { icon: "☁", values: ["clouds"] },
      { icon: "🌧", values: ["rain"] },
      { icon: "⛈", values: ["thunderstorm"] },
      { icon: "❄", values: ["snow"] },
      { icon: "🌫", values: ["mist"] },
      { icon: "☀", values: ["clear"] },
    ];


    const res = icons.find((item) => {
      item.values.includes(correctWeatherMain);
    });


    return "☁";
  },
};
