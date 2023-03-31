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

  getAudios() {
    return Object.entries(this._items)
      .filter((item) => item[1].type === 'audio')
      .map((item) => item[1]);
  }

  getItems() {
    return this._items;
  }

  addItem(name, file) {
    this._items[name] = file;
  }
}

export default new Resources();
