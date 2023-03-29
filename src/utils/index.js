import imagesLoaded from 'imagesloaded';

/**
 * Preload images
 * @param {String} selector - Selector/scope from where images need to be preloaded. Default is 'img'
 */
const preloadImages = (selector = 'img') => {
  return new Promise((resolve) => {
    imagesLoaded(document.querySelectorAll(selector), { background: true }, resolve);
  });
};

const randomNumberInRange = (min, max) => Math.random() * (max - min) + min;

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

const shuffle = ([...arr]) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
};

const randomFontWeight = () => sample(shuffle([100, 200, 300, 400, 500, 600, 700]));

const randomDuration = (min = 1.2, max = 2.4) => randomNumberInRange(min, max);

export { preloadImages, randomNumberInRange, sample, shuffle, randomDuration, randomFontWeight };
