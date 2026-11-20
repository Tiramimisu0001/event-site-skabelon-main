// Interaktiv SVG-side
const svgPlaceholder = document.querySelector(".svg-placeholder");

// Opsamlingsside
const opsamlingPlaceholder = document.querySelector(".opsamling-placeholder");

if (opsamlingPlaceholder) {
  const params = new URLSearchParams(window.location.search);
  // Eksempel: params.get("navn") henter værdien fra et formularfelt med name="navn".
}
const zones = document.querySelectorAll(".zone");
const items = document.querySelectorAll(".accordion-item");

zones.forEach((zone) => {
  zone.addEventListener("click", () => {
    const navn = zone.id.replace("zone-", "");
    document.querySelector("#info-" + navn).open = true;
  });
});

items.forEach((item) => {
  item.addEventListener("toggle", () => {
    const navn = item.id.replace("info-", "");
    document.querySelector("#zone-" + navn).classList.toggle("active", item.open);
  });
});
