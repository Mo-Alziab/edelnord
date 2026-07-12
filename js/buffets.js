document.addEventListener("DOMContentLoaded", () => {

  /* ==========================================
     BUFFET-NAMEN
     ========================================== */

  const buffetNames = [
    "Klassisches Buffet",
    "Norddeutsches Buffet",
    "Mediterranes Buffet",
    "Orientalisches Buffet",
    "Grillbuffet",
    "BBQ Premium Buffet",
    "Sommerliches Grillbuffet",
    "Genussbuffet"
  ];


  /* ==========================================
     DESKTOP-BILDER
     ========================================== */

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


  /* ==========================================
     LANGE HANDY-BILDER
     ========================================== */

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


  /* ==========================================
     ALBUM-BILDER
     ========================================== */

  const albumImages = [
    "assets/album1.jpg",
    "assets/album2.jpg",
    "assets/album3.jpg",
    "assets/album4.jpg",
    "assets/album5.jpg"
  ];


  /* ==========================================
     ELEMENTE AUS DEM HTML
     ========================================== */

  const tabs = document.querySelectorAll(".buffet-tab");

  const buffetImage =
    document.getElementById("buffet-image");

  const albumImage =
    document.getElementById("side-album-image");

  const buffetTitle =
    document.getElementById("mobile-buffet-title");

  const buffetCounter =
    document.getElementById("buffet-counter");

  const previousButton =
    document.getElementById("prev-buffet");

  const nextButton =
    document.getElementById("next-buffet");

  const mobileScreen =
    window.matchMedia("(max-width: 900px)");


  /* ==========================================
     AKTUELLE POSITIONEN
     ========================================== */

  let activeBuffetIndex = 0;
  let albumIndex = 0;

  let touchStartX = 0;
  let touchStartY = 0;

  let touchEndX = 0;
  let touchEndY = 0;

  let isChangingBuffet = false;


  /* ==========================================
     RICHTIGES BILD FÜR GERÄT
     ========================================== */

  function getBuffetImage(index) {
    if (mobileScreen.matches) {
      return mobileBuffetImages[index];
    }

    return desktopBuffetImages[index];
  }


  /* ==========================================
     INDEX ABSICHERN
     ========================================== */

  function normalizeIndex(index) {
    const totalBuffets = buffetNames.length;

    if (index < 0) {
      return totalBuffets - 1;
    }

    if (index >= totalBuffets) {
      return 0;
    }

    return index;
  }


  /* ==========================================
     TITEL UND ZÄHLER AKTUALISIEREN
     ========================================== */

  function updateBuffetInformation(index) {
    if (buffetTitle) {
      buffetTitle.textContent = buffetNames[index];
    }

    if (buffetCounter) {
      buffetCounter.textContent =
        `${index + 1} / ${buffetNames.length}`;
    }

    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });

    if (tabs[index]) {
      tabs[index].classList.add("active");
    }
  }


  /* ==========================================
     BUFFET ANZEIGEN
     ========================================== */

  function showBuffet(index, direction = "none") {
    if (!buffetImage || isChangingBuffet) {
      return;
    }

    const newIndex = normalizeIndex(index);

    isChangingBuffet = true;

    /*
      Bei Pfeil oder Swipe bewegt sich das alte Bild
      leicht in die gewählte Richtung.
    */

    if (direction === "next") {
      buffetImage.style.transform =
        "translateX(-35px)";
    } else if (direction === "previous") {
      buffetImage.style.transform =
        "translateX(35px)";
    } else {
      buffetImage.style.transform =
        "translateX(0)";
    }

    buffetImage.style.opacity = "0";

    window.setTimeout(() => {
      activeBuffetIndex = newIndex;

      buffetImage.src =
        getBuffetImage(activeBuffetIndex);

      buffetImage.alt =
        buffetNames[activeBuffetIndex];

      updateBuffetInformation(activeBuffetIndex);

      /*
        Das neue Bild startet leicht von der
        gegenüberliegenden Seite.
      */

      if (direction === "next") {
        buffetImage.style.transform =
          "translateX(35px)";
      } else if (direction === "previous") {
        buffetImage.style.transform =
          "translateX(-35px)";
      } else {
        buffetImage.style.transform =
          "translateX(0)";
      }

      /*
        Browser erhält kurz Zeit, das neue Bild
        zu zeichnen.
      */

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          buffetImage.style.opacity = "1";
          buffetImage.style.transform =
            "translateX(0)";
        });
      });

      window.setTimeout(() => {
        isChangingBuffet = false;
      }, 320);

    }, 180);
  }


  /* ==========================================
     NÄCHSTES BUFFET
     ========================================== */

  function showNextBuffet() {
    showBuffet(
      activeBuffetIndex + 1,
      "next"
    );
  }


  /* ==========================================
     VORHERIGES BUFFET
     ========================================== */

  function showPreviousBuffet() {
    showBuffet(
      activeBuffetIndex - 1,
      "previous"
    );
  }


  /* ==========================================
     DESKTOP-BUTTONS
     ========================================== */

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const selectedIndex =
        Number(tab.dataset.buffet);

      if (Number.isNaN(selectedIndex)) {
        return;
      }

      const direction =
        selectedIndex >= activeBuffetIndex
          ? "next"
          : "previous";

      showBuffet(selectedIndex, direction);
    });
  });


  /* ==========================================
     MOBILE PFEILE
     ========================================== */

  if (nextButton) {
    nextButton.addEventListener(
      "click",
      showNextBuffet
    );
  }

  if (previousButton) {
    previousButton.addEventListener(
      "click",
      showPreviousBuffet
    );
  }


  /* ==========================================
     SWIPE AUF DEM MENÜBILD
     ========================================== */

  if (buffetImage) {

    buffetImage.addEventListener(
      "touchstart",
      (event) => {
        if (!event.touches[0]) {
          return;
        }

        touchStartX =
          event.touches[0].clientX;

        touchStartY =
          event.touches[0].clientY;

        touchEndX = touchStartX;
        touchEndY = touchStartY;
      },
      {
        passive: true
      }
    );


    buffetImage.addEventListener(
      "touchmove",
      (event) => {
        if (!event.touches[0]) {
          return;
        }

        touchEndX =
          event.touches[0].clientX;

        touchEndY =
          event.touches[0].clientY;
      },
      {
        passive: true
      }
    );


    buffetImage.addEventListener(
      "touchend",
      () => {

        const horizontalDistance =
          touchEndX - touchStartX;

        const verticalDistance =
          touchEndY - touchStartY;

        const minimumSwipeDistance = 55;

        /*
          Nur horizontal wechseln, wenn die
          Bewegung stärker horizontal als vertikal war.

          Dadurch funktioniert normales Scrollen
          nach oben und unten weiterhin.
        */

        const isHorizontalSwipe =
          Math.abs(horizontalDistance) >
          Math.abs(verticalDistance);

        if (!isHorizontalSwipe) {
          return;
        }

        if (
          Math.abs(horizontalDistance) <
          minimumSwipeDistance
        ) {
          return;
        }

        /*
          Finger nach links:
          nächstes Buffet
        */

        if (horizontalDistance < 0) {
          showNextBuffet();
          return;
        }

        /*
          Finger nach rechts:
          vorheriges Buffet
        */

        showPreviousBuffet();
      },
      {
        passive: true
      }
    );
  }


  /* ==========================================
     TASTATUR-STEUERUNG
     ========================================== */

  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "ArrowRight") {
        showNextBuffet();
      }

      if (event.key === "ArrowLeft") {
        showPreviousBuffet();
      }
    }
  );


  /* ==========================================
     BILD BEI GERÄTEWECHSEL AKTUALISIEREN
     ========================================== */

  function updateImageForScreenSize() {
    if (!buffetImage) {
      return;
    }

    buffetImage.style.opacity = "0";

    window.setTimeout(() => {
      buffetImage.src =
        getBuffetImage(activeBuffetIndex);

      buffetImage.style.opacity = "1";
    }, 150);
  }

  if (
    typeof mobileScreen.addEventListener ===
    "function"
  ) {
    mobileScreen.addEventListener(
      "change",
      updateImageForScreenSize
    );
  } else {
    mobileScreen.addListener(
      updateImageForScreenSize
    );
  }


  /* ==========================================
     AUTOMATISCHES ALBUM
     ========================================== */

  function changeAlbumImage() {
    if (
      !albumImage ||
      albumImages.length === 0
    ) {
      return;
    }

    albumImage.style.opacity = "0";

    window.setTimeout(() => {
      albumIndex =
        (albumIndex + 1) %
        albumImages.length;

      albumImage.src =
        albumImages[albumIndex];

      albumImage.alt =
        `Buffet Impression ${albumIndex + 1}`;

      albumImage.style.opacity = "1";
    }, 300);
  }

  window.setInterval(
    changeAlbumImage,
    3000
  );


  /* ==========================================
     ERSTES BUFFET LADEN
     ========================================== */

  updateBuffetInformation(0);

  if (buffetImage) {
    buffetImage.src = getBuffetImage(0);
    buffetImage.alt = buffetNames[0];
  }

});