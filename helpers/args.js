import { actions } from "../services/actions.service.js";
import { config } from "../weather.config.js";

export const args = {
  get([, , ...otherArgs]) {
    let prevArg = null;
    
    return otherArgs.reduce(
      (formattedArgs, rawArg) => {
        if (this._isArg(rawArg)) {
          const { short } = this._getArgWithoutPrefix(rawArg);

          if (this._isDuplicate(rawArg, formattedArgs)) return formattedArgs;
          if (this._isMatch(rawArg)) {
            prevArg = short;
            formattedArgs[short] = true;
            formattedArgs.values[short] = [];
          }

          return formattedArgs;
        }

        if (this._isValue(rawArg)) {
          if (prevArg) {
            formattedArgs.values[prevArg].push(rawArg);
          } else {
            formattedArgs.values.withoutArgs.push(rawArg);
          }

          return formattedArgs;
        }

        return formattedArgs;
      },
      { values: { withoutArgs: [] } }
    );
  },

  isArgsListEmpty(argsList) {
    return Object.keys(argsList).length === 1;
  },

  _isValue(rawArg) {
    return !Boolean(rawArg.match(config.regex.prefix));
  },

  _isArg(rawArg) {
    return config.regex.arg.test(rawArg);
  },

  _isMatch(rawArg) {
    const { full } = this._getArgWithoutPrefix(rawArg);

    return actions.some(({ arg: validArg }) => {
      const shortValidArg = validArg.slice(0, 1);

      return full === validArg || full === shortValidArg;
    });
  },

  _isDuplicate(rawArg, formattedArgs) {
    const { short } = this._getArgWithoutPrefix(rawArg);
    return Boolean(formattedArgs[short]);
  },

  _getArgWithoutPrefix(rawArg) {
    const [, argWithoutPrefix] = rawArg.match(config.regex.arg) || [];

    return {
      full: argWithoutPrefix,
      short: argWithoutPrefix?.slice(0, 1),
    };
  },
};
