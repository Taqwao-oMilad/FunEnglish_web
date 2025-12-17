
//cards-sound
const audios = document.querySelectorAll("audio");
const radios = document.querySelectorAll("input[name='salid']");

radios.forEach((radio, index) => {
  radio.addEventListener("change", () => {
    audios.forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
    audios[index].play();
  });
});

document.querySelector(".wrapper").addEventListener("mouseleave", () => {
  audios.forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
  });
});

