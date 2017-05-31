function Observer (data) {
  this.data = data;
  this.walk(data);
}

Observer.prototype = {
  walk: function (data) {
    var me = this;
    Object.keys(data).forEach(function (key) {
      me.convert(key, data[key]);
    });
  },
  convert: function (key, val) {
    this.defineReactive(this.data, key, val);
  },
  defineReactive: function(data, key, val) {
    Object.defineProperty(data, key, {
      enumerable: true, // 可枚举
      configurable: false,  // 子属性不能再define
      get: function () {

      },
      set: function (newVal) {
        if (newVal === val) {
          return;
        }
        val = newval;
        childObj = observe(newVal);
      }
    });
  }
}

function observe (value, vm) {
  if (!value || typeof value !== 'object') {
    return;
  }

  return new Observer(value);
}