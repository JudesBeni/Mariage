const CONFIG = {
  name1: "Fadhel Judes", name2: "Sena Diane",
  cardNames: "Fafa & Nana", initials: "F & D",
  date: "02 · 01 · 2027", dateLong: "02 Janvier 2027",
  dateTarget: "2027-01-02T14:00:00",           // date et heure du compte à rebours
  openLabel: "Ouvrir notre invitation",
  heroKicker: "Nous nous marions",
  welcome: "Avec une immense joie, nous vous invitons à célébrer le plus beau jour de notre vie.",

  storyKicker: "Depuis le début", storyTitle: "Notre histoire",
 story: [
  {
    when: "Le commencement",
    title: "La rencontre",
    text: `Nous étions venus à la rencontre de Dieu,
sans savoir qu’Il avait préparé pour nous la plus belle
des rencontres. Ce jour-là, nos chemins se sont croisés,
nos cœurs se sont reconnus, et sous Son regard,
une merveilleuse histoire d’amour a commencé.

« Il fait toute chose belle en son temps. »
— Ecclésiaste 3:11.

Nous cherchions Sa présence, et dans Son amour,
Il nous a conduits l’un vers l’autre.`
  },
  {
    when: "Notre amour, au-delà des frontières",
    title: "Le passeport de l'amour",
    text: `Depuis plus d’une décennie, notre amour voyage
à travers les frontières et défie les distances.
Du Bénin à la France, en passant par le Ghana,
chaque étape a écrit une page de notre histoire.
Et c’est finalement au Canada que nous avons posé
nos valises, pour continuer à écrire, main dans
la main, les plus beaux chapitres de notre vie à deux.`
  },
  {
    when: "La fidélité de Dieu, notre plus belle bénédiction",
    title: "Notre mariage devant Dieu",
    text: `Après tant de chemins parcourus, la bonté
de Dieu a transformé notre attente en bénédictions,
et nous croyons que le plus beau reste encore à venir.

« L’Éternel bénit les dernières années de Job
plus que les premières. » — Job 42:12.`
  }
],

  galKicker: "Souvenirs", galTitle: "Notre galerie",
  gallery: ["Photo/galerie1.jpeg","Photo/galerie2.jpeg","Photo/galerie3.jpeg","Photo/galerie4.jpeg","Photo/galerie5.jpeg","Photo/galerie6.jpeg"],

  progKicker: "La journée", progTitle: "Le programme",
  program: [
    {h: "14h00", t: "Accueil des invités", d: "Accueil et installation à l’Église Marie-Auxiliatrice de Menontin"},
    {h: "14h30", t: "Cérémonie", d: "Messe de mariage"},
    {h: "17h00", t: "Cocktail", d: "Photos et moments de partage"},
    {h: "17h30", t: "Arrivée des mariés", d: "Entrée magestieuse des mariés"},
    {h: "18h00", t: "Dîner et soirée", d: "Repas, discours, animation d'orquestre et danse"}
  ],

  placeKicker: "Où nous retrouver", placeTitle: "Le lieu",
  venue: "Salle des fetes: Palace Royale", address: "Zogbo,rue de la pharmacie Renouveau,en face du 10em arrondissement, Cotonou",
  placeNote: "Un parking est disponible sur place.",
  mapLabel: "Voir l'itinéraire",
  mapUrl: "https://maps.app.goo.gl/fm4Lb6TYVoQv8cZ78)" + encodeURIComponent("Salle des fetes: Palace Royale, [Zogbo,rue de la pharmacie Renouveau,en face du 10em arrondissement], [cotonou]"),
  infoKicker: "Bon à savoir", infoTitle: "Informations pratiques",
  infos: [
    {k: "Tenue", t: "Élégante", d: "Nous vous invitons à porter des tons chauds : crème, terracotta, brun."},
    {k: "Cadeaux", t: "Votre présence", d: "Votre présence est le plus beau des cadeaux. Une enveloppe est à votre disposition si vous le souhaitez."}
  ],

  rsvpKicker: "Réponse", rsvpTitle: "Confirmez votre présence",
  rsvpText: "Merci de nous faire savoir si vous serez des nôtres.",
  rsvpButton: "Envoyer ma réponse",
  rsvpWhatsApp: "2290196713264",                              // ex : "2250102030405" (numéro international sans + ni espaces)
  deadline: "Date limite de réponse : 10 Décembre 2026",

  thanks: "Merci de faire partie de notre histoire",
  hashtag: "#FadhelJudesEtSenaDiane2027"
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
  const url = `https://wa.me/${CONFIG.rsvpWhatsApp}?text=${encodeURIComponent(msg)})`;
  location.href = url;
});
