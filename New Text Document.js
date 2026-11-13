/* ============ TEXTES À MODIFIER ============ */
const CONFIG = {
  name1: "Fadhel Judes", name2: "Sena Diane",
  cardNames: "Fadhel & Sena", initials: "F & S",
  date: "02 · 01 · 2027", dateLong: "02 Janvier 2027",
  dateTarget: "2027-01-02T15:00:00",           // date et heure du compte à rebours
  openLabel: "Ouvrir notre invitation",
  heroKicker: "Nous nous marions",
  welcome: "Avec une immense joie, nous vous invitons à célébrer le plus beau jour de notre vie.",

  storyKicker: "Depuis le début", storyTitle: "Notre histoire",
  story: [
    {when: "Le commencement", title: "La rencontre", text: "Racontez ici votre première rencontre : le lieu, le moment, ce qui vous a marqués."},
    {when: "Le début d'une belle aventure", title: "Le premier rendez-vous", text: "Racontez ici votre premier rendez-vous et les souvenirs qui vous font sourire."},
    {when: "Le plus beau « oui »", title: "La demande en mariage", text: "Racontez ici la demande : l'endroit, l'émotion et la réponse."}
  ],

  galKicker: "Souvenirs", galTitle: "Notre galerie",
  gallery: ["photos/galerie1.jpg","photos/galerie2.jpg","photos/galerie3.jpg","photos/galerie4.jpg","photos/galerie5.jpg","photos/galerie6.jpg"],

  progKicker: "La journée", progTitle: "Le programme",
  program: [
    {h: "14h00", t: "Accueil des invités", d: "Installation et rafraîchissements"},
    {h: "15h00", t: "Cérémonie", d: "Échange des vœux"},
    {h: "17h00", t: "Cocktail", d: "Photos et moments de partage"},
    {h: "19h00", t: "Dîner et soirée", d: "Repas, discours et danse"}
  ],

  placeKicker: "Où nous retrouver", placeTitle: "Le lieu",
  venue: "[nom de la salle]", address: "[adresse], [ville]",
  placeNote: "Un parking est disponible sur place.",
  mapLabel: "Voir l'itinéraire",
  mapUrl: "[google.com](https://www.google.com/maps/search/?api=1&query=)" + encodeURIComponent("[nom de la salle], [adresse], [ville]"),

  infoKicker: "Bon à savoir", infoTitle: "Informations pratiques",
  infos: [
    {k: "Tenue", t: "Élégante", d: "Nous vous invitons à porter des tons chauds : crème, terracotta, brun."},
    {k: "Cadeaux", t: "Votre présence", d: "Votre présence est le plus beau des cadeaux. Une cagnotte est à votre disposition si vous le souhaitez."}
  ],

  rsvpKicker: "Réponse", rsvpTitle: "Confirmez votre présence",
  rsvpText: "Merci de nous faire savoir si vous serez des nôtres.",
  rsvpButton: "Envoyer ma réponse",
  rsvpWhatsApp: "",                              // ex : "2250102030405" (numéro international sans + ni espaces)
  rsvpEmail: "votre-email@exemple.com",          // utilisé si WhatsApp est vide
  deadline: "Date limite de réponse : 02 Décembre 2026",

  thanks: "Merci de faire partie de notre histoire",
  hashtag: "#FadhelEtSena2027"
};
/* ============================================ */

const $ = (s, c = document) => c.querySelector(s);
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

// Textes simples
document.querySelectorAll("[data-bind]").forEach(el => el.textContent = CONFIG[el.dataset.bind] ?? "");
$("#mapBtn").href = CONFIG.mapUrl;

// Frise
$("#timeline").insertAdjacentHTML("beforeend", CONFIG.story.map(s =>
  `<div class="t-item reveal"><span class="cinzel">${s.when}</span><h3>${s.title}</h3><p>${s.text}</p></div>`).join(""));

// Galerie
$("#gallery").innerHTML = CONFIG.gallery.map((src, i) =>
  `<div class="g reveal"><img src="${src}" alt="Photo ${i + 1} des mariés" loading="lazy" decoding="async"></div>`).join("");

// Programme
$("#program").innerHTML = CONFIG.program.map(p =>
  `<li class="reveal"><span class="cinzel">${p.h}</span><div><b>${p.t}</b>${p.d}</div></li>`).join("");

// Infos
$("#infos").innerHTML = CONFIG.infos.map(i =>
  `<div class="info reveal"><span class="cinzel">${i.k}</span><h3>${i.t}</h3><p>${i.d}</p></div>`).join("");

// Titres mot par mot
document.querySelectorAll(".split").forEach(h => {
  h.innerHTML = h.textContent.trim().split(/\s+/)
    .map((w, i) => `<span class="w"><span style="--i:${i}">${w}</span></span>`).join(" ");
});

// Apparition au défilement
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
}, { threshold: .15, rootMargin: "0px 0px -6% 0px" });
document.querySelectorAll(".reveal,.split").forEach(el => reduce ? el.classList.add("in") : io.observe(el));

// Compte à rebours
const target = new Date(CONFIG.dateTarget).getTime();
function tick() {
  let d = Math.max(0, target - Date.now());
  const days = Math.floor(d / 864e5); d %= 864e5;
  const h = Math.floor(d / 36e5); d %= 36e5;
  const m = Math.floor(d / 6e4), s = Math.floor((d % 6e4) / 1e3);
  $("#cd").textContent = days;
  $("#ch").textContent = String(h).padStart(2, "0");
  $("#cm").textContent = String(m).padStart(2, "0");
  $("#cs").textContent = String(s).padStart(2, "0");
}
tick(); setInterval(tick, 1000);

// Défilement : frise + profondeur galerie
const fill = $("#lineFill"), tl = $("#timeline"), imgs = [...document.querySelectorAll(".g img")];
let ticking = false;
function onScroll() {
  const vh = innerHeight;
  const r = tl.getBoundingClientRect();
  const p = Math.min(1, Math.max(0, (vh * .7 - r.top) / r.height));
  fill.style.transform = `scaleY(${p})`;
  imgs.forEach(img => {
    const b = img.parentElement.getBoundingClientRect();
    const k = (b.top + b.height / 2 - vh / 2) / vh;       // -1 à 1
    img.style.transform = `translateY(${(-k * 12).toFixed(2)}%) scale(1.04)`;
  });
  ticking = false;
}
if (!reduce) {
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  addEventListener("resize", onScroll);
  onScroll();
} else { fill.style.transform = "none"; }

// Ouverture de l'enveloppe
$("#openBtn").addEventListener("click", () => {
  const wait = reduce ? 0 : 1;
  $("#openBtn").classList.add("hide");
  $(".env").classList.add("open");
  setTimeout(() => {
    document.body.classList.remove("locked");
    scrollTo(0, 0);
    $("#site").classList.add("show");
    $("#site").removeAttribute("aria-hidden");
    $("#intro").classList.add("done");
    setTimeout(() => $("#intro").remove(), 2000);
  }, reduce ? 200 : 3200 * wait);
}, { once: true });

// RSVP (WhatsApp ou e-mail)
$("#rsvpForm").addEventListener("submit", e => {
  e.preventDefault();
  const f = new FormData(e.target);
  const msg = `Bonjour, c'est ${f.get("nom")}. ${f.get("presence")} (${f.get("nb")} personne(s)).` + (f.get("msg") ? `\n${f.get("msg")}` : "");
  const url = CONFIG.rsvpWhatsApp
    ? `[wa.me](https://wa.me/${CONFIG.rsvpWhatsApp}?text=${encodeURIComponent(msg)})`
    : `mailto:${CONFIG.rsvpEmail}?subject=${encodeURIComponent("Réponse mariage")}&body=${encodeURIComponent(msg)}`;
  location.href = url;
});
