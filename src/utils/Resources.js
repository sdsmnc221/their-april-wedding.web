import Singleton from './Singleton';

class Resources extends Singleton {
  constructor() {
    super();
    this._items = {};
  }

  get items() {
    return this.items;
  }

  getItem(name) {
    return this._items[name];
  }

  addItem(name, file) {
    this._items[name] = file;
  }
}

export default new Resources();
