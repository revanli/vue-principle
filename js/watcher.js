function Watcher (vm, expOrFn, cb) {
  this.cb = cb;
  this.vm = vm;
  this.depIds = {};
}

Watcher.prototype = {
  addDep: function () {
    if (!this.depIds.hasOwnProperty(dep.id)) {
      dep.addSub(this);
      this.depIds[dep.id] = dep;
    }
  },
  get: function () {
    Dep.target = this;
    var value = this.getter.call(this.vm, this.vm);
    Dep.target = null;
    return value;
  }
}