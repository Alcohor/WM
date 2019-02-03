
export default {
  install(Vue) {
    function handleError(err, msg) {
      if (typeof arguments[0] === 'string') {
        err = {
          config: {},
          code: '',
          data: {
            msg: arguments[0]
          }
        };
      }
      const message = (err && (err.msg || err.message || msg || '请求失败')) || err || '发生异常';
      Vue.prototype.$message.error(message);
    }
    Vue.handleError = handleError;
    Object.defineProperty(Vue.prototype, '$handleError', { value: handleError });
  }
};
