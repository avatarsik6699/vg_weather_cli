#!/usr/bin/env node

import { args } from "./helpers/args.js";
import { actions } from "./services/actions.service.js";
import { logService } from "./services/log.service.js";

const init_cli = () => {
  const argsList = args.get(process.argv);
  const { withoutArgs } = argsList.values;

  actions.forEach(({ arg, action }) => {
    const shortArg = arg.slice(0, 1);
    const hasArg = argsList[shortArg];

    if (hasArg) action(argsList.values[shortArg] || []);
  });

  if (args.isArgsListEmpty(argsList)) {
    if (withoutArgs.length) {
      logService.print.error(`values ${JSON.stringify(withoutArgs)} were passed without parameters`);
    } else {
      const { action } = actions.find((item) => item.arg === "get");

      if (action) action([]);
    }
  }
};

init_cli();
