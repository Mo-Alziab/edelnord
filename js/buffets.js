const buffets = [
  {
    title: "Buffet 1",
    sections: [
      { icon: "🥖", title: "Brotauswahl", items: ["Brotkorb mit Butter und Dips"] },
      { icon: "🥗", title: "Salate", items: ["Gemischte Salate", "Hausgemachte Dressings"] },
      { icon: "🍖", title: "Hauptgerichte", items: ["Fleischgerichte", "Beilagen nach Wahl"] },
      { icon: "🍰", title: "Dessert", items: ["Süßer Abschluss"] }
    ]
  },
  {
    title: "Buffet 2",
    sections: [
      { icon: "🥖", title: "Brotauswahl", items: ["Frisches Brot mit Dips"] },
      { icon: "🥗", title: "Vorspeisen", items: ["Antipasti", "Salate"] },
      { icon: "🍗", title: "Hauptgerichte", items: ["Geflügel", "Fleischgerichte", "Beilagen"] },
      { icon: "🍮", title: "Dessert", items: ["Dessertvariation"] }
    ]
  },
  {
    title: "Buffet 3",
    sections: [
      { icon: "🥗", title: "Salate", items: ["Frische Salate", "Vegetarische Auswahl"] },
      { icon: "🐟", title: "Fisch", items: ["Fischgerichte nach Auswahl"] },
      { icon: "🍖", title: "Fleisch", items: ["Warme Fleischgerichte"] },
      { icon: "🍰", title: "Dessert", items: ["Hausgemachte Desserts"] }
    ]
  },
  {
    title: "Buffet 4",
    sections: [
      { icon: "🍢", title: "Fingerfood", items: ["Kleine herzhafte Spezialitäten"] },
      { icon: "🥘", title: "Warme Speisen", items: ["Ausgewählte warme Gerichte"] },
      { icon: "🥔", title: "Beilagen", items: ["Kartoffeln", "Reis", "Gemüse"] },
      { icon: "🍓", title: "Dessert", items: ["Fruchtige Dessertauswahl"] }
    ]
  },
  {
    title: "Buffet 5",
    sections: [
      { icon: "🥖", title: "Brot & Dips", items: ["Brotvariation", "Hausgemachte Dips"] },
      { icon: "🥗", title: "Salate", items: ["Saisonale Salate"] },
      { icon: "🍖", title: "Hauptgerichte", items: ["Fleisch und vegetarische Speisen"] },
      { icon: "🍮", title: "Dessert", items: ["Süße Auswahl"] }
    ]
  },
  {
    title: "Buffet 6",
    sections: [
      { icon: "🌱", title: "Vegetarisch & Vegan", items: ["Vegetarische Speisen", "Vegane Optionen"] },
      { icon: "🥗", title: "Frische Auswahl", items: ["Salate", "Gemüsegerichte"] },
      { icon: "🍝", title: "Warme Gerichte", items: ["Pasta", "Aufläufe", "Beilagen"] },
      { icon: "🍰", title: "Dessert", items: ["Dessertvariation"] }
    ]
  },
  {
    title: "Buffet 7",
    sections: [
      { icon: "⭐", title: "Premium Buffet", items: ["Feine Vorspeisen", "Ausgewählte Hauptgänge"] },
      { icon: "🍖", title: "Hauptgerichte", items: ["Fleisch", "Fisch", "Vegetarisch"] },
      { icon: "🥔", title: "Beilagen", items: ["Kartoffeln", "Reis", "Gemüse"] },
      { icon: "🍫", title: "Dessert", items: ["Edle Dessertauswahl"] }
    ]
  }
];

const images = [
  "assets/buffet-gallery-1.jpg",
  "assets/buffet-gallery-2.jpg",
  "assets/buffet-gallery-3.jpg",
  "assets/buffet-gallery-4.jpg"
];

const tabs = document.querySelectorAll(".buffet-tab");
const title = document.getElementById("buffet-title");
const content = document.getElementById("buffet-content");
const image = document.getElementById("buffet-image");

function showBuffet(index) {
  const buffet = buffets[index];

  title.textContent = buffet.title;

  content.innerHTML = buffet.sections.map(section => `
    <div class="buffet-section">
      <h3><span>${section.icon}</span> ${section.title}</h3>
      <ul>
        ${section.items.map(item => `<li>${item}</li>`).join("")}
      </ul>
    </div>
  `).join("");

  tabs.forEach(tab => tab.classList.remove("active"));
  tabs[index].classList.add("active");
}

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    showBuffet(Number(tab.dataset.buffet));
  });
});

let imageIndex = 0;

setInterval(() => {
  imageIndex = (imageIndex + 1) % images.length;
  image.src = images[imageIndex];
}, 3500);

showBuffet(0);