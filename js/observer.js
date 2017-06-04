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
        // 由于需要在闭包内添加watcher，所以通过Dep定义一个全局target属性，暂存watcher, 添加完移除
        if (Dep.target) {
          dep.depend();
        }
        return val;
      },
      set: function (newVal) {
        if (newVal === val) {
          return;
        }
        console.log('监听到值变化', val, '--->', newVal);
        val = newVal;
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

var uid = 0;

function Dep () {
  this.id = uid++;
  this.subs = [];
}

Dep.prototype = {
  depend: function () {
    Dep.target.addDep(this);
  }
}

Dep.target = null;