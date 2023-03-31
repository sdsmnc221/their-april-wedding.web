export const fadeIn = (music, transition = 800, volume) => {
  volume = volume || music._volume;
  music.play();
  music.fade(0, volume, transition);
};

export const fadeOut = (music, volume, transition = 800) => {
  volume = volume || music.volume;
  music.fade(volume, 0, transition);
  music.once('fade', (e) => {
    music.stop();
  });
};
