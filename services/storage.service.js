import os from "os";
import path from "path";
import fs from "fs";
import { config } from "../weather.config.js";

const { readFile, stat, writeFile } = fs.promises;
const { STORAGE, TOKEN } = config.constants;

export const storageService = {
  storagePath: path.join(os.homedir(), STORAGE),

  async saveKeyValue(key, value) {
    let info = {};

    if (await this._isExist(this.storagePath)) {
      const json = await readFile(this.storagePath);
      info = JSON.parse(json);
    }

    info[key] = value;

    await writeFile(this.storagePath, JSON.stringify(info));
  },

  async getValueByKey(key) {
    if (await this._isExist(this.storagePath)) {
      const json = await readFile(this.storagePath);
      const data = JSON.parse(json);
      return data[key];
    }

    return null;
  },

  async getToken() {
    return process.env.TOKEN ?? (await this.getValueByKey(TOKEN));
  },

  async _isExist(path) {
    try {
      await stat(path);
      return true;
    } catch (error) {
      return false;
    }
  },
};
