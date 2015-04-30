"use strict";

import request from "superagent";
import { OrderedMap } from "immutable";

let Cache = new OrderedMap();

export let get = (route, params) => {
  const url = route + "?" + Object.keys(params).map(key => {
    return `${key}=${params[key]}`;
  });
  const key = `GET ${url}`;

  clearCache(key);

  return new Promise((resolve, reject) => {
    let call = request.get(url)
      .on("error", reject)
      .end(resolve);

    addCall(key, call);
  }).then(endRequest(key));
};

export let post = (route, params) => {
  const key = `POST ${route} send ${JSON.stringify(params)}`;

  clearCache(key);

  return new Promise((resolve, reject) => {
    let call = request.post(route)
      .accept("application/json")
      .send(params)
      .on("error", reject)
      .end(resolve);

    addCall(key, call);
  }).then(endRequest(key));
};

export let put = (route, params) => {
  const key = `PUT ${route} send ${JSON.stringify(params)}`;

  clearCache(key);

  return new Promise((resolve, reject) => {
    let call = request.put(route)
      .accept("application/json")
      .send(params)
      .on("error", reject)
      .end(resolve);

    addCall(key, call);
  }).then(endRequest(key));
};

export let del = (route, params) => {
  const key = `DELETE ${route}`;

  clearCache(key);

  return new Promise((resolve, reject) => {
    let call = request.del(route)
      .accept("application/json")
      .on("error", reject)
      .end(resolve);

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

const endRequest = key => {
  return data => {
    Cache.delete(key);

    return data;
  };
};
