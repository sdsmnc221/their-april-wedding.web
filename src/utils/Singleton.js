class Singleton {
  static instance = null;

  constructor(options) {
    if (!this.constructor.instance) this.constructor.instance = this;
    else return this.constructor.instance;

    if (this.onInit) this.onInit(options);
  }
}

export default Singleton;

const singleton = (superclass = class T {}) =>
  class extends superclass {
    static instance = null;

    constructor(...args) {
      super(...args);

      if (!this.constructor.instance) this.constructor.instance = this;
      else return this.constructor.instance;

      this.onInit && this.onInit(args);
    }
  };

export { singleton };
