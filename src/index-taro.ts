import taroRequest from './request/taro';
import RequestCore from './module/core';

class API extends RequestCore {
  constructor() {
    super();
    console.log(taroRequest);
  }
}

export default API;
