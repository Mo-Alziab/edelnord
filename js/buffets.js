document.addEventListener("DOMContentLoaded", () => {

  /* Normale Bilder für Computer */
  const desktopBuffetImages = [
    "assets/buffet/buffet1.png",
    "assets/buffet/buffet2.png",
    "assets/buffet/buffet3.png",
    "assets/buffet/buffet4.png",
    "assets/buffet/buffet5.png",
    "assets/buffet/buffet6.png",
    "assets/buffet/buffet7.png",
    "assets/buffet/buffet8.png"
  ];

  /* Lange Bilder für Handys */
  const mobileBuffetImages = [
    "assets/buffet/mobile/buffet1.png",
    "assets/buffet/mobile/buffet2.png",
    "assets/buffet/mobile/buffet3.png",
    "assets/buffet/mobile/buffet4.png",
    "assets/buffet/mobile/buffet5.png",
    "assets/buffet/mobile/buffet6.png",
    "assets/buffet/mobile/buffet7.png",
    "assets/buffet/mobile/buffet8.png"
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

  const mobileScreen = window.matchMedia("(max-width: 900px)");

  let activeBuffetIndex = 0;
  let albumIndex = 0;

  function getBuffetImage(index) {
    if (mobileScreen.matches) {
      return mobileBuffetImages[index];
    }

    return desktopBuffetImages[index];
  }

  function showBuffet(index, scrollToImage = false) {
    if (
      !buffetImage ||
      !tabs[index] ||
      !desktopBuffetImages[index]
    ) {
      return;
    }

    activeBuffetIndex = index;

    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });

    tabs[index].classList.add("active");

    buffetImage.style.opacity = "0";

    window.setTimeout(() => {
      buffetImage.src = getBuffetImage(index);
      buffetImage.alt = `Buffet ${index + 1}`;
      buffetImage.style.opacity = "1";

      /*
        Beim Klick auf einen Button wird das Buffet-Bild
        auf dem Handy direkt sichtbar.
      */
      if (scrollToImage && mobileScreen.matches) {
        const menuArea = document.querySelector(".menu-area");

        if (menuArea) {
          menuArea.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      }
    }, 200);
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const buffetIndex = Number(tab.dataset.buffet);

      if (Number.isNaN(buffetIndex)) {
        return;
      }

      showBuffet(buffetIndex, true);
    });
  });

  /*
    Wenn das Handy gedreht oder das Browserfenster
    verändert wird, wird automatisch das richtige Bild geladen.
  */
  function updateImageForScreenSize() {
    if (!buffetImage) {
      return;
    }

    buffetImage.src = getBuffetImage(activeBuffetIndex);
  }

  if (typeof mobileScreen.addEventListener === "function") {
    mobileScreen.addEventListener("change", updateImageForScreenSize);
  } else {
    mobileScreen.addListener(updateImageForScreenSize);
  }

  /* Automatisches Album */

  window.setInterval(() => {
    if (!albumImage || albumImages.length === 0) {
      return;
    }

    albumImage.style.opacity = "0";

    window.setTimeout(() => {
      albumIndex = (albumIndex + 1) % albumImages.length;

      albumImage.src = albumImages[albumIndex];
      albumImage.alt = `Buffet-Impression ${albumIndex + 1}`;
      albumImage.style.opacity = "1";
    }, 300);

  }, 3000);

  showBuffet(0);
});