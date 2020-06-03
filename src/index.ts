import AxiosRequest from './request/axios';
import RequestCore from './module/core';

class API extends RequestCore {
  constructor() {
    super();
    console.log(AxiosRequest);
  }
}

export default API;
