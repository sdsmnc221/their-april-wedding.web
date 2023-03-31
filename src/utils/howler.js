export const fadeIn = (music, transition = 1600, volume = 1) => {
  music.play();
  music.fade(0, volume, transition);
};

export const fadeOut = (music, volume = 1, transition = 1600) => {
  music.fade(volume, 0, transition);
  music.once('fade', (e) => {
    music.stop();
  });
};
