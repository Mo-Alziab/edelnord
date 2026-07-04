const buffetImages = [
  "assets/buffet/buffet1.png",
  "assets/buffet/buffet2.png",
  "assets/buffet/buffet3.png",
  "assets/buffet/buffet4.png",
  "assets/buffet/buffet5.png",
  "assets/buffet/buffet6.png",
  "assets/buffet/buffet7.png",
];

const tabs = document.querySelectorAll(".buffet-tab");
const image = document.getElementById("buffet-image");

function showBuffet(index) {

  // Change the large menu image
  image.style.opacity = "0";

  setTimeout(() => {
    image.src = buffetImages[index];
    image.alt = `Buffet ${index + 1}`;
    image.style.opacity = "1";
  }, 200);

  // Highlight the selected tab
  tabs.forEach(tab => tab.classList.remove("active"));
  tabs[index].classList.add("active");
}

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    showBuffet(Number(tab.dataset.buffet));
  });
});

showBuffet(0);
/* ===========================
   PHOTO ALBUM
=========================== */
const albumImages = [
  "assets/album1.jpg",
  "assets/album2.jpg",
  "assets/album3.jpg",
  "assets/album4.jpg",
  "assets/album5.jpg"
];

const sideAlbumImage = document.getElementById("side-album-image");
let albumIndex = 0;

setInterval(() => {
  if (!sideAlbumImage) return;

  albumIndex = (albumIndex + 1) % albumImages.length;

  sideAlbumImage.style.opacity = "0";

  setTimeout(() => {
    sideAlbumImage.src = albumImages[albumIndex];
    sideAlbumImage.style.opacity = "1";
  }, 300);
}, 3000);