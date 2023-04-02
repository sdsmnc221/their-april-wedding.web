import Resources from './Resources';
import { Howl } from 'howler';
// import bidello from 'bidello';
import sources from '../data/resources.json';

const triggerName = 'resourcesIsReady';
const loadedEvent = new CustomEvent(triggerName);

export default class Loaders {
  constructor() {
    // this.baseUrl = window.location.origin;
    this.sources = sources;
    this.load();
  }

  trigger() {
    // bidello.trigger({ name: triggerName });
    window.dispatchEvent(loadedEvent);
  }

  load() {
    this.toLoad = sources.length;
    this.loaded = 0;

    const sourceLoaded = (source, file) => {
      if (!Resources.getItem(source.name))
        Resources.addItem(source.name, {
          file: file,
          options: source.options || null,
          type: source.type,
          name: source.name,
        });

      this.loaded++;
      if (this.loaded === this.toLoad) {
        this.trigger();
      }
    };

    // Load each source
    for (const source of this.sources) {
      if (Resources.getItem(source.name)) {
        sourceLoaded(source, null);
      } else if (source.type === 'image') {
        const file = this.supportsWebP()
          ? source.path.replace('.png', '.webp').replace('.jpg', '.webp').replace('.jpeg', '.webp')
          : source.path;
        sourceLoaded(source, file);
      } else if (source.type === 'audio') {
        const file = new Howl({
          src: [`/${source.path}`],
          ...source.options,
          autoplay: false,
          autoUnlock: true,
          onload: () => {
            sourceLoaded(source, file);
          },
        });
      }
    }
  }

  supportsWebP() {
    const elem = document.createElement('canvas');
    if (elem.getContext && elem.getContext('2d')) {
      return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
    }
    return false;
  }

  get progress() {
    return this.loaded / this.toLoad;
  }
}
