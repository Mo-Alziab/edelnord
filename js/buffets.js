const buffetImages = [
  "assets/buffet/buffet1.png",
  "assets/buffet/buffet2.png",
  "assets/buffet/buffet3.png",
  "assets/buffet/buffet4.png",
  "assets/buffet/buffet5.png",
  "assets/buffet/buffet6.png",
  "assets/buffet/buffet7.png",
  "assets/buffet/buffet8.png"
];

const albumImages = [
  "assets/album1.jpg",
  "assets/album2.jpg",
  "assets/album3.jpg",
  "assets/album4.jpg",
  "assets/album5.jpg"
];

const tabs = document.querySelectorAll(".buffet-tab");
const buffetImage = document.getElementById("buffet-image");
const albumImage = document.getElementById("side-album-image");

function showBuffet(index) {
  if (!buffetImage || !tabs[index]) return;

  buffetImage.style.opacity = "0";

  setTimeout(() => {
    buffetImage.src = buffetImages[index];
    buffetImage.alt = `Buffet ${index + 1}`;
    buffetImage.style.opacity = "1";
  }, 200);

  tabs.forEach(tab => tab.classList.remove("active"));
  tabs[index].classList.add("active");
}

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    showBuffet(Number(tab.dataset.buffet));
  });
});

let albumIndex = 0;

setInterval(() => {
  if (!albumImage) return;

  albumImage.style.opacity = "0";

  setTimeout(() => {
    albumIndex = (albumIndex + 1) % albumImages.length;
    albumImage.src = albumImages[albumIndex];
    albumImage.style.opacity = "1";
  }, 300);
}, 3000);

showBuffet(0);