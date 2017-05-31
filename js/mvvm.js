function MVVM (options) {
  this.$options = options || {};
  var data = this._data = this.$options.data;
  var me = this;

  // 数据代理
  // 实现vm.xxx -> vm._data.xxx
  Object.keys(data).forEach(function (key) {
    me._proxyData(key);
  })

  observe(data, this);
}

MVVM.prototype = {
  _proxyData: function (key, setter, getter) {
    var me = this;
    setter = setter ||
    Object.defineProperty(me, key, {
      configurable: false,
      enumerable: true,
      get: function proxyGetter () {
        return me._data[key];
      },
      set: function proxySetter (newVal) {
        me._data[key] = newVal;
      }
    })
  }
}