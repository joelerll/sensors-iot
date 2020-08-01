import endpoints from "./endpoints";
import axios from "axios";
import { defaultsDeep } from "lodash";

class Fetch {
  constructor(config) {
    this.config = defaultsDeep(
      {
        baseURL: endpoints.BASE_PATH,
      },
      config
    );
    this.Fetch = axios.create({
      baseURL: this.config.baseURL,
    });
    this.ENDPOINTS = endpoints;
  }

  Get(path) {
    return this.Fetch.get(path);
  }

  Post(path, body) {
    return this.Fetch.post(path, body);
  }
}

export default Fetch;
