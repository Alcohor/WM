const checkResp = function(resp) {
  if (resp && (resp.code === 0 || resp.code === 1)) {
    if (resp.code === 1) return null;
    return resp.data;
  }
  return Promise.reject(resp);
};

export default {
  install(Vue) {
    Vue.checkResp = checkResp;
    Object.defineProperty(Vue.prototype, '$checkResp', { value: checkResp });
  }
};
