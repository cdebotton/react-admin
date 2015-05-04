"use strict";

import request from "superagent";
import { OrderedMap } from "immutable";
import alt from "../alt";

const PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || "localhost";
const BROWSER = process.env.BROWSER || false;
const ROOT = BROWSER ? window.location.origin : `http://${HOST}:${PORT}`;

let Cache = new OrderedMap();

export let get = (route, params) => {
  const url = ROOT + route + (params ?
     ("?" + Object.keys(params).map(key => {
       return `${key}=${params[key]}`;
     })) : "");

  const key = `GET ${url}`;

  clearCache(key);

  return new Promise((resolve, reject) => {
    let call = request.get(url)
      .set("X-API-Token", getToken())
      .on("error", reject)
      .end((err, response) => {
        if (err) {
          return reject(err);
        }

        resolve(response.body);
      });

    addCall(key, call);
  }).then(endRequest(key));
};

export let post = (route, params) => {
  const key = `POST ${route} send ${JSON.stringify(params)}`;
  let url = ROOT + route;

  clearCache(key);

  return new Promise((resolve, reject) => {
    let call = request.post(url)
      .set("X-API-Token", getToken())
      .send(params)
      .on("error", reject)
      .end((err, response) => {
        if (err) {
          reject(err);
        }

        resolve(response.body);
      });

    addCall(key, call);
  }).then(endRequest(key));
};

export let put = (route, params) => {
  const key = `PUT ${route} send ${JSON.stringify(params)}`;
  let url = ROOT + route;

  clearCache(key);

  return new Promise((resolve, reject) => {
    let call = request.put(url)
      .set("X-API-Token", getToken())
      .accept("application/json")
      .send(params)
      .on("error", reject)
      .end((err, response) => {
        if (err) {
          reject(err);
        }

        resolve(response.body);
      });

    addCall(key, call);
  }).then(endRequest(key));
};

export let del = (route, params) => {
  const key = `DELETE ${route}`;
  let url = ROOT + route;

  clearCache(key);

  return new Promise((resolve, reject) => {
    let call = request.del(url)
      .set("X-API-Token", getToken())
      .accept("application/json")
      .on("error", reject)
      .end((err, response) => {
        if (err) {
          reject(err);
        }

        resolve(response.body);
      });

    addCall(key, call);
  }).then(endRequest(key));
};

const addCall = (key, call) => {
  Cache.set(key, {
    request: call,
    cancel: cancel(key, call)
  });
};

const clearCache = key => {
  if (Cache.has(key)) {
    Cache.get(key).cancel();
  }
};

const cancel = key => {
  return () => {
    if (Cache.has(key)) {
      let call = Cache.get(key).request;

      call.abort();
      call._callback = function() {};
      Cache.delete(key);
    }
  };
};

const getToken = () => alt.stores.SessionStore.getToken();

const endRequest = key => {
  return data => {
    Cache.delete(key);
    return data;
  };
};
