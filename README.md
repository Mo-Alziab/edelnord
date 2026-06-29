# EDELNORD CATERING — VIP Website

## Farbpalette (aus Logo)
| Token          | Wert        | Verwendung                  |
|----------------|-------------|-----------------------------|
| `--black`      | `#080808`   | Hintergrund                 |
| `--black-mid`  | `#111111`   | Sections-Hintergrund        |
| `--black-card` | `#141414`   | Karten & Elemente           |
| `--gold-deep`  | `#a07828`   | Tiefer Gold-Akzent          |
| `--gold`       | `#c9943a`   | Primäres Gold               |
| `--gold-bright`| `#e8c96d`   | Helles Gold / Highlights    |
| `--gold-light` | `#f5e4b0`   | Sehr helles Gold            |
| `--white`      | `#f9f5ee`   | Haupttext (warmweiß)        |

## Typografie
- **Display / Headlines**: Cormorant Garamond (Serif, elegant)
- **UI / Body / Navigation**: Montserrat (Sans-serif, modern)

## Projektstruktur
```
edelnord-catering/
├── index.html          ← Haupt-HTML (alle Sektionen)
├── css/
│   └── style.css       ← Komplettes Design-System
├── js/
│   └── main.js         ← Cursor, Animationen, Formular
├── assets/             ← Bilder, Logo hier einfügen
└── README.md
```

## Sektionen
1. **Hero** — Vollbild Einstieg mit Animationen
2. **Leistungen** — 4 Service-Karten (Buffet, BBQ, Fingerfood, Tagung)
3. **Warum Edelnord** — USPs + visuelles Monogramm
4. **Impressionen** — 5-teiliges Gallery-Grid
5. **Angebote** — Leistungs-Übersicht + CTA
6. **Über uns** — Story + Zitat-Block + Statistiken
7. **Kontakt** — Kontaktformular + Details
8. **Footer** — Links, Impressum

## Features
- ✅ Benutzerdefinierter Gold-Cursor
- ✅ Scroll-Reveal Animationen
- ✅ Navbar (scrollt → festigt sich)
- ✅ Counter-Animationen
- ✅ Responsive (Mobile-Menu)
- ✅ Kontaktformular mit Feedback
- ✅ Noise-Textur Overlay (subtil)
- ✅ Parallax auf Hero

## Bilder einfügen
Ersetzen Sie die Platzhalter in `index.html` (`.gallery-placeholder`) mit echten `<img>` Tags:
```html
<img src="assets/buffet.jpg" alt="Edelnord Buffet" style="width:100%;height:100%;object-fit:cover;">
```

## Nächste Schritte
- [ ] Logo als SVG/PNG in `assets/` einfügen
- [ ] Echte Fotos in die Gallery einbinden
- [ ] Kontakt-Daten (Telefon, E-Mail) aktualisieren
- [ ] Formular-Backend anbinden (z.B. Formspree, Netlify Forms)
- [ ] Domain + Hosting einrichten
