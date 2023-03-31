export const fadeIn = (music, transition = 1600, volume) => {
  volume = volume || music._volume;
  music.play();
  music.fade(0, volume, transition);
};

export const fadeOut = (music, volume, transition = 1600) => {
  volume = volume || music.volume;
  music.fade(volume, 0, transition);
  music.once('fade', (e) => {
    music.stop();
  });
};
