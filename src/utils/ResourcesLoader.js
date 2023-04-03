import { Loader } from 'resource-loader';

import Singleton from './Singleton';

import resourcesData from '../data/resources.json';

class ResourcesLoader extends Singleton {
  constructor() {
    super();
    this.loader = new Loader();
    this._items = {};

    this.loader.add(resourcesData.map((asset) => `/${asset.path}`)).load((loader, resources) => {
      Object.values(resources).forEach((asset, index) => {
        const assetData = resourcesData[index];
        this.addItem(assetData.name, { ...assetData, file: asset });
      });
    });
  }

  get items() {
    return this.items;
  }

  getItem(name) {
    return this._items[name];
  }

  getItems() {
    return this._items;
  }

  addItem(name, file) {
    this._items[name] = file;
  }
}

export default new ResourcesLoader();
