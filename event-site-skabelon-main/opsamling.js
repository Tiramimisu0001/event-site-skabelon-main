// Opsamling: læser svarene fra formularen og bygger ruten

const retter = {
  tagine: ["Tagine", "Marokko", "afrika"],
  couscous: ["Couscous", "Algeriet", "afrika"],
  shakshuka: ["Shakshuka", "Tunesien", "afrika"],
  "ful-medames": ["Ful medames", "Egypten", "afrika"],
  thieboudienne: ["Thieboudienne", "Senegal", "afrika"],
  suya: ["Suya", "Nigeria", "afrika"],
  jollof: ["Jollof", "Nigeria", "afrika"],
  "fufu-med-suppe": ["Fufu med suppe", "Ghana", "afrika"],
  ndole: ["Ndolé", "Cameroun", "afrika"],
  "moambe-kylling": ["Moambe-kylling", "DR Congo", "afrika"],
  injera: ["Injera", "Etiopien", "afrika"],
  ugali: ["Ugali", "Kenya", "afrika"],
  pilau: ["Pilau", "Tanzania", "afrika"],
  "piri-piri-kylling": ["Piri piri-kylling", "Mozambique", "afrika"],
  romazava: ["Romazava", "Madagaskar", "afrika"],
  bobotie: ["Bobotie", "Sydafrika", "afrika"],
  musakhan: ["Musakhan", "Palæstina", "asien"],
  falafel: ["Falafel", "Libanon", "asien"],
  mansaf: ["Mansaf", "Jordan", "asien"],
  kabsa: ["Kabsa", "Saudi-Arabien", "asien"],
  "ghormeh-sabzi": ["Ghormeh sabzi", "Iran", "asien"],
  plov: ["Plov", "Usbekistan", "asien"],
  biryani: ["Biryani", "Indien", "asien"],
  momo: ["Momo", "Nepal", "asien"],
  "kottu-roti": ["Kottu roti", "Sri Lanka", "asien"],
  "pad-thai": ["Pad thai", "Thailand", "asien"],
  pho: ["Phở", "Vietnam", "asien"],
  adobo: ["Adobo", "Filippinerne", "asien"],
  "nasi-goreng": ["Nasi goreng", "Indonesien", "asien"],
  dumplings: ["Dumplings", "Kina", "asien"],
  bibimbap: ["Bibimbap", "Sydkorea", "asien"],
  sushi: ["Sushi", "Japan", "asien"],
  smoerrebroed: ["Smørrebrød", "Danmark", "europa"],
  kottbullar: ["Köttbullar", "Sverige", "europa"],
  "fish-and-chips": ["Fish and chips", "England", "europa"],
  "irish-stew": ["Irish stew", "Irland", "europa"],
  croissant: ["Croissant", "Frankrig", "europa"],
  "pastel-de-nata": ["Pastel de nata", "Portugal", "europa"],
  paella: ["Paella", "Spanien", "europa"],
  pizza: ["Pizza", "Italien", "europa"],
  bratwurst: ["Bratwurst", "Tyskland", "europa"],
  "wiener-schnitzel": ["Wiener schnitzel", "Østrig", "europa"],
  pierogi: ["Pierogi", "Polen", "europa"],
  borsjtj: ["Borsjtj", "Ukraine", "europa"],
  gullasch: ["Gullasch", "Ungarn", "europa"],
  sarma: ["Sarma", "Albanien", "europa"],
  moussaka: ["Moussaka", "Grækenland", "europa"],
  baklava: ["Baklava", "Tyrkiet", "europa"],
  arepas: ["Arepas", "Venezuela", "sydamerika"],
  "bandeja-paisa": ["Bandeja paisa", "Colombia", "sydamerika"],
  ajiaco: ["Ajiaco", "Colombia", "sydamerika"],
  pepperpot: ["Pepperpot", "Guyana", "sydamerika"],
  encebollado: ["Encebollado", "Ecuador", "sydamerika"],
  ceviche: ["Ceviche", "Peru", "sydamerika"],
  "lomo-saltado": ["Lomo saltado", "Peru", "sydamerika"],
  saltenas: ["Salteñas", "Bolivia", "sydamerika"],
  feijoada: ["Feijoada", "Brasilien", "sydamerika"],
  "pao-de-queijo": ["Pão de queijo", "Brasilien", "sydamerika"],
  "sopa-paraguaya": ["Sopa paraguaya", "Paraguay", "sydamerika"],
  chivito: ["Chivito", "Uruguay", "sydamerika"],
  empanadas: ["Empanadas", "Argentina", "sydamerika"],
  asado: ["Asado", "Argentina", "sydamerika"],
  "pastel-de-choclo": ["Pastel de choclo", "Chile", "sydamerika"],
  curanto: ["Curanto", "Chile", "sydamerika"],
};

const kontinentNavn = {
  afrika: "Afrika",
  asien: "Asien",
  europa: "Europa",
  sydamerika: "Sydamerika",
};

// Rækkefølgen man går rundt på kortet
const rundtur = ["afrika", "asien", "europa", "sydamerika"];

// Hent svarene fra adresselinjen
const params = new URLSearchParams(location.search);
const navn = params.get("navn") || "dig";
const start = params.get("start") || "afrika";
const tid = params.get("tid");
const valgte = params.getAll("ret");

// Start ruten i det valgte kontinent og fortsæt rundt
const startIndex = rundtur.indexOf(start);
const rute = [...rundtur.slice(startIndex), ...rundtur.slice(0, startIndex)];

// Sorter retterne efter ruten
let stop = valgte.filter((ret) => retter[ret]).sort((a, b) => rute.indexOf(retter[a][2]) - rute.indexOf(retter[b][2]));

// Kort tid = færre stop
const maxStop = { 1: 4, 3: 8 };
if (maxStop[tid]) {
  stop = stop.slice(0, maxStop[tid]);
}

// Skriv på siden
document.querySelector("#rute-navn").textContent = "Smagsrute for " + navn;
document.querySelector("#rute-start").textContent = "Du starter i " + kontinentNavn[start] + " · " + stop.length + " retter på din rute";

// Én kolonne pr. kontinent, i rutens rækkefølge
const kolonner = document.querySelector("#rute-kolonner");
let nummer = 1;

rute.forEach((kontinent, index) => {
  const retterHer = stop.filter((ret) => retter[ret][2] === kontinent);

  const kolonne = document.createElement("section");
  kolonne.className = "rute-kolonne kol-" + kontinent;
  if (index === 0) {
    kolonne.classList.add("er-start");
  }

  let indhold = "<h3>" + (index === 0 ? "Start · " : "") + kontinentNavn[kontinent] + "</h3>";

  if (retterHer.length === 0) {
    indhold += '<p class="tom">Ingen retter valgt</p>';
  } else {
    indhold += '<ol start="' + nummer + '">';
    retterHer.forEach((ret) => {
      indhold += "<li><strong>" + retter[ret][0] + "</strong><span>" + retter[ret][1] + "</span></li>";
      nummer++;
    });
    indhold += "</ol>";
  }

  kolonne.innerHTML = indhold;
  kolonner.append(kolonne);
});

// Variation: toppen af kortet får farve efter startkontinentet
document.querySelector("#rute-kort").classList.add("pas-" + start);
// Variation: kortet får farver efter det kontinent man starter i
document.querySelector("#rute-kort").classList.add("pas-" + start);
